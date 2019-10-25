FROM node
# Create a new user to our new container and avoid the root user
RUN useradd --user-group --create-home --shell /bin/false luprov && \
    apt-get clean
ENV HOME=/home/luprov
COPY package.json $HOME/app/
COPY .env $HOME/app/
COPY src/ $HOME/app/src
RUN chown -R luprov:luprov $HOME/* /usr/local/
WORKDIR $HOME/app
RUN npm cache verify && \
    npm install --silent --progress=false --production
RUN chown -R luprov:luprov $HOME/*
USER luprov
EXPOSE 3000
CMD ["npm", "start"]