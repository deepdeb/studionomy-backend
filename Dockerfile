# Use the latest Node.js LTS version
FROM node:lts-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --pure-lockfile

# Copy the rest of the application files
COPY . .

# Install PM2 globally
# RUN yarn global add pm2

# Expose the necessary port (if needed, adjust this to match your app's port)
EXPOSE 5000

# Start your Node.js application with PM2
# CMD ["pm2-runtime", "start", "src/index.js", "--env", "production"]

# Use CMD to start the application without PM2 in the foreground
CMD ["yarn", "launch"]
