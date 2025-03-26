# H&S Assistant

A Health & Safety compliance assistant for UK construction businesses. Generates comprehensive safety reports including legal requirements, risk assessments, and method statements.

## Features

- **Report Generation**: Create detailed health and safety reports using AI technology
- **Legal Compliance**: Get comprehensive UK legal and regulatory requirements for construction projects
- **Risk Assessment**: Identify and mitigate project risks with control measures
- **Method Statements**: Generate detailed work procedures with equipment and competency requirements
- **Export Options**: Download reports in multiple formats or share via email
- **Saved Reports**: View and manage all your previously created reports

## Key User Journeys

1. [Create New Report](docs/journeys/create-report.md) - Generate a new health and safety report
2. [Save/Load Reports](docs/journeys/save-reports.md) - Manage report versions
3. [Export Reports](docs/journeys/export-reports.md) - Share and distribute reports

## Technical Stack

- React with Hooks
- Tailwind CSS for styling
- Supabase for authentication
- CockroachDB with Drizzle ORM for data storage
- OpenAI integration for AI-powered report generation

## Project Structure

The project follows a modular architecture pattern:

- `/src/modules` - Feature-specific modules
- `/src/modules/core` - Core utilities and services
- `/src/modules/ui` - Reusable UI components
- `/src/modules/auth` - Authentication related components
- `/src/modules/report` - Report generation and management
- `/api` - Backend API endpoints
- `/drizzle` - Database schemas and migrations

## Setting Up Development Environment

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with required environment variables
4. Start development server: `npm run dev`

## Deployment

The application is deployed on Vercel with the database on CockroachDB.

## License

Copyright © 2023 ZAPT Technologies. All rights reserved.