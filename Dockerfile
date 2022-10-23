FROM node:16 as development

WORKDIR /app

COPY ./package*.json /app/

RUN npm install --save
RUN chmod +x /app/node_modules/.bin/nodemon
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /app/

EXPOSE 8080
CMD [ "node", "server.js" ]

# FROM development as production
