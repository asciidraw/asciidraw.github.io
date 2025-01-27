[![CodeQL](https://github.com/asciidraw/asciidraw.github.io/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/asciidraw/asciidraw.github.io/actions/workflows/github-code-scanning/codeql)
[![Deploy to Pages](https://github.com/asciidraw/asciidraw.github.io/actions/workflows/pages-deploy.yml/badge.svg)](https://github.com/asciidraw/asciidraw.github.io/actions/workflows/pages-deploy.yml)

![repo size](https://img.shields.io/github/repo-size/asciidraw/asciidraw.github.io?logo=github)
![code size](https://img.shields.io/github/languages/code-size/asciidraw/asciidraw.github.io?logo=github)

# asciidraw

> [!WARNING]
> Be sure you are in the source directory (`src/asciidraw/`) and not the repository root directory when executing commands.

## Project Setup

This Project uses npm as the package manager.

> [!IMPORTANT]
> The minimum npm version is 20

> [!TIP]
> If you don't have it installed you can follow [this tutorial](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

```sh
npm install
```

### Compile and Hot-Reload for Development

Starts this project in development mode. Which means that when you change the code these changes are automatically reflected in the browser.

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

This command parses all files and creates a build. The resulting files are in the generated `dist/` directory.

```sh
npm run build
```

### Preview Build locally

This command should be executed after the [build process](#type-check-compile-and-minify-for-production) and serves the project locally.
See in the command-line to know how to reach the page. (it should be https://localhost:5173 but this could vary)

```sh
npm run preview
```

<!--
### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
-->
