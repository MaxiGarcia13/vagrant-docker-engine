# Setting Up Your Computer

First yo make sure that you dont have docker descktop and docker cli in you computer.

If you have installed, remove it π.

Then, you need install virtualbox, vagrant and docker-compose.

## On Mac OS

```
brew install virtualbox

brew install vagrant

brew install docker

brew install docker-compose
```

# First you need to undertand how Vagrant looking for the Vagrantfile.

When you run any vagrant command, vagrant looking for the first Vagrantfile it can find, starting in the current directory until it find it in previus folders.

For Example:

```
# First try to find in current directory π§
/home/MaxiGarcia13/projects/vagrant-docker-engine/

# If it don't find it continue to find in the previous folder π
/home/MaxiGarcia13/projects/

# keep going π
/home/MaxiGarcia13/

# keep going π€¨
/home/

# At last it find here and read this file π₯³
/Vagrantfile
```

# Setting Up Vagrant

Inside the repo run `vagrant up` (this command read Vagrantfile and create the VM and install packages in your new VM)

##Β Test docker in your VM
Docker Engine and Docker CLI should be working inside the VM now. Let's test it.

```
vagrant ssh

docker run hello-world
```

## Customize your VM.

If you need install other packges you can add put in. (If you added new packages in Vagrantfile you need run `vagrant reload`, it mount again the VM)

```
config.vm.provision "shell", inline: <<-SHELL
    # HERE YOU WRITE THE PACKAGES YOU WANT
SHELL
```

Maybe you need sync project that need docker, put in this line for sync it. (It should be the same route)

```
  config.vm.synced_folder "MY_LOCAL_PROJECT", "MY_PROJECT_IN_VM"
```

If you need copy files in some path of VM, you can use

```
config.vm.provision "file", source: "MY_LOCAL_FILE", destination: "MY_LOCAL_FILE_IN_VM"
```

Also you can expose ports in your VM:

```
  config.vm.network "forwarded_port", guest: 9230, host: 9230
```

# At last

Add in your .bashrc or .zshrc

Configure Docker CLI to use the Vagrant VM

```
export DOCKER_HOST=ssh://vagrant@127.0.0.1:2222
```

### On Mac OS

Add the Vagrant ssh key to the host known keys.

```
ssh-add --apple-use-keychain [ROUTE_OF_YOUR_VAGRANT_PROJECT]/.vagrant/machines/default/virtualbox/private_key
```

## Test docker π±

run `docker run hello-world` (outside of your VM).

In case that you have an error in the output of this command, try running the command specified in the message, for example:

```
 ssh -l vagrant -p 2222 -- 127.0.0.1 docker system dial-stdio
```

## π€― Suggestion

You can install [@maxigarcia/vagrant-cli](https://github.com/MaxiGarcia13/vagrant-cli) to handle vagrantfiles.

```
npm i -g @maxigarcia/vagrant-cli

# How use it

# You can load existing vagrantfile for you use it to up, down or connect by ssh.

manage-vagrantfiles

#Β When you have vagrantfile loaded you can choose one to up, down or connect by ssh.

handle-vagrantfile
```

# Config your VSCode

Go to preference, search docker and in `Docker: Host` put `ssh://vagrant@127.0.0.1:2222` (the same value that you use in the variable DOCKER_HOST)

# Normal command to use vagrant

```
# Create or turn on the VM
vagrant up

# Stop vm
vagrant suspend

# Reload VM
vagrant reload

# Delete VM
vagrant destroy
```

π₯³
