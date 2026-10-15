# Spins of Doom - iGaming Slot Game

A React + TypeScript + PIXI.js slot game built with modern web technologies.

## Quick Reference - NPM Commands

```bash
# Install project dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Compile SCSS files (run in separate terminal)
npm run compile:sass
```

---

## Prerequisites (Install these first!)

Before opening this project, you need to install the following tools:

### 1. Node.js and npm
- **Download Node.js**: Go to https://nodejs.org/
- **Choose the LTS version** (Long Term Support) - this is the stable version
- **Download and install** - this will also install npm (Node Package Manager)
- **Verify installation**: Open your terminal/command prompt and type:
  ```
  node --version
  npm --version
  ```
  Both commands should show version numbers (e.g., v18.17.0 and 9.6.7)

### 2. GitHub Desktop (Version Control - GUI)
- **Download GitHub Desktop**: Go to https://desktop.github.com/
- **Install GitHub Desktop** with default settings
- **Sign in to your GitHub account** (or create one at github.com if you don't have one)
- **Verify installation**: You should see the GitHub Desktop interface when you open it
- **Make a new repo and then delete the initial gitignore file
- **Cut the unzipped folder contents of the project and place inside the newly created repo folder
- **Observing the repo from within Github Desktop should show the newly added files
- **After checking that the project successfully loads after the install steps below,
commit the changes
- **Duplicate the main branch and name it Develop - use this branch to experiment, make further branches
- **Thoroughly test your develop branches and optionally merge into main branch

### 3. Code Editor (Recommended: Visual Studio Code)
- **Download VS Code**: Go to https://code.visualstudio.com/
- **Install VS Code** with default settings
- **Optional but helpful extensions**:
  - TypeScript and JavaScript Language Features (built-in)
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter
  - Auto Rename Tag

## Project Setup Instructions

### Step 1: Extract the Project
1. **Download the project zip file** (if you haven't already)
2. **Extract the zip file** to your desired location on your computer
   - Right-click the zip file → "Extract All" (Windows)
   - Or double-click the zip file and drag the folder out (Mac)
3. **Note the project folder location** - you'll need this for the next steps

### Step 2: Install Project Dependencies
Open your terminal/command prompt in the project folder and run:
```bash
npm install
```
This will install all the required packages (React, TypeScript, PIXI.js, etc.)

### Step 3: Start the Development Server
```bash
npm start
```
This will:
- Start the webpack development server
- Open your browser automatically
- Show the game at http://localhost:8080 (or similar port)

### Step 4: Start SCSS Compilation (in a separate terminal)
Open a new terminal window in the project folder and run:
```bash
npm run compile:sass
```
This watches for SCSS file changes and compiles them to CSS.

## Available Commands

- `npm start` - Run the local development server
- `npm run build` - Create a production build for deployment
- `npm run compile:sass` - Compile SCSS files to CSS (with watch mode)

## Development Tips

- **VS Code Shortcut**: `Ctrl+Shift+P` → "Developer: Reload Window" to refresh
- **SCSS Compilation**: Remember to close the SCSS compile terminal when swapping branches to prevent watcher conflicts
- **Hot Reload**: The development server automatically refreshes when you save files
- **Weird Typescript Errors**: Swapping branches can effect TypeScript. Try closing and opening a new terminal
useful sites

Sass installation guide
https://dev.to/adetutu/how-to-install-sass-locally-using-node-package-manager-npm-89

for adding amazing emojis to your console logging
https://emojipedia.org/  

spine animation tutorial
https://pixijs.com/8.x/tutorials/spine-boy-adventure#1

sprite sheet maker both png and json
https://www.codeandweb.com/free-sprite-sheet-packer

PNG asset resizing
https://www.iloveimg.com/resize-image

Publish and share your work
https://app.netlify.com/

Pixi Examples
https://pixijs.com/8.x/examples

Free / Almost Free Game Assets
https://itch.io/game-assets

Gimp Image Editor Download
https://www.gimp.org/

A.I. Music Generator
https://my.soundful.com/
