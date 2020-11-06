FROM nginx:1.19.3-alpine
EXPOSE 80
COPY build /var/www
COPY nginx.conf /etc/nginx/nginx.conf
