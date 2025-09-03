import {
  users,
  blogs,
  portfolios,
  contacts,
  type User,
  type UpsertUser,
  type Blog,
  type InsertBlog,
  type Portfolio,
  type InsertPortfolio,
  type Contact,
  type InsertContact,
  type BlogWithAuthor,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User operations - supports both Replit Auth and regular login
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  getUserCount(): Promise<number>;
  
  // Blog operations
  getBlogs(published?: boolean): Promise<BlogWithAuthor[]>;
  getBlog(slug: string): Promise<BlogWithAuthor | undefined>;
  getBlogById(id: string): Promise<BlogWithAuthor | undefined>;
  createBlog(blog: InsertBlog): Promise<Blog>;
  updateBlog(id: string, blog: Partial<InsertBlog>): Promise<Blog>;
  deleteBlog(id: string): Promise<void>;
  
  // Portfolio operations
  getPortfolios(published?: boolean): Promise<Portfolio[]>;
  getPortfolio(slug: string): Promise<Portfolio | undefined>;
  getPortfolioById(id: string): Promise<Portfolio | undefined>;
  createPortfolio(portfolio: InsertPortfolio): Promise<Portfolio>;
  updatePortfolio(id: string, portfolio: Partial<InsertPortfolio>): Promise<Portfolio>;
  deletePortfolio(id: string): Promise<void>;
  
  // Contact operations
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
}

export class DatabaseStorage implements IStorage {
  // User operations - mandatory for Replit Auth
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    // 첫 번째 사용자인지 확인
    const userCount = await this.getUserCount();
    const isFirstUser = userCount === 0;
    
    // 첫 번째 사용자에게는 ADMIN 권한 부여
    const finalUserData = {
      ...userData,
      role: isFirstUser ? 'ADMIN' : userData.role || 'USER'
    };

    const [user] = await db
      .insert(users)
      .values(finalUserData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
          // 기존 사용자의 경우 역할 변경하지 않음
        },
      })
      .returning();
    return user;
  }

  async getUserCount(): Promise<number> {
    const result = await db.select().from(users);
    return result.length;
  }

  // Blog operations - 작성자 정보를 포함하여 조회
  async getBlogs(published?: boolean): Promise<BlogWithAuthor[]> {
    const query = db.select({
      id: blogs.id,
      slug: blogs.slug,
      titleKo: blogs.titleKo,
      titleEn: blogs.titleEn,
      excerptKo: blogs.excerptKo,
      excerptEn: blogs.excerptEn,
      contentKo: blogs.contentKo,
      contentEn: blogs.contentEn,
      coverUrl: blogs.coverUrl,
      authorId: blogs.authorId,
      categoryId: blogs.categoryId,
      status: blogs.status,
      published: blogs.published,
      publishedAt: blogs.publishedAt,
      viewCount: blogs.viewCount,
      metaTitle: blogs.metaTitle,
      metaDescription: blogs.metaDescription,
      metaKeywords: blogs.metaKeywords,
      featuredImageUrl: blogs.featuredImageUrl,
      galleryImages: blogs.galleryImages,
      tags: blogs.tags,
      isDraft: blogs.isDraft,
      autoSaveContent: blogs.autoSaveContent,
      lastAutoSave: blogs.lastAutoSave,
      createdAt: blogs.createdAt,
      updatedAt: blogs.updatedAt,
      // 작성자 정보
      author: users,
    })
    .from(blogs)
    .leftJoin(users, eq(blogs.authorId, users.id));
    
    if (published !== undefined) {
      return await query.where(eq(blogs.published, published)).orderBy(desc(blogs.createdAt)) as BlogWithAuthor[];
    }
    
    return await query.orderBy(desc(blogs.createdAt)) as BlogWithAuthor[];
  }

  async getBlog(slug: string): Promise<BlogWithAuthor | undefined> {
    const [blog] = await db.select({
      id: blogs.id,
      slug: blogs.slug,
      titleKo: blogs.titleKo,
      titleEn: blogs.titleEn,
      excerptKo: blogs.excerptKo,
      excerptEn: blogs.excerptEn,
      contentKo: blogs.contentKo,
      contentEn: blogs.contentEn,
      coverUrl: blogs.coverUrl,
      authorId: blogs.authorId,
      categoryId: blogs.categoryId,
      status: blogs.status,
      published: blogs.published,
      publishedAt: blogs.publishedAt,
      viewCount: blogs.viewCount,
      metaTitle: blogs.metaTitle,
      metaDescription: blogs.metaDescription,
      metaKeywords: blogs.metaKeywords,
      featuredImageUrl: blogs.featuredImageUrl,
      galleryImages: blogs.galleryImages,
      tags: blogs.tags,
      isDraft: blogs.isDraft,
      autoSaveContent: blogs.autoSaveContent,
      lastAutoSave: blogs.lastAutoSave,
      createdAt: blogs.createdAt,
      updatedAt: blogs.updatedAt,
      author: users,
    })
    .from(blogs)
    .leftJoin(users, eq(blogs.authorId, users.id))
    .where(eq(blogs.slug, slug));
    return blog as BlogWithAuthor | undefined;
  }

  async getBlogById(id: string): Promise<BlogWithAuthor | undefined> {
    const [blog] = await db.select({
      id: blogs.id,
      slug: blogs.slug,
      titleKo: blogs.titleKo,
      titleEn: blogs.titleEn,
      excerptKo: blogs.excerptKo,
      excerptEn: blogs.excerptEn,
      contentKo: blogs.contentKo,
      contentEn: blogs.contentEn,
      coverUrl: blogs.coverUrl,
      authorId: blogs.authorId,
      categoryId: blogs.categoryId,
      status: blogs.status,
      published: blogs.published,
      publishedAt: blogs.publishedAt,
      viewCount: blogs.viewCount,
      metaTitle: blogs.metaTitle,
      metaDescription: blogs.metaDescription,
      metaKeywords: blogs.metaKeywords,
      featuredImageUrl: blogs.featuredImageUrl,
      thumbnailUrl: blogs.thumbnailUrl,
      galleryImages: blogs.galleryImages,
      tags: blogs.tags,
      isDraft: blogs.isDraft,
      autoSaveContent: blogs.autoSaveContent,
      lastAutoSave: blogs.lastAutoSave,
      createdAt: blogs.createdAt,
      updatedAt: blogs.updatedAt,
      author: users,
    })
    .from(blogs)
    .leftJoin(users, eq(blogs.authorId, users.id))
    .where(eq(blogs.id, id));
    return blog as BlogWithAuthor | undefined;
  }

  async createBlog(blog: InsertBlog): Promise<Blog> {
    const [created] = await db.insert(blogs).values(blog).returning();
    return created;
  }

  async updateBlog(id: string, blog: Partial<InsertBlog>): Promise<Blog> {
    const [updated] = await db
      .update(blogs)
      .set({ ...blog, updatedAt: new Date() })
      .where(eq(blogs.id, id))
      .returning();
    return updated;
  }

  async deleteBlog(id: string): Promise<void> {
    await db.delete(blogs).where(eq(blogs.id, id));
  }

  // Portfolio operations
  async getPortfolios(published?: boolean): Promise<Portfolio[]> {
    const query = db.select().from(portfolios);
    
    if (published !== undefined) {
      return await query.where(eq(portfolios.published, published)).orderBy(desc(portfolios.createdAt));
    }
    
    return await query.orderBy(desc(portfolios.createdAt));
  }

  async getPortfolio(slug: string): Promise<Portfolio | undefined> {
    const [portfolio] = await db.select().from(portfolios).where(eq(portfolios.slug, slug));
    return portfolio;
  }

  async getPortfolioById(id: string): Promise<Portfolio | undefined> {
    const [portfolio] = await db.select().from(portfolios).where(eq(portfolios.id, id));
    return portfolio;
  }

  async createPortfolio(portfolio: InsertPortfolio): Promise<Portfolio> {
    const [created] = await db.insert(portfolios).values(portfolio).returning();
    return created;
  }

  async updatePortfolio(id: string, portfolio: Partial<InsertPortfolio>): Promise<Portfolio> {
    const [updated] = await db
      .update(portfolios)
      .set({ ...portfolio, updatedAt: new Date() })
      .where(eq(portfolios.id, id))
      .returning();
    return updated;
  }

  async deletePortfolio(id: string): Promise<void> {
    await db.delete(portfolios).where(eq(portfolios.id, id));
  }
  
  // Contact operations
  async getContacts(): Promise<Contact[]> {
    return await db.select().from(contacts).orderBy(desc(contacts.createdAt));
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const [created] = await db.insert(contacts).values(contact).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
