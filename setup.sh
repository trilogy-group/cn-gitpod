#!/bin/bash
sudo rm /etc/apt/sources.list.d/docker.list /etc/apt/sources.list.d/kubernetes.list /etc/apt/sources.list.d/kubernetes.list.save
sudo apt install -y build-essential
# leeway install
curl -L https://github.com/gitpod-io/leeway/releases/download/v0.7.3/leeway_0.7.3_Linux_arm64.tar.gz -o leeway_arm64.tar.gz
tar xvf leeway_arm64.tar.gz
rm leeway_arm64.tar.gz
sudo cp leeway /usr/local/bin
rm leeway
rm LICENSE

# golang & golangci-lint install
curl -L https://go.dev/dl/go1.19.4.linux-arm64.tar.gz -o go1.19.4.linux-arm64.tar.gz
sudo tar -C /usr/local -xzf go*.linux-arm64.tar.gz
sudo sh -c 'echo "export PATH=/usr/local/go/bin:$PATH" >> /etc/profile'
export PATH=/usr/local/go/bin:$PATH
curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(go env GOPATH)/bin v1.50.1
sudo sh -c 'echo "export PATH=$PATH:/home/ubuntu/go/bin" >> /etc/profile'
export PATH=$PATH:/home/ubuntu/go/bin
rm go*tar.gz

# docker install
sudo apt-get update -y
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release -y
sudo mkdir -p -y /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin -y

# nvm, node & yarn install
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm install --lts
npm install -g yarn

# pre-commit for gitpod task
pip install pre-commit

# install protobuf compiler & grpc-tools for ARM
sudo apt update
sudo apt install -y protobuf-compiler
# curl -L https://github.com/trilogy-group/grpc-node/releases/download/v1.11.2-arm64/node-package-linux-aarch64.tar.gz -o grpc-tools.tar.gz
# cd node_modules || exit
# mkdir grpc-tools
# cd /workspace/gitpod || exit
# tar xvf grpc-tools.tar.gz -C /workspace/gitpod/node_modules/grpc-tools
# rm grpc-tools.tar.gz

# install yq
sudo wget -qO /usr/local/bin/yq https://github.com/mikefarah/yq/releases/latest/download/yq_linux_arm64
sudo chmod a+x /usr/local/bin/yq

# install seccomp for seccompprofiler build
sudo apt install libseccomp-dev -y