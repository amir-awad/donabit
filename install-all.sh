#!/bin/bash

services=("client" "server")

for service in "${services[@]}" ; do
    echo "Installing $service"
    cd $service
    npm install
    cd ..
done