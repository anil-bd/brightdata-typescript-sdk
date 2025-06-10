# Contributing to Bright Data SDK

We welcome contributions! Please follow these guidelines.

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment: Copy `.env.example` to `.env`
4. Run tests: `npm test`

## Code Style

- Follow (Bright Data JavaScript coding)[https://brightdata.com/dna/js_code] conventions
- Use 2-space indentation
- Single quotes for strings
- Camel case for variables/functions
- Pascal case for classes
- Run `npm run lint:fix` before committing

## Submitting Changes

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Make changes following our code style
4. Add tests for new functionality
5. Update documentation
6. Commit: `git commit -m 'feat: add amazing feature'`
7. Push: `git push origin feature/amazing-feature`
8. Submit pull request

## Reporting Issues

Use GitHub Issues with:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- SDK version and environment details