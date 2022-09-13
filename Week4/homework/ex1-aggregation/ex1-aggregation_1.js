const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require('dotenv');
dotenv.config();
const csvtojson = require("csvtojson");

//Find a way to get the data in the csv file into your MongoDB database
async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  csvtojson()
    .fromFile("population_pyramid_1950-2022.csv")
    .then(csvData => {
      const changeTypeToInt = csvData.map((data) => {
        return {
          Country: data.Country,
          Year: parseInt(data.Year),
          Age: data.Age,
          M: parseInt(data.M),
          F: parseInt(data.F),
        };
      });
      MongoClient.connect(
        process.env.MONGODB_URL,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (err, client) => {
          if (err) throw err;
          client
            .db("databaseWeek4")
            .collection("aggregation_transactions")
            .insertMany(changeTypeToInt, (err, res) => {
              if (err) throw err;
              console.log(`Inserted: ${res.insertedCount} rows`);
              client.close();
            });
        }
      );
    });
}
main();
