# Contributing to Carta

Thank you for your interest in contributing to Carta! This document provides guidelines and instructions for contributing.

## 🤝 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Git
- A GitHub account

### Setup Development Environment

1. **Fork the repository**
   - Click the "Fork" button on GitHub

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/carta.git
   cd carta
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/carta.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Add your API keys to .env.local
   ```

6. **Run development server**
   ```bash
   npm run dev
   ```

## 📝 How to Contribute

### Reporting Bugs

1. **Check existing issues** - Search to see if the bug has already been reported
2. **Create a new issue** with:
   - Clear, descriptive title
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots (if applicable)
   - Environment details (OS, browser, Node version)

### Suggesting Features

1. **Check existing feature requests**
2. **Create a new issue** with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach
   - Mockups or examples (if applicable)

### Submitting Code Changes

#### 1. Create a Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding tests
- `chore/` - Maintenance tasks

#### 2. Make Your Changes

**Code Style Guidelines:**
- Use TypeScript for type safety
- Follow existing code formatting
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

**Component Guidelines:**
- Use functional components with hooks
- Keep components focused on a single responsibility
- Extract reusable logic into custom hooks
- Use proper TypeScript types/interfaces

**File Organization:**
- Place components in `src/components/`
- Place utilities in `src/lib/`
- Place pages in `src/app/`
- Keep related files together

#### 3. Test Your Changes

```bash
# Run linter
npm run lint

# Build the project
npm run build

# Test manually
npm run dev
```

**Testing Checklist:**
- [ ] Code builds without errors
- [ ] No TypeScript errors
- [ ] No console errors in browser
- [ ] Feature works as expected
- [ ] Responsive design works
- [ ] Dark mode works (if applicable)
- [ ] Accessibility maintained

#### 4. Commit Your Changes

**Commit Message Format:**
```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting)
- `refactor` - Code refactoring
- `test` - Adding tests
- `chore` - Maintenance tasks

**Examples:**
```bash
git commit -m "feat(search): add filter by price range"
git commit -m "fix(auth): resolve sign-in redirect issue"
git commit -m "docs(readme): update installation instructions"
```

#### 5. Push to Your Fork
```bash
git push origin feature/your-feature-name
```

#### 6. Create a Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select your branch
4. Fill in the PR template:
   - **Title**: Clear, descriptive title
   - **Description**: What changes were made and why
   - **Related Issues**: Link to related issues
   - **Screenshots**: If UI changes
   - **Testing**: How you tested the changes

**PR Checklist:**
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated (if needed)
- [ ] No new warnings or errors
- [ ] Tested on multiple browsers (if UI changes)
- [ ] Responsive design verified (if UI changes)

#### 7. Code Review Process

- Maintainers will review your PR
- Address any requested changes
- Once approved, your PR will be merged

**Responding to Feedback:**
```bash
# Make requested changes
git add .
git commit -m "fix: address review comments"
git push origin feature/your-feature-name
```

## 🎨 Design Guidelines

### UI/UX Principles
- **Simplicity**: Keep interfaces clean and minimal
- **Consistency**: Follow existing design patterns
- **Accessibility**: Ensure WCAG compliance
- **Responsiveness**: Test on multiple screen sizes
- **Performance**: Optimize for speed

### Color Palette
- Primary: Emerald (#10b981)
- Background (Light): #ffffff
- Background (Dark): #0a0a0a
- Text (Light): #0a0a0a
- Text (Dark): #fafafa

### Typography
- Headings: Bricolage Grotesque
- Body: Plus Jakarta Sans
- Monospace: Geist Mono

### Spacing
Use Tailwind's spacing scale (4px increments):
- `space-1` = 4px
- `space-2` = 8px
- `space-4` = 16px
- `space-8` = 32px

## 🧪 Testing Guidelines

### Manual Testing
1. Test on multiple browsers (Chrome, Firefox, Safari, Edge)
2. Test on different screen sizes (mobile, tablet, desktop)
3. Test dark mode
4. Test with and without API keys configured
5. Test authentication flow

### Future: Automated Testing
We plan to add:
- Unit tests (Jest + React Testing Library)
- Integration tests (Playwright)
- E2E tests for critical flows

## 📚 Documentation

### When to Update Documentation
- Adding new features
- Changing existing functionality
- Fixing bugs that affect usage
- Adding new dependencies

### Documentation Files
- `README.md` - Getting started guide
- `PROJECT_DOCUMENTATION.md` - Technical documentation
- `DEPLOYMENT.md` - Deployment guide
- `CONTRIBUTING.md` - This file

## 🔒 Security

### Reporting Security Issues
**DO NOT** create public issues for security vulnerabilities.

Instead:
1. Email security concerns to [security email]
2. Include detailed description
3. Include steps to reproduce
4. Allow time for fix before public disclosure

### Security Best Practices
- Never commit API keys or secrets
- Use environment variables for sensitive data
- Validate all user inputs
- Sanitize data before display
- Follow OWASP guidelines

## 📦 Dependencies

### Adding New Dependencies

**Before adding a dependency:**
1. Check if functionality can be implemented without it
2. Verify the package is actively maintained
3. Check package size and performance impact
4. Review security advisories

**Adding a dependency:**
```bash
npm install package-name
```

**Document why the dependency was added** in your PR description.

## 🎯 Priority Areas

We especially welcome contributions in these areas:

### High Priority
- Real marketplace API integrations
- Price tracking automation
- Email notification system
- Unit and integration tests
- Performance optimizations

### Medium Priority
- Additional UI components
- More mock data products
- Improved error handling
- Accessibility improvements
- Documentation improvements

### Future Features
- Browser extension
- Mobile app
- Social features
- Advanced AI recommendations
- Multi-language support

## 💬 Communication

### Where to Ask Questions
- **GitHub Discussions** - General questions
- **GitHub Issues** - Bug reports and feature requests
- **Discord** - Real-time chat (if available)

### Response Times
- We aim to respond to issues within 48 hours
- PRs are typically reviewed within 1 week
- Security issues are prioritized

## 🏆 Recognition

Contributors will be:
- Listed in the project README
- Credited in release notes
- Invited to the contributors team (for regular contributors)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You!

Every contribution, no matter how small, is valuable and appreciated. Thank you for helping make Carta better!

---

**Questions?** Feel free to ask in GitHub Discussions or create an issue.

**Last Updated**: April 29, 2026
