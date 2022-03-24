const mongoose = require('mongoose')
const URI = "mongodb://192.168.122.189:27019/test_db"

const fs = require("fs")
    // const queriesFile = 'employees.txt'
const queriesFile = "movies.txt"
const queries = fs.readFileSync(queriesFile, "utf-8").split("\n").filter(Boolean)

const REPEAT_TIME = 30

const xlsx = require('xlsx')

const workBook = xlsx.readFile("result.xlsx")

// const sheetName = "ShardEmployees"
// const sheetName = "ShardMovies"
// const sheetName = "SingleEmployees"
const sheetName = "SingleMovies"

// const COLLECTION = 'employees'
const COLLECTION = 'movies'
async function main() {
    let records = []
    await mongoose.connect(URI)
    const movies = mongoose.connection.collection(COLLECTION)
    for (const query of queries) {
        let record = {}
        let sumEx = 0
        let sumEs = 0

        for (let i = 0; i < REPEAT_TIME; i++) {

            const explain = await movies.find(JSON.parse(query)).explain()
            const { executionStats } = explain

            sumEx += executionStats.executionTimeMillis
            sumEs += executionStats.executionStages.executionTimeMillisEstimate
        }
        record.query = query
        record.avgExecutionTimeMillis = sumEx / REPEAT_TIME
        record.avgExecutionTimeMillisEstimate = sumEs / REPEAT_TIME
        records.push(record)
    }
    workBook.Sheets[sheetName] = xlsx.utils.json_to_sheet(records)

    xlsx.writeFile(workBook, "result.xlsx")
}

main().finally(() => {
    console.log("done");
    process.exit();
})