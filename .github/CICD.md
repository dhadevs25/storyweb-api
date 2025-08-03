# 🚀 CI/CD Documentation

## 📋 Overview

Dự án này sử dụng **GitHub Actions** để tự động hóa CI/CD pipeline với các workflow sau:

## 🔄 Workflows

### 1. **🔍 CI - Test & Build** (`ci.yml`)

**Trigger:** Push hoặc PR vào `main` và `develop` branches

**Jobs:**
- **🧹 Code Quality & Linting** - ESLint, commit message validation
- **🧪 Run Tests** - Unit tests và integration tests
- **🏗️ Build Application** - TypeScript compilation
- **🔒 Security Audit** - Vulnerability scanning

### 2. **🚀 CD - Deploy** (`cd.yml`)

**Trigger:** Push vào `main` branch sau khi CI thành công

**Jobs:**
- **🚧 Deploy to Staging** - Automatic staging deployment
- **🌟 Deploy to Production** - Production deployment with approval
- **🐳 Build Docker Image** - Container image building và pushing

### 3. **🔄 Dependency Updates** (`dependencies.yml`)

**Trigger:** Scheduled (Weekly) hoặc manual

**Jobs:**
- **📦 Update Dependencies** - Auto-update packages và tạo PR

## 🔧 Setup Requirements

### GitHub Secrets

Cần thêm các secrets sau trong GitHub repository settings:

```bash
# Docker Hub (optional)
DOCKER_USERNAME=your-dockerhub-username
DOCKER_PASSWORD=your-dockerhub-password

# Deployment (khi cần)
DEPLOY_HOST=your-server-host
DEPLOY_USER=deployment-user
DEPLOY_SSH_KEY=your-private-ssh-key
```

### Environment Setup

1. **Staging Environment:**
   - Tự động deploy khi merge vào `main`
   - URL: `https://staging.your-domain.com`

2. **Production Environment:**
   - Cần approval để deploy
   - URL: `https://your-domain.com`

## 🎯 Workflow Triggers

### Automatic Triggers

```yaml
# CI runs on
- push: [main, develop]
- pull_request: [main, develop]

# CD runs on
- push: [main]
- workflow_run: CI completion

# Dependencies update
- schedule: "0 9 * * 1" # Weekly Monday 9AM UTC
```

### Manual Triggers

- Vào **Actions** tab → Select workflow → **Run workflow**

## 📊 Status Badges

Thêm vào README.md:

```markdown
![CI](https://github.com/dhadevs25/storyweb-api/workflows/🔍%20CI%20-%20Test%20&%20Build/badge.svg)
![CD](https://github.com/dhadevs25/storyweb-api/workflows/🚀%20CD%20-%20Deploy/badge.svg)
```

## 🐳 Docker Deployment

### Local Development

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f api

# Stop services
docker-compose down
```

### Production Deployment

```bash
# Build image
docker build -t storyweb-api .

# Run container
docker run -d \
  --name storyweb-api \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e MONGODB_URI=your-mongodb-connection \
  storyweb-api
```

## 🔍 Monitoring

### Health Checks

- **API Health:** `GET /health`
- **Detailed Health:** `GET /health/detailed`

### Docker Health Checks

- Containers có built-in health checks
- Tự động restart nếu unhealthy

## 🛠 Troubleshooting

### Common Issues

1. **Build Failures:**
   ```bash
   # Check logs in Actions tab
   # Fix ESLint errors locally first
   npm run lint
   ```

2. **Test Failures:**
   ```bash
   # Run tests locally
   npm test
   ```

3. **Deployment Issues:**
   ```bash
   # Check secrets configuration
   # Verify environment variables
   ```

### Debug Commands

```bash
# Local debugging
npm run dev

# Docker debugging
docker-compose logs api
docker exec -it storyweb_api sh

# Build debugging
npm run build
node dist/server.js
```

## 📈 Best Practices

1. **Commit Messages:** Follow conventional commits format
2. **Branch Strategy:** Use `main` for production, `develop` for features
3. **Testing:** Write tests before deployment
4. **Security:** Regularly update dependencies
5. **Monitoring:** Check deployment status và logs

---

**🎉 Happy Deploying!**
