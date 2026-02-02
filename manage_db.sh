#!/bin/bash

# PostgreSQL Management Script for WSL/Ubuntu

function install_postgres() {
    echo "🔄 Updating package lists..."
    sudo apt-get update

    echo "⬇️ Installing PostgreSQL..."
    sudo apt-get install -y postgresql postgresql-contrib

    echo "🚀 Starting PostgreSQL service..."
    sudo service postgresql start

    echo "⚙️ Configuring Database..."
    # Wait a moment for the service to fully start
    sleep 3

    # Create user 'postgres' with password '123' if it doesn't exist, or alter it
    # We use the default 'postgres' user usually, so we just set the password
    sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD '123';"

    # Create the 'insta' database
    if sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw insta; then
        echo "⚠️  Database 'insta' already exists."
    else
        sudo -u postgres psql -c "CREATE DATABASE insta;"
        echo "✅ Database 'insta' created."
    fi

    echo "✅ PostgreSQL installation and setup complete!"
    echo "📝 Connection String: postgresql://postgres:123@localhost:5432/insta"
}

function uninstall_postgres() {
    echo "🛑 Stopping PostgreSQL service..."
    sudo service postgresql stop

    echo "🗑️ Removing PostgreSQL packages..."
    sudo apt-get --purge remove -y postgresql postgresql-*

    echo "🧹 Cleaning up configuration and data..."
    sudo rm -rf /etc/postgresql/
    sudo rm -rf /etc/postgresql-common/
    sudo rm -rf /var/lib/postgresql/
    sudo userdel -r postgres 2>/dev/null
    sudo groupdel postgres 2>/dev/null

    echo "✨ PostgreSQL uninstalled successfully."
}

if [ "$1" == "install" ]; then
    install_postgres
elif [ "$1" == "uninstall" ]; then
    uninstall_postgres
else
    echo "Usage: $0 {install|uninstall}"
    exit 1
fi
