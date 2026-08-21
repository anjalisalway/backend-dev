FROM node:22-alpine

# set working directory in container 
WORKDIR /app

# copy package.json to current working directory
COPY package*.json . 

#install dependencies
RUN npm install

# copy rest of application code
COPY . .

# expose port of running app
EXPOSE 8383

# define command to run app

CMD ["node" , "./src/server.js"]