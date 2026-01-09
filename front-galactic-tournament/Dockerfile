# node version
FROM node:22-alpine

# working directory
WORKDIR /app

# Copy package.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Disable Angular Analytics
ENV NG_CLI_ANALYTICS=false

# copy
COPY . .

# port 4200
EXPOSE 4200

# run dev
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--poll", "2000"]

