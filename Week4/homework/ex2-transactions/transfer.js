const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require('dotenv');
dotenv.config();

async function chang_number(client, number) {  //The change number should be incremented
    const result = await client.db("databaseWeek4").collection("transactions").findOne({
        account_number : number
    })
    if (result.account_changes) {
        return result.account_changes.length + 1
    }
    else return 1
}

async function transfer(client, sender, receiver, amount, date, remark, change_numbersender, change_numberreceiver) {
    const session = client.startSession();
    try {
        const results = await session.withTransaction(async () => { 
            // sender account updated
            await client.db("databaseWeek4").collection("transactions").updateOne({ account_number: sender },
                {
                    "$inc": { balance: -amount },
                    "$addToSet": {
                        account_changes:
                        {
                            change_number: change_numbersender,
                            amount: -amount,
                            changed_date: date,
                            remark: remark
                        }
                    }
                },
                { session }
            );
            console.log('sender account updated ');
            // receiver account updated
            await client.db("databaseWeek4").collection("transactions").updateOne({ account_number: receiver }, 
                {
                    "$inc": { balance: amount },
                    "$addToSet": {
                        account_changes: {
                            change_number: change_numberreceiver,
                            amount: +amount,
                            changed_date: date,
                            remark: remark
                        }
                    }
                },
                { session }
            );
            console.log('receiver account updated ');
        });
        if (results) {
            console.log("succeed.");
        } else {
            session.abortTransaction();
            console.log("The transaction aborted.");
        }
    } catch (err) {
        console.log(`The transaction was aborted due to an unexpected error: ${err}`);
    } finally {
        await session.endSession();
    }
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
        await transfer(client,
            101,
            102,
            1000,
            '10-01-2022',
            'kpn',
            await chang_number(client, 101),
            await chang_number(client, 102)
          ) // chang_number: we can send same values from frontend
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}

main();