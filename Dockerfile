FROM nginx:1.17.8

COPY conf/default.conf.template /etc/nginx/conf.d/default.conf.template

COPY dist/web-app/ /usr/share/nginx/html/