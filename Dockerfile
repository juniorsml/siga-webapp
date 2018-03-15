FROM condusit/nginx-node-yarn:1.1.0

MAINTAINER Condusit 

# Create app directory
WORKDIR /tmp

ADD . /tmp
	

RUN apt-get install make
RUN npm rebuild node-sass --force
RUN yarn
RUN yarn build
RUN  ls -al



RUN cp -R  /tmp/dist/*  /usr/share/nginx/html/

#Start Server
CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80

RUN echo "COWABUNGA! 😎"



