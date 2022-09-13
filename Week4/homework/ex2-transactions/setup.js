const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require('dotenv');
dotenv.config();

async function createAccount(client, account) {
    const result = await client.db("databaseWeek4").collection("transactions").insertOne(account)
    console.log(
      `Created account and the document got the id ${result.insertedId}`
    );
  }

async function main() {
    if (process.env.MONGODB_URL == null) {
        throw Error(
            `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
        );
    }
    const client = new MongoClient(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverApi: ServerApiVersion.v1,
    });
    try {
        await client.connect();
        await createAccount(client, {
            account_number : 101,
            balance : 10000 
          });
          await createAccount(client, {
            account_number : 102,
            balance : 20000 
          });
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}

main();