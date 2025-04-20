---
author: John Graham
pubDatetime: 2025-04-19T00:00:00Z
title: "Creating an Internal Merchandise Store: Simplifying Company Swag Distribution"
slug: creating-an-internal-merch-store
featured: true
draft: false
tags:
  - Web Development
  - React
  - Enterprise Solutions
description: Company merchandise is more than just branded swag—it's a tangible expression of company culture and team unity.
---

# Creating an Internal Merchandise Store: Simplifying Company Swag Distribution

Company merchandise is more than just branded swag—it's a tangible expression of company culture and team unity. However, distributing company merchandise efficiently within an organization presents unique challenges that off-the-shelf e-commerce solutions don't adequately address. This is what led me to build a specialized Internal Merchandise Store application.

## The Problem It Solves

Before implementing this solution, the company's merchandise distribution process was fragmented and inefficient:

1. Merchandise requests were handled through email or spreadsheet forms
2. Inventory tracking was manual and often inaccurate
3. The finance department struggled to properly account for merchandise costs
4. Employees had no easy way to browse available items
5. Distribution relied on physical handoffs and manual record-keeping

The Internal Merchandise Store addresses these pain points by providing:

- A centralized platform for browsing and ordering company merchandise
- Automated inventory tracking and management
- Integration with payroll for seamless deduction processing
- An admin dashboard for merchandise management and order fulfillment
- Role-based access control for different administrative functions

## Technical Design Decisions

### Why React + TypeScript Frontend

I chose React for the frontend because of its component-based architecture, which allowed for rapid development and easy maintenance. The decision to use TypeScript was driven by the need for reliability in an internal business application:

1. Type safety prevents common runtime errors
2. Interface definitions create clear contracts between components
3. Better IDE integration improves developer productivity
4. Self-documenting code reduces maintenance burden

This combination provided the perfect balance of development speed and application reliability, especially important for an internal tool that needs to "just work" without dedicated support staff.

### Lightweight CSS with PicoCSS

Rather than implement a heavy UI framework like Material UI or Bootstrap, I opted for PicoCSS—a minimalist CSS framework that provides sensible defaults while staying out of the way. This decision:

1. Reduced bundle size for better performance
2. Avoided framework lock-in and unnecessary complexity
3. Allowed for rapid styling without fighting against a framework's opinions
4. Created a clean, professional interface without excessive styling

The resulting UI is straightforward and functional—exactly what's needed for an internal business application.

### Express + SQLite Backend

The backend architecture prioritizes simplicity and maintainability over cutting-edge features. Express provides a familiar, well-documented API framework, while SQLite offers a lightweight database solution that:

1. Requires no separate database server
2. Simplifies deployment and backups
3. Provides sufficient performance for the expected load
4. Offers full relational database capabilities without administration overhead

For an internal application with predictable usage patterns, this stack provides all the necessary functionality without unnecessary operational complexity.

### TypeScript Across the Stack

Using TypeScript on both frontend and backend created a cohesive development experience with shared type definitions. This approach:

1. Ensures API contracts are consistently enforced
2. Reduces errors when passing data between systems
3. Improves developer confidence when making changes
4. Creates natural documentation through type annotations

The result is a more maintainable codebase that future developers can confidently modify without fear of breaking changes.

## Challenges Encountered

### Role-Based Access Control

One of the most complex aspects of the application was implementing appropriate role-based access control. The store needed different permission levels for:

- Regular employees (browsing and ordering only)
- Merchandise managers (inventory and catalog management)
- Order fulfillment staff (order processing and status updates)
- Administrators (user management and reporting)

The solution involved creating a flexible permission system with:

1. Hierarchical roles with inheritance
2. Granular permissions that can be assigned to roles
3. Route-level middleware for access control
4. Component-level conditional rendering based on permissions

This approach ensures that users only see and access functionality relevant to their role while keeping the authorization logic manageable.

### Inventory Availability Logic

Another challenging aspect was managing inventory availability across different office locations with varying item types and sizes. The data model needed to account for:

1. Multiple physical locations with separate inventories
2. Items with size variations (e.g., S, M, L, XL for clothing)
3. Limited-edition items with restricted availability
4. Reserved items awaiting pickup

I implemented a flexible availability system that tracks inventory at the intersection of item, size, and location. This allowed for precise inventory control while providing employees with accurate availability information when ordering.

### Order Processing Workflow

Creating an efficient order processing workflow required careful consideration of the physical fulfillment process. The system needed to track orders through multiple states:

1. Submitted (initial state)
2. Processing (picked for fulfillment)
3. Ready for pickup (awaiting employee collection)
4. Completed (delivered to employee)
5. Canceled (either by employee or administrator)

Each state transition triggered appropriate notifications and inventory updates, ensuring that the digital and physical processes remained synchronized.

## Future Improvements

While the current implementation successfully addresses the core requirements, several enhancements could further improve the system:

1. **Integration with HR Systems**: Automatically updating employee information and department allocations
2. **Advanced Analytics Dashboard**: Providing insights into popular items and ordering patterns
3. **Budget Management**: Allowing departments to set and track merchandise budgets
4. **Event-Based Collections**: Creating limited-time merchandise collections tied to company events
5. **Mobile App**: Developing a companion mobile application for easier browsing and order tracking

The modular architecture was designed with these potential enhancements in mind, allowing for incremental improvements without major refactoring.

## Lessons Learned

This project reinforced several important principles about building internal business applications:

1. **Focus on user workflows, not just features**: Understanding how employees and administrators actually work led to more intuitive interfaces.

2. **Simplicity trumps sophistication**: Choosing simpler technologies that just work proved more valuable than implementing cutting-edge solutions.

3. **Performance matters even for internal tools**: Employees have limited patience for slow applications, even when they're required to use them.

4. **Admin interfaces deserve thoughtful design**: Administrative users spend significant time in the system and benefit greatly from well-designed interfaces.

The Internal Merchandise Store has transformed what was once an administrative burden into a streamlined, enjoyable process for both employees and administrators. By understanding the specific needs of an internal merchandise distribution system rather than forcing a generic e-commerce solution to fit, the application delivers exactly what the company needed—no more, no less.