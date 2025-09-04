#!/usr/bin/env tsx

/**
 * Admin account seeding script for production database
 * Creates or updates admin account directly in production database
 */

import { db } from "../server/db";
import { users } from "../shared/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

async function seedAdmin() {
  try {
    console.log("🔄 Starting admin account seeding...");

    const adminEmail = process.env.ADMIN_EMAIL || "admin@beaulead.co.kr";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    const adminName = process.env.ADMIN_NAME || "Super Admin";

    console.log(`📧 Admin email: ${adminEmail}`);

    // Check if admin already exists
    const existingAdmin = await db
      .select()
      .from(users)
      .where(eq(users.email, adminEmail))
      .limit(1);

    if (existingAdmin.length > 0) {
      console.log("⚠️  Admin account already exists");
      
      // Update existing admin
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await db
        .update(users)
        .set({
          password: hashedPassword,
          role: "ADMIN",
          firstName: adminName.split(" ")[0] || "Admin",
          lastName: adminName.split(" ").slice(1).join(" ") || "BeauLead",
          isReplitUser: false,
          updatedAt: new Date()
        })
        .where(eq(users.email, adminEmail));

      console.log("✅ Admin account updated successfully");
    } else {
      // Create new admin account
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      const adminUser = {
        id: `admin-beaulead-${Date.now()}`,
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN" as const,
        firstName: adminName.split(" ")[0] || "Admin",
        lastName: adminName.split(" ").slice(1).join(" ") || "BeauLead",
        isReplitUser: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await db.insert(users).values(adminUser);
      console.log("✅ Admin account created successfully");
    }

    console.log("🎉 Admin seeding completed");
    
    // Test login immediately
    console.log("🧪 Testing admin credentials...");
    const adminUser = await db
      .select()
      .from(users)
      .where(eq(users.email, adminEmail))
      .limit(1);

    if (adminUser.length > 0 && adminUser[0].password) {
      const isValidPassword = await bcrypt.compare(adminPassword, adminUser[0].password);
      if (isValidPassword) {
        console.log("✅ Admin credentials test passed");
      } else {
        console.log("❌ Admin credentials test failed");
      }
    }

  } catch (error) {
    console.error("❌ Error seeding admin:", error);
    process.exit(1);
  }
}

// Run the script
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  seedAdmin()
    .then(() => {
      console.log("✅ Script completed successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Script failed:", error);
      process.exit(1);
    });
}

export { seedAdmin };