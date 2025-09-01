# Overview

This is a modern full-stack web application for BeauLeadAI (뷰리드AI), a Korean digital marketing agency specializing in performance marketing. The application serves as both a client-facing marketing website and an internal CMS for managing content. It features a bilingual interface (Korean/English), comprehensive service showcases, blog and portfolio management, and integrated contact form functionality with Slack notifications.

# User Preferences

Preferred communication style: Simple, everyday language.

# Recent Changes

## December 31, 2024 - Complete Website Design Theme Integration
- ✓ Integrated modern dark theme with glassmorphism effects across all service pages (Google Ads, Naver Ads, Meta Ads, Kakao Ads)
- ✓ Applied consistent design components: service-card, floating-card, stats-card, contact-card with backdrop-filter blur effects
- ✓ Unified gradient backgrounds and bg-orb animations across all pages for visual consistency
- ✓ Maintained existing content while modernizing visual design throughout the website
- ✓ Preserved service-specific brand colors (Google-blue, Naver-green, Meta-blue/purple, Kakao-yellow) within the dark theme
- ✓ Implemented glassmorphism styling with semi-transparent cards and modern button designs

# System Architecture

## Frontend Architecture
The client-side application is built with **React 18** using **Vite** as the build tool. Key architectural decisions include:

- **Routing**: Uses Wouter for lightweight client-side routing instead of React Router to minimize bundle size
- **Styling**: Implements Tailwind CSS with shadcn/ui component library for consistent design system and rapid development
- **Design Theme**: Modern dark theme with glassmorphism effects, gradient backgrounds, and unified visual components
- **State Management**: Leverages TanStack Query (React Query) for server state management, eliminating need for complex global state solutions
- **Form Handling**: Uses React Hook Form with Zod validation for type-safe form validation and better developer experience
- **Internationalization**: Custom context-based i18n solution supporting Korean and English languages with localStorage persistence

## Backend Architecture
The server-side application follows an **Express.js** architecture with TypeScript:

- **Server Framework**: Express.js chosen for its simplicity and extensive middleware ecosystem
- **Database Layer**: Drizzle ORM with PostgreSQL for type-safe database operations and better developer experience compared to raw SQL
- **Authentication**: Replit's OpenID Connect integration for seamless development environment authentication
- **Session Management**: PostgreSQL-backed sessions using connect-pg-simple for scalability
- **API Design**: RESTful endpoints with consistent error handling and request/response patterns

## Data Storage Solutions
- **Primary Database**: PostgreSQL with Neon serverless hosting for production scalability
- **ORM**: Drizzle ORM chosen over Prisma for better TypeScript integration and lighter runtime footprint
- **Schema Design**: Normalized schema with separate tables for users, blogs, portfolios, and sessions
- **File Storage**: Static assets served directly from the file system during development

## Authentication and Authorization
- **Provider**: Replit Auth using OpenID Connect for development convenience
- **Role-Based Access**: Three-tier system (USER, ADMIN, CLIENT) with route-level protection
- **Session Security**: HTTP-only cookies with secure flags and 7-day expiration
- **Middleware Protection**: Centralized authentication middleware for protected routes

## Content Management System
- **Blog Management**: Full CRUD operations with bilingual content support (Korean/English)
- **Portfolio Management**: Project showcase system with image upload capabilities
- **SEO Optimization**: Dynamic meta tag generation for better search engine visibility
- **Publishing Workflow**: Draft/published state management for content control

# External Dependencies

## Third-Party Services
- **Neon Database**: Serverless PostgreSQL hosting for production database needs
- **Slack Web API**: Contact form submissions automatically forwarded to designated Slack channels for immediate notification
- **Replit Authentication**: Development environment authentication using OpenID Connect protocol

## Key NPM Packages
- **@neondatabase/serverless**: Database connection adapter optimized for serverless environments
- **@slack/web-api**: Official Slack SDK for webhook integrations and message formatting
- **drizzle-orm**: Type-safe ORM with PostgreSQL adapter for database operations
- **@radix-ui/react-***: Headless UI components providing accessible foundation for custom designs
- **@tanstack/react-query**: Server state management with caching, background updates, and error handling
- **wouter**: Lightweight routing library chosen over React Router for smaller bundle size
- **zod**: Runtime type validation for form data and API request/response validation

## Development Tools
- **Vite**: Modern build tool providing fast development server and optimized production builds
- **TypeScript**: Static type checking across the entire codebase for better developer experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **React Hook Form**: Performant form library with minimal re-renders
- **@hookform/resolvers**: Zod integration for React Hook Form validation