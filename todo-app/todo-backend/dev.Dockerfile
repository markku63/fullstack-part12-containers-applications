FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

ENV DEBUG=playground:*

CMD ["npm", "run", "dev"]