# Stage 1: Build the React app
FROM node:14 as build

WORKDIR /app

COPY package*.json ./

RUN npm ci --silent

COPY . .

RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:latest

# Remove default Nginx configurations
RUN rm -rf /etc/nginx/conf.d/*

# Copy the static files from the build stage to Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for web traffic
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
