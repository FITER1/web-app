FROM node:latest as builder
RUN npm install -g @angular/cli@9.1.12
RUN mkdir /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm install
RUN npm run build:prod

FROM nginx:1.19.3
COPY --from=builder /usr/src/app/dist/web-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]