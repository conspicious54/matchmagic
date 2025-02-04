# Use the official Node.js image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Build the app
RUN npm run build

# Expose the port
EXPOSE 8080

# Start the app
CMD [ "npm", "run", "preview" ]