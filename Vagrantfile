# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|

  config.vm.box = 'ubuntu/focal64'
  config.vm.hostname = 'docker.local'
  config.vm.network 'private_network', ip: '192.168.56.4'

  # Ports exposed of the VM
  # config.vm.network "forwarded_port", guest: 80, host: 80

  config.vm.provider 'virtualbox' do |vb|
    vb.name = 'ubuntu-docker-engine'
    vb.memory = '2048'
    vb.cpus = '2'
  end

  # Projects Folder that it need docker.
  # config.vm.synced_folder "/Users/maxigarcia/Workspace", "/Users/maxigarcia/Workspace"

  config.vm.provision "file", source: "./daemon.json", destination: "/tmp/daemon.json"
  config.vm.provision "file", source: "./hosts", destination: "/tmp/hosts"
  config.vm.provision "file", source: "./.bash_variables", destination: "/tmp/.bash_variables"

  config.vm.provision "shell", inline: <<-SHELL
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo apt install -y docker-compose

    sudo addgroup docker
    sudo adduser vagrant docker

    sudo mv /tmp/daemon.json /etc/docker/.
    sudo mv /tmp/hosts /etc/.
    sudo mv /tmp/.bash_variables /home/vagrant/.

    echo "if [ -f ~/.bash_variables ]; then . ~/.bash_variables; fi" | tee -a /home/vagrant/.bashrc > /dev/null
    source /home/vagrant/.bashrc

    systemctl daemon-reload
    systemctl restart docker.service
   SHELL
end
