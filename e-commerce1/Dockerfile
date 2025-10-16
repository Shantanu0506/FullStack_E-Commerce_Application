# Use Node.js Alpine image
FROM node:18-alpine as build

WORKDIR /app

COPY ./package.json ./package-lock.json ./

RUN npm install

COPY ./src ./src

RUN npm run build

# Serve static files with nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
