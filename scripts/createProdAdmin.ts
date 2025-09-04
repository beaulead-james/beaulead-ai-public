#!/usr/bin/env tsx

import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';

async function createProdAdmin() {
  console.log('🔄 Creating admin account in production database...');
  
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('❌ DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  const sql = neon(databaseUrl);
  
  try {
    console.log('✅ Connected to production database');

    const adminEmail = 'admin@beaulead.co.kr';
    const adminPassword = 'admin123';

    // Hash the password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Check if admin already exists
    const existingAdmin = await sql`
      SELECT id FROM users WHERE email = ${adminEmail}
    `;

    if (existingAdmin.length > 0) {
      // Update existing admin
      await sql`
        UPDATE users 
        SET password = ${hashedPassword}, role = 'ADMIN'
        WHERE email = ${adminEmail}
      `;
      console.log('✅ Admin account updated successfully');
    } else {
      // Create new admin
      await sql`
        INSERT INTO users (id, email, first_name, password, role, created_at)
        VALUES (gen_random_uuid(), ${adminEmail}, 'Admin', ${hashedPassword}, 'ADMIN', NOW())
      `;
      console.log('✅ Admin account created successfully');
    }

    // Verify admin credentials
    console.log('🧪 Testing admin credentials...');
    const testResult = await sql`
      SELECT id, email, first_name, role FROM users WHERE email = ${adminEmail}
    `;

    if (testResult.length > 0) {
      const admin = testResult[0];
      console.log('✅ Admin account verified:');
      console.log(`   📧 Email: ${admin.email}`);
      console.log(`   👤 Name: ${admin.first_name}`);
      console.log(`   🔑 Role: ${admin.role}`);

      // Test password
      const passwordTest = await sql`
        SELECT password FROM users WHERE email = ${adminEmail}
      `;
      
      if (passwordTest.length > 0) {
        const isPasswordValid = await bcrypt.compare(adminPassword, passwordTest[0].password);
        if (isPasswordValid) {
          console.log('✅ Password verification successful');
        } else {
          console.log('❌ Password verification failed');
        }
      }
    } else {
      console.log('❌ Admin account verification failed');
    }

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }

  console.log('🎉 Production admin creation completed');
}

createProdAdmin().catch(console.error);