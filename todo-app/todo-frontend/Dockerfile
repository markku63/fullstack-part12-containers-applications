FROM node:16 AS base

WORKDIR /usr/src/app

COPY . .

FROM base as test
WORKDIR /usr/src/app
COPY --from=base /usr/src/app .
RUN npm ci
ENV REACT_APP_BACKEND_URL="http://localhost:3000"
ENV CI=true
RUN npm test

FROM test as build
WORKDIR /usr/src/app
COPY --from=test /usr/src/app .
ENV REACT_APP_BACKEND_URL="http://localhost:3000"
RUN npm ci --production
RUN npm run build

FROM nginx:1.20-alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html

