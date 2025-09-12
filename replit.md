# EDMAX E-Commerce Management Software

## Overview

EDMAX is a comprehensive e-commerce platform for building and power technologies tools in Ghana. This is a Next.js frontend application that provides a modern shopping experience for customers browsing tools, building materials, and power equipment. The platform features product catalog management, shopping cart functionality, user authentication, and various e-commerce features including wishlist, product comparison, and order management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: Next.js 15 with TypeScript for type safety and modern React features
- **UI Library**: Tailwind CSS with Shadcn/UI component system for consistent, accessible design
- **Component Structure**: Modular component architecture with reusable UI components
- **Routing**: App Router pattern with file-based routing for intuitive navigation

### Authentication & Authorization
- **Provider**: Supabase Auth for secure user authentication
- **Session Management**: Server-side session handling with middleware protection
- **Access Control**: Route-based protection for authenticated pages (cart, checkout, order history)
- **User State**: Context-based user state management throughout the application

### State Management
- **Cart Management**: React Context API for shopping cart state with local storage persistence
- **Wishlist**: Dedicated context for managing user favorites with backend synchronization
- **Product Filtering**: Comprehensive filter context supporting search, categories, brands, price ranges, and sorting
- **Product Comparison**: Toggle-based comparison feature for product evaluation

### Data Layer
- **Primary Database**: Supabase (PostgreSQL) for product catalog, user data, and transactions
- **Image Storage**: Supabase Storage for product images, brand logos, and category banners
- **Data Fetching**: Server-side data fetching with API routes for database operations
- **Image Optimization**: Custom image utility functions for Supabase Storage URLs

### E-Commerce Features
- **Product Catalog**: Multi-category product browsing with hierarchical organization
- **Search & Filtering**: Advanced product filtering by category, brand, price, availability, and tags
- **Shopping Cart**: Persistent cart with quantity management and price calculations
- **Checkout Process**: Multi-step checkout with shipping and payment information
- **Order Management**: Order history and tracking for authenticated users

### API Structure
- **RESTful Endpoints**: Organized API routes for different resources (products, cart, orders, categories)
- **Cart API**: CRUD operations for shopping cart management
- **Product API**: Product fetching with filtering and search capabilities
- **User API**: Authentication and user profile management
- **Contact API**: Contact form submission handling

### Performance Optimizations
- **Image Optimization**: Next.js Image component with lazy loading and responsive sizing
- **Code Splitting**: Automatic code splitting with dynamic imports where needed
- **Caching**: Built-in Next.js caching for static and dynamic content
- **Responsive Design**: Mobile-first responsive design with Tailwind CSS

## External Dependencies

### Core Services
- **Supabase**: Primary backend service providing PostgreSQL database, authentication, and file storage
- **Vercel**: Deployment platform for hosting the Next.js application
- **v0.dev**: Design system integration for rapid UI development

### UI & Component Libraries
- **Radix UI**: Headless component primitives for accessibility and functionality
- **Lucide React**: Icon library for consistent iconography
- **Sonner**: Toast notification system for user feedback
- **Embla Carousel**: Carousel component for product showcases

### Development Tools
- **TypeScript**: Type safety and enhanced developer experience
- **ESLint**: Code linting and style consistency
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Class Variance Authority**: Component variant management

### Third-Party Integrations
- **Paystack**: Payment processing integration (referenced in payment methods)
- **Mobile Money Services**: MTN, Vodafone, AirtelTigo payment options
- **Social Media**: Facebook, Instagram, Twitter, LinkedIn integration placeholders

### Form & Data Handling
- **React Hook Form**: Form state management and validation
- **Zod Resolvers**: Schema validation for form inputs
- **Date-fns**: Date manipulation and formatting utilities