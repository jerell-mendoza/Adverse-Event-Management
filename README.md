# Adverse-Event-Management

Hi! This is a simple CRUD application for "Adverse Events Management" utilizing MongoDb, Angular 2, NodeJs, and Express! 

Build it up using docker command: 
docker-compose build
then run it with 
docker-compose up

Once it's up and running navigate in your browser to localhost:4200 and you should be good to go. If you are on windows you may need to find your container ip address instead:
-in cmd: docker-machine ls     -- this will give you your vm ip
-navigate to port: 4200 on that ip address

Note - it's currently loading 20,000 records so there may be some latency because it is loading all the records at once.

Future improvements:
-implement pagination in api through query params
-implement pagination in ui
