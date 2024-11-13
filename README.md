# Zetamax

ZetaMax is an interactive mathematics game built with modern web technologies, designed to help users practice and improve their mathematical skills in an engaging way.

## Tech Stack

- **Frontend Framework**: [Next.js 15](https://nextjs.org/) with React 18
- **Authentication**: [Clerk](https://clerk.com/) for user management and authentication
- **Backend/Database**: [Convex](https://www.convex.dev/) for real-time backend functionality
- **Styling**: TailwindCSS with shadcn/ui components and custom animations
- **Type Safety**: TypeScript for robust development
- **State Management**: Custom hooks for game state and user context

## Features

- 🎮 Interactive mathematics game with real-time scoring
- 🔐 Secure user authentication and profile management via Clerk
- 📊 Performance analytics and score tracking
- ⏱️ Timer-based gameplay
- 🎨 Modern, responsive UI with gradient animations
- 💾 Persistent score storage with Convex database
- 🔄 Real-time updates and synchronization
- 📱 Mobile-friendly design

## Project Structure

```/src```
- ```/app```: Next.js app router pages and layouts
- ```/components```: React components organized by category
  - ```/ui```: Base UI components (cards, toasts etc)
  - ```/clerk-components```: Authentication related components  
  - ```/custom-components```: Game specific components
  - ```/hover-components```: Interactive/animated components
- ```/contexts```: React context providers
- ```/hooks```: Custom React hooks for game logic
- ```/lib```: Utility functions and helpers
- ```/utils```: Configuration and type utilities
- ```/webhooks```: Webhook handlers for external services

```/convex```
- Database schema and mutation/query functions
- Generated TypeScript types and API