# 🤝 Contributing to AI Agent Builder

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on what is best for the community
- Show empathy towards other community members

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find that you don't need to create one. When creating a bug report, include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps to reproduce the problem
- Provide specific examples
- Describe the behavior you observed and what you expected
- Include screenshots if relevant
- Note your environment (OS, Node version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- A clear and descriptive title
- A detailed description of the proposed functionality
- Explain why this enhancement would be useful
- List any similar features in other tools

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

#### Pull Request Guidelines

- Follow the existing code style
- Write clear commit messages
- Include tests for new features
- Update documentation as needed
- Ensure all tests pass
- Keep pull requests focused on a single feature or bug fix

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/ai-agent-builder.git

# Add upstream remote
git remote add upstream https://github.com/NeresFocus/ai-agent-builder.git

# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Start development
docker-compose up -d
```

## Code Style

### Backend (TypeScript/NestJS)

- Use TypeScript strict mode
- Follow NestJS conventions
- Use dependency injection
- Write unit tests for services
- Use Prisma for database operations

### Frontend (TypeScript/React/Next.js)

- Use TypeScript
- Follow React best practices
- Use functional components with hooks
- Write meaningful component names
- Keep components small and focused

## Testing

```bash
# Backend tests
cd backend
npm run test
npm run test:e2e
npm run test:cov

# Frontend tests
cd frontend
npm run test
```

## Commit Message Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(agents): add ability to export agents as API
fix(auth): resolve JWT token expiration issue
docs(readme): update installation instructions
```

## Project Structure

```
ai-agent-builder/
├── backend/           # NestJS backend
│   ├── src/
│   │   ├── modules/   # Feature modules
│   │   ├── database/  # Database config
│   │   └── main.ts
│   └── prisma/
├── frontend/          # Next.js frontend
│   ├── src/
│   │   ├── app/       # Pages (App Router)
│   │   ├── components/
│   │   └── lib/
├── docs/              # Documentation
└── docker/            # Docker configs
```

## Questions?

Feel free to ask questions by:
- Opening an issue
- Joining our Discord community
- Emailing: dev@aiagentbuilder.com

Thank you for contributing! 🎉
