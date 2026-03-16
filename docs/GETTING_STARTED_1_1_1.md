# Getting Started Guide

## For New Developers

This guide will help you understand and work on this project, even if you've never seen it before.

## Prerequisites

Before starting, ensure you have:

- [ ] Node.js 22+ installed ([Download](https://nodejs.org))
- [ ] npm (comes with Node.js) or yarn
- [ ] Code editor (VS Code recommended)
- [ ] Git installed ([Download](https://git-scm.com))
- [ ] GitHub account

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone https://github.com/mk-knight23/49-starter-jamstack-blog.git
cd 49-starter-jamstack-blog
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages defined in `package.json`.


### 3. Start Development Server

```bash
npm run dev
```


Open http://localhost:3000 in your browser.

### 4. Explore the Code

**Key Files to Understand:**

1. **README.md** - Project overview and quick start
2. **package.json** - Dependencies and scripts
3. **src/** - Source code
4. **docs/Project-Brain/** - This documentation

**Recommended Reading Order:**

1. [PROJECT_OVERVIEW.md](PROJECT_OVERVIEW.md) - What is this project?
2. [HOW_IT_WORKS.md](HOW_IT_WORKS.md) - Architecture and flow
3. [TECH_STACK.md](TECH_STACK.md) - Technologies used
4. [FEATURES_LIST.md](FEATURES_LIST.md) - What features exist

## Development Workflow

### Making Changes

1. **Create a branch:**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make changes** in your code editor

3. **Test changes:**
   ```bash
   npm test
   ```

4. **Commit changes:**
   ```bash
   git add .
   git commit -m "feat: add my feature"
   ```

5. **Push and create PR:**
   ```bash
   git push origin feature/my-feature
   ```

### Code Style

- Follow existing code patterns
- Use ESLint and Prettier (auto-format on save)
- Write meaningful commit messages
- Add tests for new features

## Common Tasks

### Adding a New Component

1. Create file in `src/components/ComponentName.jsx`
2. Import and use in parent component
3. Add tests in `__tests__/ComponentName.test.jsx`
4. Update documentation if needed

### Fixing a Bug

1. Create test that reproduces bug
2. Fix the bug
3. Ensure test passes
4. Commit with "fix:" prefix

### Updating Dependencies

```bash
npm update
npm audit fix
```

## Getting Help

1. **Check Documentation:** Read through Project Brain
2. **Check Issues:** GitHub Issues tab
3. **Contact Author:** kazimusharraf1234@gmail.com

## Next Steps

- ✅ Set up local environment
- ✅ Understand project structure
- ✅ Make your first change
- ✅ Submit your first PR

---
*Part of [60 Projects Ecosystem](https://github.com/mk-knight23/60-Projects)*
