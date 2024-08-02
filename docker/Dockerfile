FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install -g npm && \
  npm install -g sequelize-cli && \
  rm -rf node_modules && \
  npm install

COPY . .
