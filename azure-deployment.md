# Deploy Mona High School Fitness Tracker to Azure

## Prerequisites
- Azure account (free tier available)
- GitHub repository with your code
- Azure CLI installed (optional)

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

Your Mona High School Fitness Tracker will be live and accessible worldwide! 🌍