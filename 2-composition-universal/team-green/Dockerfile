FROM node:11

# Create app directory
RUN mkdir -p /code
WORKDIR /code

# Install app dependencies
COPY package.json yarn.lock /code/
RUN yarn install
COPY webpack.config.js /code/

# Bundle app source
COPY ./src /code/src
COPY ./images /code/images
COPY ./config /code/config
COPY ./.babelrc /code

RUN yarn build

EXPOSE 3002
CMD [ "./node_modules/.bin/nodemon", "--watch", "./src", "--exec", "yarn", "start" ]