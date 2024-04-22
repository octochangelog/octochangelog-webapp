# Based on a file from https://github.com/mikenikles/cypress-on-gitpod
FROM gitpod/workspace-full-vnc@sha256:b754cefe147986f3ff5d370b1b70f1c45013c32f488af3c243101645b8380e2c

ENV CYPRESS_CACHE_FOLDER=/workspace/.cypress-cache

# Install Cypress dependencies.
RUN sudo apt-get update \
 && sudo DEBIAN_FRONTEND=noninteractive apt-get install -y \
   libgtk2.0-0 \
   libgtk-3-0 \
   libnotify-dev \
   libgconf-2-4 \
   libnss3 \
   libxss1 \
   libasound2 \
   libxtst6 \
   xauth \
   xvfb \
 && sudo rm -rf /var/lib/apt/lists/*


# Use nvm to setup the version of node we want to use.
COPY .nvmrc ./
RUN bash -c ". .nvm/nvm.sh \
    && nvm install \
    && nvm use"
RUN echo "nvm use &>/dev/null" >> ~/.bashrc.d/51-nvm-fix

