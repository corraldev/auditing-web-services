# auditing-web-services
An exploitable scenario in order to understand how to audit and fix mistakes made on developing stages.

## How to Install 
For the installation you should execute the following bash script, you must have nodejs and npm installed on your system

````
cd ./public-server/
npm install 

cd ..
cd ./private-server/
npm install
````

## Run
Execute the following bash script on your root directory

````
node ./public-server/ &
node ./private-server/ &
````

This two services will listen on 80 for the public-server and 8090 for the private-server
if you have those ports busy feel free to change at the source code of each server, it won't change the exercise resolution.
