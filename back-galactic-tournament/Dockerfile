# node version
FROM node:22-alpine

# working directory
WORKDIR /app

# Copy package.json
COPY package*.json ./

# Install dependencies
RUN npm install


# copy
COPY . .

# port 3000
EXPOSE 3000

# run dev
CMD ["npm", "start"]

