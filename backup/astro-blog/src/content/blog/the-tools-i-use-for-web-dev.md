---
title: "Web Dev Tools I Use"
date: "2024-08-25"
author: "John Graham"
categories: ["Web Development", "Tools", "JavaScript"]
description: "As a web developer, your choice of tools can dramatically impact your productivity, code quality, and overall enjoyment of the development process. Over the years, I've experimented with countless frameworks, libraries, and tools before settling on my current tech stack."
featured: false
draft: false
---

# Web Dev Tools I Use

As a web developer, your choice of tools can dramatically impact your productivity, code quality, and overall enjoyment of the development process. Over the years, I've experimented with countless frameworks, libraries, and tools before settling on my current tech stack. In this post, I'll share the tools I use daily and explain why I've chosen each one.

## Frontend Development

### React: The UI Library That Changed Everything

React has been my UI library of choice for the past several years, and for good reason:

- **Component-Based Architecture**: Encourages reusable, modular code
- **Virtual DOM**: Provides excellent performance for UI updates
- **Massive Ecosystem**: Solutions exist for almost every problem
- **Strong Community**: Abundant resources, tutorials, and support
- **Job Market Demand**: Consistently among the most sought-after skills

```jsx
// A simple React component example
function Welcome({ name }) {
  return (
    <div className="welcome-card">
      <h1>Hello, {name}!</h1>
      <p>Welcome to my website.</p>
    </div>
  );
}
```

While other frontend frameworks like Vue and Angular have their merits, React's flexibility and ecosystem make it my preferred choice for most projects.

### TypeScript: Adding Type Safety to JavaScript

TypeScript has transformed how I write JavaScript code:

- **Static Type Checking**: Catches type-related bugs before runtime
- **Improved Intellisense**: Better autocomplete and documentation
- **Enhanced Refactoring**: Makes large-scale changes safer
- **Interface Definitions**: Clearly communicates expected data structures

```typescript
// TypeScript example
interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

function formatUserDisplay(user: User): string {
  return `${user.name} (${user.email})`;
}
```

TypeScript's learning curve is well worth the investment. After adopting it, I've experienced fewer bugs, more readable code, and smoother collaboration on team projects.

### Zustand: State Management Simplified

After trying Redux, MobX, and Context API, I've settled on Zustand for state management:

- **Minimal API**: Simple and intuitive with almost no boilerplate
- **No Providers/Consumers**: Direct store access without wrapper components
- **TypeScript Integration**: Excellent type inference
- **Performance**: Efficient renders with fine-grained updates

```javascript
// Zustand store example
import create from 'zustand';

const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

// Using the store in a component
function BearCounter() {
  const bears = useStore((state) => state.bears);
  return <h1>{bears} bears around here</h1>;
}
```

For smaller applications, I sometimes use React's built-in useState and useReducer hooks, but Zustand scales beautifully for more complex state management needs.

## Backend Development

### Node.js: JavaScript Everywhere

Using JavaScript on both frontend and backend offers significant advantages:

- **Code Sharing**: Reuse validation logic, types, and utilities
- **Developer Efficiency**: One language for the entire stack
- **JSON Handling**: Native format for both environments
- **NPM Ecosystem**: Access to thousands of packages

```javascript
// Simple Node.js Express API example
const express = require('express');
const app = express();

app.get('/api/users', async (req, res) => {
  try {
    const users = await db.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Express: The Flexible Backend Framework

Express remains my go-to Node.js framework for its:

- **Minimalist Design**: Provides only what you need
- **Middleware Ecosystem**: Extensive collection of plugins
- **Routing System**: Simple yet powerful
- **Performance**: Lightweight with minimal overhead

For more structured applications, I sometimes use NestJS, which brings Angular-inspired organization to backend development.

## Database Technologies

### SQL Server: For Enterprise Applications

For enterprise-level applications with complex relationships and transaction requirements, I choose SQL Server:

- **ACID Compliance**: Reliable transactions
- **Advanced Query Capabilities**: Complex joins and stored procedures
- **Robust Security**: Enterprise-grade protection
- **Scalability**: Handles large datasets efficiently

```sql
-- SQL Server example
CREATE TABLE Users (
    UserId INT PRIMARY KEY IDENTITY(1,1),
    Email NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(128) NOT NULL,
    CreatedDate DATETIME2 DEFAULT GETDATE(),
    LastLoginDate DATETIME2 NULL
);
```

### SQLite: For Simpler Applications

For smaller projects, prototypes, and applications that don't require a separate database server, SQLite is perfect:

- **Zero Configuration**: No server setup required
- **Self-Contained**: Single file database
- **Cross-Platform**: Works everywhere
- **Surprisingly Powerful**: Supports most SQL features

```javascript
// Using SQLite with Node.js
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

db.run(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);
```

## Development Environment & Tools

### VS Code: The Ultimate Editor

VS Code has become the industry standard for web development, and for good reason:

- **Extensions**: Thousands of plugins for every language and framework
- **Integrated Terminal**: Run commands without leaving the editor
- **Git Integration**: Visual diff tools and source control
- **Debugging Tools**: Breakpoints, watch variables, and more
- **Performance**: Remarkably fast for an Electron app

Essential extensions I use daily:
- ESLint
- Prettier
- GitLens
- ES7+ React/Redux/React-Native snippets
- Thunder Client (API testing)

### Docker: Consistent Development Environments

Docker ensures consistent environments across development, testing, and production:

- **Environment Isolation**: Prevents "works on my machine" problems
- **Microservices**: Easily decompose applications
- **Dependency Management**: Package everything together
- **CI/CD Integration**: Streamlines deployment pipelines

```dockerfile
# Example Dockerfile for a Node.js application
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
```

## Why This Stack Works For Me

This technology stack has evolved through years of professional experience, and it works exceptionally well for several reasons:

1. **TypeScript + React + Node.js**: Using TypeScript throughout the stack creates a seamless development experience with shared types and validation logic.

2. **Balanced Learning Curve**: While some tools have steeper learning curves (TypeScript), others are more approachable (Zustand), creating a balanced stack for teams with mixed experience levels.

3. **Performance Focused**: Each tool is chosen with performance in mind, from React's virtual DOM to SQLite's lightweight footprint.

4. **Scalability**: This stack scales from small personal projects to large enterprise applications.

## Trade-offs and Alternatives

No stack is perfect for every situation. Here are some trade-offs and alternatives I consider:

| Tool I Use | Alternatives | When I Might Switch |
|------------|--------------|---------------------|
| React | Vue, Svelte | For smaller projects needing less boilerplate |
| TypeScript | Plain JavaScript | For quick prototypes or tiny scripts |
| Node.js/Express | Django, Rails, .NET | For teams with existing expertise |
| SQL Server/SQLite | MongoDB, PostgreSQL | For document-oriented data or advanced PostgreSQL features |

## Conclusion

The tools we choose as developers shape our daily experience and the quality of our work. My current stack of React, TypeScript, Zustand, Node.js, Express, and SQL/SQLite provides a productive, maintainable, and enjoyable development experience.

Remember that the best stack is the one that works for your specific needs, team, and project requirements. Don't be afraid to experiment with new tools, but also recognize the value in mastering a core set of technologies.

---

*What's your preferred web development stack? I'd love to hear about your experiences with different tools in the comments below!*