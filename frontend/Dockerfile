# Étape 1 : Construction de l’image Angular
FROM node:18 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Étape 2 : Utilisation d’un serveur web Nginx pour servir l’Angular
FROM nginx:alpine
COPY --from=builder /app/dist/frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
