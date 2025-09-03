import { sql } from 'drizzle-orm';
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
  boolean,
  pgEnum
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table - mandatory for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Role enum - CONTENT_MANAGER 추가
export const roleEnum = pgEnum("role", ["USER", "ADMIN", "CLIENT", "CONTENT_MANAGER"]);

// Blog status enum
export const blogStatusEnum = pgEnum("blog_status", ["DRAFT", "PUBLISHED", "ARCHIVED"]);

// User storage table - mandatory for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  role: roleEnum("role").default("USER"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Blog categories table
export const blogCategories = pgTable("blog_categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  nameKo: varchar("name_ko").notNull(),
  nameEn: varchar("name_en").notNull(),
  slug: varchar("slug").unique().notNull(),
  descriptionKo: text("description_ko"),
  descriptionEn: text("description_en"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Blog tags table
export const blogTags = pgTable("blog_tags", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").unique().notNull(),
  slug: varchar("slug").unique().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Blog posts table - 완전히 새로운 블로그 테이블
export const blogs = pgTable("blogs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: varchar("slug").unique().notNull(),
  titleKo: text("title_ko").notNull(),
  titleEn: text("title_en").notNull(),
  excerptKo: text("excerpt_ko"),
  excerptEn: text("excerpt_en"),
  contentKo: text("content_ko").notNull(),
  contentEn: text("content_en").notNull(),
  coverUrl: varchar("cover_url"),
  
  // 작성자 정보
  authorId: varchar("author_id").references(() => users.id).notNull(),
  
  // 카테고리
  categoryId: varchar("category_id").references(() => blogCategories.id),
  
  // 상태 관리
  status: blogStatusEnum("status").default("DRAFT"),
  published: boolean("published").default(false),
  publishedAt: timestamp("published_at"),
  
  // 조회수
  viewCount: varchar("view_count").default("0"),
  
  // SEO 정보
  metaTitle: varchar("meta_title"),
  metaDescription: text("meta_description"),
  metaKeywords: text("meta_keywords"),
  
  // 이미지 업로드
  featuredImageUrl: varchar("featured_image_url"),
  galleryImages: jsonb("gallery_images"), // Array of image URLs
  
  // 태그들 (JSON 배열로 저장)
  tags: jsonb("tags"), // Array of tag IDs
  
  // 임시저장/자동저장을 위한 필드
  isDraft: boolean("is_draft").default(true),
  autoSaveContent: text("auto_save_content"),
  lastAutoSave: timestamp("last_auto_save"),
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Blog post tags junction table
export const blogPostTags = pgTable("blog_post_tags", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  blogId: varchar("blog_id").references(() => blogs.id).notNull(),
  tagId: varchar("tag_id").references(() => blogTags.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Contact messages table (기존 테이블이 없다면 추가)
export const contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  company: varchar("company"),
  phone: varchar("phone"),
  service: varchar("service").notNull(),
  message: text("message").notNull(),
  budget: varchar("budget"),
  timeline: varchar("timeline"),
  status: varchar("status").default("NEW"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Portfolio items table
export const portfolios = pgTable("portfolios", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: varchar("slug").unique().notNull(),
  titleKo: text("title_ko").notNull(),
  titleEn: text("title_en").notNull(),
  summaryKo: text("summary_ko").notNull(),
  summaryEn: text("summary_en").notNull(),
  metrics: jsonb("metrics"), // Store performance metrics
  thumbUrl: varchar("thumb_url"),
  images: jsonb("images"), // Array of image URLs
  published: boolean("published").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertBlogCategorySchema = createInsertSchema(blogCategories).omit({
  id: true,
  createdAt: true,
});

export const insertBlogTagSchema = createInsertSchema(blogTags).omit({
  id: true,
  createdAt: true,
});

export const insertBlogSchema = createInsertSchema(blogs).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  // 폼 검증을 위한 추가 규칙
  titleKo: z.string().min(1, "한국어 제목을 입력해주세요"),
  titleEn: z.string().min(1, "영어 제목을 입력해주세요"),
  contentKo: z.string().min(10, "한국어 본문을 최소 10자 이상 입력해주세요"),
  contentEn: z.string().min(10, "영어 본문을 최소 10자 이상 입력해주세요"),
});

export const insertPortfolioSchema = createInsertSchema(portfolios).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export type InsertBlogCategory = z.infer<typeof insertBlogCategorySchema>;
export type BlogCategory = typeof blogCategories.$inferSelect;

export type InsertBlogTag = z.infer<typeof insertBlogTagSchema>;
export type BlogTag = typeof blogTags.$inferSelect;

export type InsertBlog = z.infer<typeof insertBlogSchema>;
export type Blog = typeof blogs.$inferSelect;

export type InsertPortfolio = z.infer<typeof insertPortfolioSchema>;
export type Portfolio = typeof portfolios.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

// Blog with relations
export type BlogWithAuthor = Blog & {
  author: User | null;
  category?: BlogCategory | null;
};

// User role helper functions
export const canManageContent = (userRole: string) => {
  return userRole === "ADMIN" || userRole === "CONTENT_MANAGER";
};

export const canManageUsers = (userRole: string) => {
  return userRole === "ADMIN";
};
