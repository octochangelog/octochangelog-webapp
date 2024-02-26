# Based on a file from https://github.com/mikenikles/cypress-on-gitpod
FROM gitpod/workspace-full-vnc@sha256:639296fd504c9d10af3ccf473e90f21d973df1308e841aa50fe3e14b30ee6a9b

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

