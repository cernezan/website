# Hostinger Deployment Setup for Fast Slow Events API

## Log Storage Configuration

### Problem
- File-based logs in the deployment directory get deleted on each deploy
- Logs contain user data and shouldn't be in Git

### Solution: Persistent Storage Outside Web Root

1. **Create a logs directory outside your public_html folder:**
   ```bash
   mkdir /home/u920584215/fast-slow-logs
   chmod 755 /home/u920584215/fast-slow-logs
   ```

2. **The log path is already configured for your account:**
   - Uses `/home/u920584215/fast-slow-logs`
   - This is outside your `public_html` directory
   - Logs will persist across deployments

3. **Set environment variable (optional):**
   Add to your Hostinger environment or in your deployment:
   ```bash
   NODE_ENV=production
   ```

## Alternative Storage Options

### Option 1: Database Storage (Recommended for High Volume)
If you expect many events, consider using:
- **MySQL** (included with Hostinger)
- **PostgreSQL** (if available)
- **SQLite** (simple file-based database)

### Option 2: External Logging Services
- **LogDNA/Mezmo** - Professional log management
- **Papertrail** - Simple cloud logging
- **Logtail** - Developer-friendly logging

### Option 3: Cloud Storage
- **Google Cloud Storage** - Store logs as files
- **AWS S3** - Reliable object storage
- **Cloudflare R2** - Cost-effective storage

## Hostinger Directory Structure
```
/home/u920584215/
├── domains/
│   └── cernezan.com/
│       └── public_html/          (your website files)
├── public_html/                  (also website files - probably symlinked)
│   ├── api/
│   │   └── fast-slow-events.js
│   └── ...
├── fast-slow-logs/              (📁 NEW - persistent logs here!)
│   ├── fast-slow-events-2025-01-27.log
│   ├── fast-slow-events-2025-01-28.log
│   └── ...
└── ...
```

## Log Management

### Automatic Cleanup (Recommended)
Add a cron job to clean old logs:
```bash
# Clean logs older than 90 days (runs daily at 2 AM)
0 2 * * * find /home/u920584215/fast-slow-logs -name "*.log" -mtime +90 -delete
```

### Manual Cleanup
```bash
# View log sizes
du -sh /home/u920584215/fast-slow-logs/*

# Delete logs older than 30 days
find /home/u920584215/fast-slow-logs -name "*.log" -mtime +30 -delete
```

## Security Considerations

1. **Log directory permissions:**
   ```bash
   chmod 755 /home/u920584215/fast-slow-logs
   chmod 644 /home/u920584215/fast-slow-logs/*.log
   ```

2. **Prevent web access:**
   - Logs are outside public_html, so not web accessible
   - No additional .htaccess needed

3. **Data privacy:**
   - Logs contain user IDs (should be anonymous)
   - No personal data should be logged
   - Consider GDPR compliance if needed

## Deployment Checklist

- [ ] Create persistent log directory outside public_html
- [ ] Update username in API endpoint code
- [ ] Test API endpoint after deployment
- [ ] Set up log rotation/cleanup
- [ ] Monitor log file sizes
- [ ] Verify logs persist after redeployment

## Monitoring

### Check if logs are working:
```bash
# SSH to your Hostinger account
tail -f /home/u920584215/fast-slow-logs/fast-slow-events-$(date +%Y-%m-%d).log
```

### View recent events:
```bash
tail -20 /home/u920584215/fast-slow-logs/*.log | jq '.'
```
