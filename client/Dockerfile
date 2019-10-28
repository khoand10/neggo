FROM node:10-alpine
RUN apk add --no-cache \
	curl \
	jq \
	libc6-compat \
	libffi-dev \
	linux-headers \
	mailcap \
	netcat-openbsd \
	xmlsec-dev \
	&& rm -rf /tmp/*
# Create workingdir
RUN mkdir -p /neggo/client
# Set the working directory to /client
WORKDIR /neggo/client
# copy package.json into the container at /client
COPY package*.json ./
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /client
COPY . ./
# WARNING: Remove this setting in production.
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
# Make port 4000 available to the world outside this container
EXPOSE 3000
# Run the app when the container launches
CMD ["npm", "start"]
