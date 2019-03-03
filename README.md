# PondServer

Server:
Node.js + Express.js (API connected to the Ionic front end)

Database:
MongoDB + Mongoose (API connected to the MongoDB and Node.js server)

To start the server:
1. Download and install MongoDB. Start MongoDB by running mongod.exe
2. Run: npm install
3. Run: npm run build
4. Run: npm start
5. The server will launch at localhost:3000

Both 3 and 4 needs to be called every time you changed server code and want to restart the server

endpoint calls:
http://localhost:3000/api/v1/pond/participant?token=1&userId=222&name=Tiger&date=2019-03-01&time=1130 PUT
http://localhost:3000/api/v1/pond/matching?token=2&date=2019-03-01 PUT
http://localhost:3000/api/v1/pond/match?userId=111&date=2019-03-01 GET
