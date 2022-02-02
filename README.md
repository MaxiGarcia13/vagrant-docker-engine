# Setting Up Your Computer

First yo make sure that you dont have docker descktop and docker cli in you computer.

If you have installed, remove it 🗑.

Then, you need install virtualbox, vagrant and docker-compose.

## On Mac OS

```
brew install virtualbox

brew install vagrant

brew install docker

brew install docker-compose
```

# Setting Up Vagrant

Inside the repo run `vagrant up` (this command read Vagrantfile and create the VM and install packages in your new VM)

## Test docker in your VM
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

# Last settings

Add in your .bashrc or .zshrc

Configure Docker CLI to use the Vagrant VM

```
export DOCKER_HOST=ssh://vagrant@127.0.0.1:2222
```

Add the Vagrant ssh key to the host known keys.

```
ssh-add --apple-use-keychain ~/.vagrant/machines/default/virtualbox/private_key
```

## Test docker 😱

run `docker run hello-world` (outside of your VM).

In case that you have an error in the output of this command, try running the command specified in the message, for example:

```
 ssh -l vagrant -p 2222 -- 127.0.0.1 docker system dial-stdio
```

## 🤯 Suggestion

You can create the aliases in your `.zshrc` or in your `.bashrc` for turn on docker. (when turn on your machine the VM maybe is turn off, you should turn on it every day).

```
alias vagrant-add-private-key="ssh-add --apple-use-keychain ~/.vagrant/machines/default/virtualbox/private_key"

alias docker-start="vagrant-add-private-key && vagrant up"
alias docker-down="vagrant suspend"
```

Every day you can use `docker-start` for get up docker or `docker-down` for suspend your docker.

# Config your VSCode
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

Happy coding! 🥳
