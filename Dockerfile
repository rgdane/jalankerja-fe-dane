# Gunakan base image Node.js
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy file package.json dan package-lock.json (atau yarn.lock)
COPY ./src/package*.json ./

# Install dependencies
RUN npm install

# Copy semua file source ke container
COPY ./src .

# Build aplikasi Next.js (gunakan env)
RUN npm run build

# Expose port default Next.js
EXPOSE 3000

# Jalankan aplikasi Next.js
CMD ["npm", "start"]
