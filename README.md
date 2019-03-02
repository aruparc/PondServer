# PondServer

Server:
Node.js + Express.js (API connected to the Ionic front end)

Database:
MongoDB + Mongoose (API connected to the MongoDB and Node.js server)

Run:
start MongoDB
npm install
npm run build
npm start

endpoint calls:
http://localhost:3000/api/v1/pond/participant?token=1&userId=222&name=Tiger&date=2019-03-01&time=1130 PUT
http://localhost:3000/api/v1/pond/matching?token=2&date=2019-03-01 PUT
http://localhost:3000/api/v1/pond/match?userId=111&date=2019-03-01 GET
