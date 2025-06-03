# Use official Node.js image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port your app runs on (replace 3000 if different)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]