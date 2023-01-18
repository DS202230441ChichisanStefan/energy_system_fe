### STAGE 1: Build ###
FROM node:16.18 as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

### STAGE 2: Run ###
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/ds2022-30441-chichisan-stefan-1-frontend /usr/share/nginx/html
