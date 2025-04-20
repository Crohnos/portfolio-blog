---
author: John Graham
pubDatetime: 2025-04-19T00:00:00Z
title: Building AI-Author - My Journey Creating an Interactive Story Generator
slug: building-ai-author-interactive-story-generator
featured: true
draft: false
tags:
  - Web Development
  - AI
  - Full Stack
description: When I set out to build AI-Author, I had a clear vision - create a platform where users could generate personalized stories with the help of AI. The project would showcase modern web development practices while exploring the creative possibilities of AI-assisted storytelling.
---

# Building AI-Author: My Journey Creating an Interactive Story Generator

When I set out to build AI-Author, I had a clear vision: create a platform where users could generate personalized stories with the help of AI. The project would not only showcase modern web development practices but also explore the creative possibilities of AI-assisted storytelling.

## The Problem It Solves

As a developer who enjoys creative writing, I've always been fascinated by the intersection of technology and storytelling. The traditional writing process can be time-consuming and sometimes hindered by writer's block. I wanted to create a tool that could:

1. Help users generate unique stories based on their preferences
2. Provide a platform to save and revisit these stories
3. Make the creative writing process more accessible to everyone

AI-Author addresses these needs by offering a user-friendly interface where anyone can input parameters like genre, setting, and characters, then receive a fully-formed story in seconds.

## Technical Design Decisions

### Why React 19 + TypeScript for the Frontend

I chose React 19 for the frontend because of its robust component model and the new features like automatic batching and improved Suspense support. Pairing it with TypeScript was a no-brainer – the type safety it provides has saved me countless hours of debugging, especially when working with complex state management and API responses.

For state management, I implemented Zustand instead of Redux. The decision came down to Zustand's simplicity and reduced boilerplate while still providing powerful state management capabilities. This was particularly important for managing the story generation parameters and user library.

### Bun + Express + SQLite for the Backend

For the backend, I wanted something lightweight yet powerful. Express has been my go-to for API development, and pairing it with Bun provided significant performance improvements over traditional Node.js. The SQLite database was perfect for this project – it's simple to set up, requires no separate server, and provides all the relational database features needed for storing user accounts and stories.

One of the most interesting aspects was integrating with Anthropic's Claude API for story generation. The challenge was crafting prompts that would consistently produce high-quality, coherent narratives while still incorporating the user's parameters.

## Challenges Encountered

### Prompt Engineering Complexity

The biggest challenge was definitely the prompt engineering. Getting consistent, high-quality stories required extensive experimentation with the prompting technique. I learned that providing clear structural guidelines to the AI yielded much better results than open-ended prompts.

For example, instead of just asking for "a fantasy story," I created a structured prompt template that specified narrative elements like introduction, conflict, character development, and resolution. This approach dramatically improved the coherence and quality of the generated stories.

### Managing Generation Parameters

Another challenge was determining the right balance of parameters to expose to users. Too few options would limit creativity, while too many would overwhelm users and potentially confuse the AI model.

I settled on a curated set of parameters including genre, setting, tone, protagonist traits, and antagonist traits. This provided enough customization without becoming unwieldy. Behind the scenes, these parameters are translated into a sophisticated prompt that guides the AI's generation process.

### Responsive UI Design

Creating an immersive reading experience that worked across all device sizes required careful design considerations. I wanted the application to feel like a digital book when reading stories, but also maintain usability on mobile devices.

The solution was a responsive design using PicoCSS, with special attention to typography, line height, and reading width. For mobile, I implemented a simplified interface with touch-friendly controls.

## Future Improvements

There's still so much potential to expand AI-Author:

1. **Branching Narratives**: Allowing users to influence the story direction at key points
2. **Character Illustrations**: Generating AI images of characters to accompany the stories
3. **Audio Narration**: Text-to-speech functionality to listen to stories
4. **Collaborative Writing**: Enabling users to work with the AI to co-write stories

The framework I've built is flexible enough to accommodate these features, with the main architecture already supporting extension points.

## Lessons Learned

Building AI-Author reinforced several key development principles:

1. **Start with a Clear User Story**: Understanding exactly what problem I was solving helped focus development efforts
2. **Prototype Early and Often**: Testing various prompting techniques early saved time later
3. **Type Safety Pays Off**: TypeScript's rigor caught numerous potential issues before they became problems
4. **Modern Tools Boost Productivity**: The combination of Bun, React 19, and modern state management made development significantly faster

The most important lesson was about the power of properly configured AI prompts. The same AI model could produce drastically different results depending on how the prompts were structured – showcasing that the "interface" to AI systems is as important as the model itself.

AI-Author represents not just a technical achievement, but a glimpse into how AI can enhance creative processes rather than replace them. It's a tool that augments human creativity, providing a springboard for ideas while keeping the user in control of the final outcome.

As AI technology continues to evolve, I'm excited to see how projects like this can bridge the gap between technical capability and creative expression.