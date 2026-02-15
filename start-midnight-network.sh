#!/bin/bash

# Script to start the Midnight local development network
# This starts the Node, Indexer, and Proof Server using Docker Compose

echo "🌙 Starting Midnight Local Development Network..."
echo ""

cd "$(dirname "$0")/will-cli"

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker is not running. Please start Docker Desktop first."
    exit 1
fi

echo "✅ Docker is running"
echo ""

# Start the containers
echo "🚀 Starting containers (Node, Indexer, Proof Server)..."
docker-compose -f standalone.yml up -d

# Wait for services to be ready
echo ""
echo "⏳ Waiting for services to start..."
sleep 5

# Check container status
echo ""
echo "📊 Container Status:"
docker-compose -f standalone.yml ps

echo ""
echo "✅ Midnight network is starting!"
echo ""
echo "Service URLs:"
echo "  - Node:         http://localhost:9944"
echo "  - Indexer:      http://localhost:8088"
echo "  - Proof Server: http://localhost:6300"
echo ""
echo "To view logs: docker-compose -f will-cli/standalone.yml logs -f"
echo "To stop:      docker-compose -f will-cli/standalone.yml down"
