# Étape 1 : Construction de l'image
FROM node:18 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape 2 : Exécution de l'application
FROM node:18
WORKDIR /app
COPY --from=builder /app /app
RUN npm install --omit=dev
CMD ["node", "dist/main"]
EXPOSE 3000
