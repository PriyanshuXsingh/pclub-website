# Contributing to This Project

Thanks for your interest in contributing! Please follow the guidelines below to get started.

---

## 🚀 Project Setup

We use **Node.js** with **npm** as the package manager.

### 1. Clone and Install

```bash
git clone https://github.com/pclub-uiet/pclub-website.git
cd pclub-website
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

This starts the Next.js development server.

---

## 🔧 Code Standards and Linting

We use **ESLint** to enforce code quality and **lefthook** for pre-commit checks.

### ✅ Before You Commit

- Run lint to check for issues:

  ```bash
  npm run lint
  ```

- Automatically fix lint errors:

  ```bash
  npm run lint:fix
  ```

- **Note:** A `lefthook` pre-commit script will run `npm run lint` automatically. Make sure all linting issues are resolved before committing.

---

## 🌱 Git Flow

Follow this Git workflow when contributing:

### 1. Fork the Repo

Click **"Fork"** at the top-right of the GitHub repository and clone your fork locally.

```bash
git clone https://github.com/your-username/project-name.git
cd project-name
```

### 2. Create upstream

```bash
git remote add upstream https://github.com/your-username/project-name.git
```

### 3. Create a Branch

Name your branch according to the feature or fix:

```bash
git checkout -b feature/your-feature-name
```

### 4. Make Your Changes

Work on your feature or bugfix. Make sure to commit often and write clear commit messages. make sure to follow commit message conventions

### 5. Push and Create a Pull Request

```bash
git push origin feature/your-feature-name
```

Go to your forked repo on GitHub and click **"Compare & pull request"**. Submit your PR against the `main` branch of the original repository.

---

## 🧪 Summary

- Use `npm install` and `npm run dev` to get started
- Run `npm run lint` and `npm run lint:fix` to maintain code quality
- All commits are validated by `lefthook` pre-commit linting
- Follow the Git flow: Fork → Branch → PR to `main`

Thank you for contributing!
