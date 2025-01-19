#!/bin/bash

# Set PostgreSQL paths (using double quotes and removing eval)
PSQL="/c/Program Files/PostgreSQL/17/bin/psql.exe"
PG_DUMP="/c/Program Files/PostgreSQL/17/bin/pg_dump.exe"

# Database connection details
DB_HOST="netflix-ms-db.postgres.database.azure.com"
DB_USER="NetflixAdmin"
DB_NAME="api-structure"
DB_PORT="5432"
export PGPASSWORD="Special-Cookie"

# Backup location
BACKUP_DIR="C:/Users/trifa/Desktop/netflix_backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Test database connection
echo "Testing database connection..."
"$PSQL" -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "SELECT version();"

if [ $? -ne 0 ]; then
    echo "Error: Database connection failed. Please check your connection details."
    exit 1
fi

echo "Connection successful! Proceeding with backup..."

# Full backup with verbose output
echo "Creating full backup... $(date)"
"$PG_DUMP" -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -F custom -v -f "$BACKUP_DIR/netflix_backup_$DATE.dump"

if [ $? -ne 0 ]; then
    echo "Error: Backup failed!"
    exit 1
fi

echo "Backup completed at $(date)"

# Clear password from environment for security
unset PGPASSWORD