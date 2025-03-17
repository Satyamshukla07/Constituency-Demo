
#!/bin/bash

# Check if a process is using port 5000 and kill it if needed
echo "Checking if port 5000 is in use..."
if lsof -i :5000 > /dev/null; then
  echo "Port 5000 is in use. Killing the process..."
  kill $(lsof -t -i:5000)
  sleep 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Start the development server
echo "Starting the application..."
npm run dev
