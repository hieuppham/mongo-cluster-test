# MongoDB Cluster Performance Test

Used modules
|||
|:---:|:---:|
|mongoose| [![mongoose](https://badge.fury.io/js/mongoose.svg)](https://www.npmjs.com/package/mongoose)|
|xlsx| [![xlsx](https://badge.fury.io/js/xlsx.svg)](https://www.npmjs.com/package/xlsx)|
|nodemon|[![npm version](https://badge.fury.io/js/nodemon.svg)](https://www.npmjs.com/package/nodemon)|

Install dependencies
```
npm install
```
Running test
``` 
node index.js
```

MongoDB connection string
``` javascript
const URI = "mongodb://192.168.122.189:27019/test_db"
```
Queries 
``` javascript
    // const queriesFile = 'employees.txt'
const queriesFile = "movies.txt"
```

Testing result file
``` javascript
const workBook = xlsx.readFile("result.xlsx")
```
Result sheets
``` javascript
// const sheetName = "ShardEmployees"
// const sheetName = "ShardMovies"
// const sheetName = "SingleEmployees"
const sheetName = "SingleMovies"
```
Collections
``` javascript
// const COLLECTION = 'employees'
const COLLECTION = 'movies'
```