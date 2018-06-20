#Build
FROM node:9-alpine AS build

LABEL maintainer="Condusit <contact@condusit.com>" 

ADD . /usr/src/app

WORKDIR /usr/src/app

RUN cd src && yarn

RUN yarn build

#NGinx
FROM nginx:alpine

COPY --from=build /usr/src/app/dist /usr/share/nginx/html/

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

#Start Server
CMD ["nginx", "-g", "daemon off;"]

RUN echo "COWABUNGA! 😎"
