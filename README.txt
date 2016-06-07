Prerequisites:- Node, mongodb

== Client ==
1. Access "client" folder;
2. Execute the command "npm install" to install dependencies;
3. Update app/util/AppSettings.ts file: 
   a. Change the ENDPOINT to your server;
4. Update the file "bs-config.js", if you want change port to client server;
5. Execute the command "npm start" into "client" folder to run the application;

== Server ==
1. Access "server" folder;
2. Execute the command "npm install" to install dependencies;
3. Update "config/config.db.js" file: 
   a. Update the link to mongodb "config.db.url";
   b. Update the port of your node server "config.server.port";
4. Execute the command "npm start" into "server" folder to run the application;

Upon completion of the above steps

1. Open your url client server in browser. In my case http://localhot:8080
2. If the map got loaded successfully, you can:
   a. Create Donor: click anywhere on the map, it should display a modal form to you fill the fields and save;
      a.1: When donor is created, any informations will be display in a alert. If you want edit this new donor, click on the message ("Click here to edit");
   b. View Donor: Upon creation a donor, the map show a pin to mark a donor on map, click on the pin and you should see the info.
3. To verify live streaming of donors, open the web app in two different browser windows, add a donor on one window and see if that gets reflected on another window.


== Tests ==
1. Execute the command "npm install -g mocha" to install "mocha" globally;
2. Access "TESTS" folder;
3. Execute the command "npm install" to install test dependencies;
4. Execute the command "npm start" into the "server" folder 
4. Execute the command "npm test" into the "Tests" folder to run tests;

Any questions feel free to contact me at gabfeitosa@gmail.com