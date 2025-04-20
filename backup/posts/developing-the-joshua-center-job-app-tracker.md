---
title: "Developing a Job Application Tracker for The Joshua Center"
date: "2025-04-19"
author: "John Graham"
categories: ["Web Development", "React", "Non-Profit Solutions"]
---

# Developing a Job Application Tracker for The Joshua Center

When The Joshua Center approached me about building a job application tracking system, I saw an opportunity to create something that would genuinely help both the organization and the people they serve. Non-profits often rely on outdated, generic software solutions that don't quite fit their specific needs. My goal was to change that with a purpose-built application.

## The Problem It Solves

The Joshua Center helps individuals from disadvantaged backgrounds find employment opportunities. Previously, they were using a combination of Google Forms, spreadsheets, and manual record-keeping to track applicant information. This led to several issues:

1. Disjointed application process requiring multiple platforms
2. Difficulty tracking application status and history
3. Cumbersome review process for staff members
4. No centralized system for document management

The Job Application Tracker solves these problems by providing a unified platform where:

- Applicants can submit their information through a guided, multi-step form
- Staff can easily review, sort, and manage applications
- All documents are stored centrally and securely
- Application status can be tracked through the entire process

## Why I Built It This Way

### Multi-Page Form with React Router

One of the key design decisions was creating a multi-page form rather than a single long form. This approach breaks the application process into manageable chunks, reducing the cognitive load on applicants who might be filling out job applications for the first time or have limited computer experience.

I implemented this using React Router, which allowed for:
- Progress tracking between form steps
- The ability to save progress and continue later
- Validation at each step before proceeding
- A cleaner, less intimidating user interface

### State Management with Zustand

For state management, I chose Zustand over Redux. Why? The Joshua Center staff needed a solution that was easy to maintain and potentially extend in the future. Zustand's simpler API and reduced boilerplate made it ideal for this use case.

This choice proved particularly valuable when implementing the form's save and resume functionality. The lightweight nature of Zustand made it easy to persist form state to localStorage and restore it when needed.

### SQLite for Simplicity and Portability

The backend database is built on SQLite rather than a more complex system like PostgreSQL or MySQL. This decision was driven by several practical considerations:

1. The application doesn't require complex relational queries or massive scalability
2. SQLite's file-based nature makes backup and migration straightforward
3. It significantly reduces hosting costs for the non-profit
4. Deployment and maintenance are simplified for an organization with limited IT resources

### Google OAuth for Authentication

Implementing Google OAuth for authentication was another pragmatic choice. Most users already have Google accounts, which eliminates the friction of creating new credentials. It also provides robust security without requiring me to implement password management, recovery flows, and other authentication complexities.

## Challenges Encountered

### Form State Persistence

One of the biggest challenges was implementing a reliable save-and-resume feature. Many applicants might need to gather documents or information during the application process, and I didn't want them to lose progress.

The solution combined Zustand for state management with localStorage for persistence. Each form component subscribes only to the slice of state it needs, minimizing re-renders and keeping the application snappy even on older devices.

### PDF Upload and Management

Another significant challenge was handling document uploads, particularly resumes. The requirements included:

- Accepting and validating PDF files
- Storing them securely
- Making them easily accessible for staff review
- All while keeping the file sizes manageable

I implemented a custom upload component with client-side validation and progress indication. On the server side, I used Express middleware to handle file storage and implemented a simple thumbnailing system to make documents quickly previewable in the admin interface.

### Balancing Security and Usability

For a job application system, there's always tension between security requirements and ease of use. Make it too secure, and applicants struggle to complete the process. Make it too easy, and you risk data breaches.

I addressed this by implementing graduated security measures:
- Basic information requires minimal authentication
- Sensitive information is protected behind stronger authentication checks
- Admin functions require full OAuth validation and role-based access control
- Session timeouts are balanced against the time needed to complete forms

## Future Improvements

While the current system meets The Joshua Center's immediate needs, there are several areas for future enhancement:

1. **Email Notification System**: Automated updates when application status changes
2. **Advanced Analytics**: Reporting on application trends and outcomes
3. **Employer Portal**: Allow partner employers to review pre-screened applications
4. **Mobile App**: A companion app for staff to review applications on the go
5. **Integration with Job Boards**: Automatic posting to external job platforms

The architecture was designed with these possibilities in mind, with clean separation between components that would make these additions straightforward.

## What I Learned

Building this application reinforced my belief in the importance of deeply understanding the specific needs of users. Generic, off-the-shelf solutions often miss the nuances of how organizations actually work.

Additionally, I learned that for non-profit organizations, sustainability is as important as functionality. By choosing technologies that are both powerful and maintainable, I created a solution that will serve The Joshua Center for years without becoming a technical burden.

Perhaps most importantly, this project demonstrated the impact that thoughtfully designed software can have on organizations doing important work. The staff at The Joshua Center can now focus more energy on their mission rather than wrestling with spreadsheets and paperwork.

The Job Application Tracker stands as a testament to what can be achieved when software development is approached not just as a technical challenge, but as a genuine attempt to solve human problems through technology.