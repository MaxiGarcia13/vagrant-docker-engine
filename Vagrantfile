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
  # config.vm.synced_folder "/Users/maxigarcia/Workspace/job/git/", "/Users/maxigarcia/Workspace/job/git/"

  config.vm.provision "file", source: "./docker.service", destination: "/home/vagrant/docker.service"
  config.vm.provision "file", source: "./daemon.json", destination: "/etc/docker/daemon.json"
  config.vm.provision "shell", inline: <<-SHELL
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo apt install docker-compose

    sudo addgroup docker
    sudo adduser vagrant docker

    systemctl daemon-reload
    systemctl restart docker.service
   SHELL
end
