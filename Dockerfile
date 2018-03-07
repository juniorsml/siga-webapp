FROM node:9 

MAINTAINER Condusit 

# Create app directory
WORKDIR /usr/src/app

ADD . /usr/src/app

	

# install packages using Yarn
# ADD package.json /tmp/package.json
# RUN cd /tmp && yarn
# RUN cd /usr/src/app && ln -s /tmp/node_modules
RUN yarn
RUN yarn build


# Start from a new nginx image
FROM nginx:alpine
COPY --from=0  /usr/src/app/dist /usr/share/nginx/html/

#Start Server
CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80

RUN echo "COWABUNGA! 😎"



