# Database Configuration Guide

This project supports two different database connection methods for maximum flexibility across different deployment environments.

## Configuration Options

### Option 1: Connection String (Recommended for Deployment)

Use `DATABASE_URL` environment variable for cloud deployments (Heroku, Railway, Render, etc.):

```env
# For deployment platforms
DATABASE_URL=postgresql://username:password@host:port/database
NODE_ENV=production
```

**Benefits:**
- ✅ Single environment variable
- ✅ Works with most cloud platforms
- ✅ Automatic SSL configuration
- ✅ Optimized connection pooling for production

### Option 2: Individual Parameters (Local Development)

Use individual database parameters for local development:

```env
# For local development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=habtamu_db_web
DB_USER=postgres
DB_PASSWORD=1234
NODE_ENV=development
```

**Benefits:**
- ✅ Easy local setup
- ✅ Clear parameter visibility
- ✅ Flexible for different local configurations

## Environment Variables Reference

### Database Connection
| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `DATABASE_URL` | Complete PostgreSQL connection string | - | For deployment |
| `DB_HOST` | Database host | `localhost` | For local dev |
| `DB_PORT` | Database port | `5432` | For local dev |
| `DB_NAME` | Database name | `habtamu_db_web` | For local dev |
| `DB_USER` | Database username | `postgres` | For local dev |
| `DB_PASSWORD` | Database password | `1234` | For local dev |

### Connection Pool Settings
| Variable | Description | Default | Environment |
|----------|-------------|---------|-------------|
| `DB_MAX_CONNECTIONS` | Maximum connections in pool | `20` (prod), `10` (dev) | Optional |
| `DB_IDLE_TIMEOUT` | Idle connection timeout (ms) | `30000` | Optional |
| `DB_CONNECTION_TIMEOUT` | Connection timeout (ms) | `2000` | Optional |

### Server Configuration
| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `production` |

## Deployment Examples

### Heroku
```bash
heroku config:set DATABASE_URL=postgresql://user:pass@host:port/db
heroku config:set NODE_ENV=production
```

### Railway
```bash
railway variables set DATABASE_URL=postgresql://user:pass@host:port/db
railway variables set NODE_ENV=production
```

### Docker
```dockerfile
ENV DATABASE_URL=postgresql://user:pass@host:port/db
ENV NODE_ENV=production
```

### Local Development
```bash
# Copy example file
cp backend/.env.example backend/.env

# Edit with your local database settings
DB_HOST=localhost
DB_PORT=5432
DB_NAME=habtamu_db_web
DB_USER=postgres
DB_PASSWORD=your_password
```

## SSL Configuration

The configuration automatically handles SSL based on environment:

- **Production**: SSL enabled with `rejectUnauthorized: false` (for cloud databases)
- **Development**: SSL disabled for local connections

## Connection Pool Optimization

The system uses different pool settings for different environments:

- **Production**: Up to 20 connections, optimized for high traffic
- **Development**: Up to 10 connections, suitable for local testing

## Troubleshooting

### Common Issues

1. **Connection Refused**: Check if PostgreSQL is running and accessible
2. **Authentication Failed**: Verify username/password in environment variables
3. **SSL Errors**: Ensure `NODE_ENV=production` for cloud deployments
4. **Pool Exhaustion**: Increase `DB_MAX_CONNECTIONS` if needed

### Testing Connection

```bash
# Test database connection
cd backend
node -e "require('./database').pool.query('SELECT NOW()').then(console.log)"
```

## Migration Guide

### From Individual Parameters to Connection String

1. Get your database connection details
2. Format as: `postgresql://user:pass@host:port/db`
3. Set `DATABASE_URL` environment variable
4. Remove individual `DB_*` variables (optional)

### From Connection String to Individual Parameters

1. Parse your `DATABASE_URL`
2. Extract: host, port, database, user, password
3. Set individual `DB_*` environment variables
4. Remove `DATABASE_URL` variable
