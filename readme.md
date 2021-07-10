
# ParkingLotAPI

A REST API developed for a coding test, to be made in 48h.
API documentation available [here](https://robcss.stoplight.io/docs/parkinglot/reference/ParkingLotAPI.json).

## Installation
### Prerequisites

 - [Node.js](https://nodejs.org/en/download/) installed

### Get the repository

 ```
 $ git clone https://github.com/robcss/parkingLotAPI.git
  ```

### Install dependencies
Cd to the repo and install dependencies
```
$ npm install
```
## Usage
### Set up config variables

Create a **.env** file in your directory and set up the following environment variables:
```
SIZE=yourParkingLotSize
TOKEN_SECRET=yourJWTsecret
```
SIZE will default to 5 if not provided.
TOKEN_SECRET will default to "test" if not provided.

### Run the app


Run the app:
```
$ node app.js
```
Console should log this:
```
Listening on port 3000
```
The API is now ready to recieve requests.

## API Documentation
Complete API documentation available here: https://robcss.stoplight.io/docs/parkinglot/reference/ParkingLotAPI.json

## Built with:

 - [Node.js](https://nodejs.org/en/)
 - [Express.js](https://expressjs.com/)
 - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
 - [bcrypt](https://www.npmjs.com/package/bcrypt)
 - [joi](https://www.npmjs.com/package/joi)



