#!/bin/bash

# Blog S3 Sync Script
# This script sets the AWS profile and syncs blog content to S3 bucket

set -e  # Exit on any error

source "../.env"


# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting blog sync to S3...${NC}"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}Error: AWS CLI is not installed. Please install it first.${NC}"
    exit 1
fi

# Check if local directory exists
if [ ! -d "$LOCAL_DIR" ]; then
    echo -e "${RED}Error: Local directory '$LOCAL_DIR' does not exist.${NC}"
    echo -e "${YELLOW}Tip: Make sure to build your blog first (e.g., npm run build)${NC}"
    exit 1
fi

# Set AWS profile
echo -e "${YELLOW}Setting AWS profile to: $AWS_PROFILE${NC}"
export AWS_PROFILE="$AWS_PROFILE"

# Verify AWS credentials
echo -e "${YELLOW}Verifying AWS credentials...${NC}"
if ! aws sts get-caller-identity > /dev/null 2>&1; then
    echo -e "${RED}Error: AWS credentials not configured or invalid for profile '$AWS_PROFILE'${NC}"
    echo -e "${YELLOW}Please run: aws configure --profile $AWS_PROFILE${NC}"
    exit 1
fi

echo -e "${GREEN}AWS credentials verified successfully${NC}"

# Sync to S3
echo -e "${YELLOW}Syncing '$LOCAL_DIR' to 's3://$S3_BUCKET'...${NC}"
aws s3 sync "$LOCAL_DIR" "s3://$S3_BUCKET" \
    --delete \
    --exact-timestamps \
    --exclude "*.DS_Store" \
    --exclude "*.git*" \
    --profile "$AWS_PROFILE"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Sync completed successfully!${NC}"
    echo -e "${YELLOW}It's now available at: https://$S3_BUCKET.s3.amazonaws.com${NC}"
else
    echo -e "${RED}✗ Sync failed. Please check the error messages above.${NC}"
    exit 1
fi
