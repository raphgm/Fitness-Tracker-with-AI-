# Deploy Mona High School Fitness Tracker to Azure

## 🛠️ VS Code Setup & Required Extensions

### Essential VS Code Extensions

Install these extensions for the best development experience:

#### **Core Development Extensions**
```bash
# Install via VS Code Extensions panel or Command Palette (Ctrl+Shift+P)
```

1. **[ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)**
   - Provides React snippets and shortcuts
   - Essential for React development

2. **[TypeScript Importer](https://marketplace.visualstudio.com/items?itemName=pmneo.tsimporter)**
   - Auto-imports TypeScript modules
   - Saves time with import statements

3. **[Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag)**
   - Automatically renames paired HTML/JSX tags
   - Prevents mismatched tags

4. **[Bracket Pair Colorizer 2](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer-2)**
   - Colors matching brackets
   - Improves code readability

#### **React & TypeScript Extensions**
5. **[TypeScript Hero](https://marketplace.visualstudio.com/items?itemName=rbbit.typescript-hero)**
   - Organizes imports and provides TypeScript utilities

6. **[vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components)**
   - Syntax highlighting for styled-components (if used)

#### **CSS & Tailwind Extensions**
7. **[Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)**
   - **CRITICAL** - Autocomplete for Tailwind classes
   - Hover previews and linting

8. **[PostCSS Language Support](https://marketplace.visualstudio.com/items?itemName=csstools.postcss)**
   - Syntax highlighting for PostCSS

#### **Azure & Deployment Extensions**
9. **[Azure Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack)**
   - Complete Azure toolkit
   - Includes Azure Static Web Apps extension

10. **[Azure Static Web Apps](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestaticwebapps)**
    - Deploy directly from VS Code
    - Manage Azure Static Web Apps

11. **[Azure Account](https://marketplace.visualstudio.com/items?itemName=ms-vscode.azure-account)**
    - Sign in to Azure from VS Code

#### **Git & Version Control**
12. **[GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)**
    - Enhanced Git capabilities
    - Blame annotations and history

13. **[Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph)**
    - Visual Git repository graph

#### **Code Quality & Formatting**
14. **[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)**
    - JavaScript/TypeScript linting
    - **REQUIRED** for code quality

15. **[Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)**
    - Automatic code formatting
    - **HIGHLY RECOMMENDED**

16. **[Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)**
    - Highlights errors inline
    - Improves debugging experience

#### **Development Utilities**
17. **[REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)**
    - Test APIs directly in VS Code
    - Useful for backend testing

18. **[Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)**
    - Alternative to Postman
    - Lightweight API testing

19. **[Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)**
    - Local development server
    - Auto-refresh on changes

20. **[Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)**
    - Autocomplete for file paths
    - Prevents import errors

### Quick Installation Commands

**Install all extensions at once using VS Code CLI:**
```bash
# Core React/TypeScript extensions
code --install-extension dsznajder.es7-react-js-snippets
code --install-extension pmneo.tsimporter
code --install-extension formulahendry.auto-rename-tag
code --install-extension rbbit.typescript-hero

# Tailwind CSS (CRITICAL)
code --install-extension bradlc.vscode-tailwindcss
code --install-extension csstools.postcss

# Azure extensions
code --install-extension ms-vscode.vscode-node-azure-pack
code --install-extension ms-azuretools.vscode-azurestaticwebapps
code --install-extension ms-vscode.azure-account

# Code quality
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension usernamehw.errorlens

# Git tools
code --install-extension eamodio.gitlens
code --install-extension mhutchie.git-graph

# Development utilities
code --install-extension humao.rest-client
code --install-extension rangav.vscode-thunder-client
code --install-extension christian-kohler.path-intellisense
```

### VS Code Settings Configuration

Create `.vscode/settings.json` in your project root:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "typescript": "typescriptreact"
  },
  "tailwindCSS.includeLanguages": {
    "typescript": "typescript",
    "typescriptreact": "typescriptreact"
  },
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

### VS Code Workspace Configuration

Create `.vscode/launch.json` for debugging:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "request": "launch",
      "type": "chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

## Prerequisites

### System Requirements
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Git** for version control
- **Azure account** (free tier available)
- **GitHub account** for repository hosting

### Installation Commands

**Windows (PowerShell as Administrator):**
```bash
# Install Node.js & npm
winget install OpenJS.NodeJS.LTS

# Install Git
winget install Git.Git

# Install Azure CLI (optional)
winget install Microsoft.AzureCLI

# Verify installations
node --version
npm --version
git --version
```

**Mac (Terminal):**
```bash
# Install Homebrew (if not installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js & npm
brew install node

# Install Git
brew install git

# Install Azure CLI (optional)
brew install azure-cli

# Verify installations
node --version
npm --version
git --version
```

**Linux (Ubuntu/Debian):**
```bash
# Update package list
sudo apt update

# Install Node.js & npm
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Git
sudo apt install git

# Install Azure CLI
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash

# Verify installations
node --version
npm --version
git --version
```

## Method 1: Deploy via Azure Portal

### Step 1: Create Azure Static Web App
1. Go to [Azure Portal](https://portal.azure.com)
2. Click "Create a resource"
3. Search for "Static Web Apps"
4. Click "Create"

### Step 2: Configure Deployment
Fill in the following details:
- **Subscription**: Your Azure subscription
- **Resource Group**: Create new or use existing
- **Name**: `mona-fitness-tracker`
- **Plan Type**: Free (for development)
- **Region**: Choose closest to your users
- **Source**: GitHub
- **Organization**: Your GitHub username
- **Repository**: Your repository name
- **Branch**: `main` or `master`

### Step 3: Build Configuration
- **Build Presets**: React
- **App location**: `/` (root)
- **Build location**: `dist`
- **Output location**: `dist`

### Step 4: Deploy
1. Click "Review + Create"
2. Click "Create"
3. Azure will automatically build and deploy your app
4. You'll get a URL like: `https://mona-fitness-tracker.azurestaticapps.net`

## Method 2: Deploy via GitHub Actions (Automatic)

When you create the Static Web App, Azure automatically creates a GitHub Actions workflow file in your repository at `.github/workflows/azure-static-web-apps-<name>.yml`

This enables:
- ✅ Automatic deployment on every push to main branch
- ✅ Preview deployments for pull requests
- ✅ Built-in CI/CD pipeline

## Method 3: Deploy via Azure CLI

```bash
# Install Azure CLI
# Windows: winget install Microsoft.AzureCLI
# Mac: brew install azure-cli

# Login to Azure
az login

# Create resource group
az group create --name mona-fitness-rg --location eastus

# Create static web app
az staticwebapp create \
  --name mona-fitness-tracker \
  --resource-group mona-fitness-rg \
  --source https://github.com/YOUR_USERNAME/mona-fitness-tracker \
  --location eastus \
  --branch main \
  --app-location "/" \
  --output-location "dist"
```

## Method 4: Deploy Directly from VS Code

### Using Azure Static Web Apps Extension

1. **Install Azure Static Web Apps extension** (if not already installed)
2. **Sign in to Azure** using Azure Account extension
3. **Open Command Palette** (`Ctrl+Shift+P`)
4. **Run**: `Azure Static Web Apps: Create Static Web App...`
5. **Follow the prompts**:
   - Select subscription
   - Enter app name: `mona-fitness-tracker`
   - Select region
   - Choose build preset: `React`
   - Enter app location: `/`
   - Enter build location: `dist`

### Using Azure Tools Extension Pack

1. **Open Azure panel** in VS Code sidebar
2. **Right-click on Static Web Apps**
3. **Select "Create Static Web App..."**
4. **Follow configuration wizard**

## Configuration for Production

### Environment Variables
In Azure Portal, go to your Static Web App → Configuration → Application settings:

```
VITE_API_BASE_URL=https://your-api-endpoint.azurewebsites.net
VITE_AZURE_PERSONALIZER_ENDPOINT=https://your-personalizer.cognitiveservices.azure.com
VITE_AZURE_ANOMALY_DETECTOR_ENDPOINT=https://your-anomaly-detector.cognitiveservices.azure.com
```

### Custom Domain (Optional)
1. Go to Static Web App → Custom domains
2. Add your custom domain
3. Configure DNS records as instructed

## Alternative Azure Options

### Option 2: Azure App Service
For more control and server-side features:
1. Create App Service (Linux, Node.js)
2. Deploy using GitHub Actions or Azure DevOps
3. More expensive but offers more features

### Option 3: Azure Container Instances
For containerized deployment:
1. Create Dockerfile
2. Build container image
3. Deploy to Azure Container Registry
4. Run in Azure Container Instances

## Cost Estimation

### Azure Static Web Apps
- **Free Tier**: 
  - 100 GB bandwidth/month
  - 0.5 GB storage
  - Perfect for school projects

- **Standard Tier**: $9/month
  - 100 GB bandwidth included
  - Additional features for production

### Benefits of Azure Deployment
- ✅ Global CDN for fast loading
- ✅ Automatic HTTPS certificates
- ✅ Custom domains support
- ✅ Built-in authentication (if needed)
- ✅ API integration capabilities
- ✅ Staging environments
- ✅ GitHub integration

## Post-Deployment Steps

1. **Test the deployed app** at your Azure URL
2. **Configure custom domain** (optional)
3. **Set up monitoring** in Azure Application Insights
4. **Configure alerts** for uptime monitoring
5. **Set up backup/disaster recovery** if needed

## Troubleshooting

### Common Issues:
- **Build fails**: Check build configuration in Azure portal
- **404 errors**: Ensure output location is set to `dist`
- **Environment variables**: Add them in Azure portal configuration
- **API calls fail**: Update CORS settings if using separate backend

### Debug Steps:
1. Check build logs in Azure portal
2. Verify GitHub Actions workflow
3. Test locally with `npm run build && npm run preview`
4. Check browser console for errors

## 🎓 Learning Resources

### VS Code Tips for Students
- **Use Ctrl+Shift+P** for Command Palette
- **Ctrl+`** to open integrated terminal
- **Ctrl+Shift+E** to open file explorer
- **F12** to go to definition
- **Shift+F12** to find all references

### Keyboard Shortcuts
- **Ctrl+D** - Select next occurrence
- **Alt+Shift+Down** - Duplicate line
- **Ctrl+/** - Toggle comment
- **Ctrl+Shift+K** - Delete line

Your Mona High School Fitness Tracker will be live and accessible worldwide! 🌍

**Perfect for students to learn modern web development with Azure cloud deployment!** 🚀