const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require('dotenv');
dotenv.config();

async function total_population(client, country) {
    const pipeline = [
        {
            '$match': {
                'Country': country
            }
        }, {
            '$group': {
                _id: '$Year',
                countPopulation: {
                    $sum: { $sum: ['$M', '$F'] }
                }
            }
        }, {
            '$sort': {
                '_id': 1
            }
        }
    ]
    const result = client.db("databaseWeek4").collection("aggregation_transactions").aggregate(pipeline)
    await result.forEach(element => {
        console.log(`_id:${element._id}, countPopulation: ${element.countPopulation}`)
    });
}

async function all_information_for_given_Year_Age(client, year, age) {
    const pipeline = [
        {
            '$match': {
                'Year': year,
                'Age': age
            }
        }, {
            $addFields: {
                TotalPopulation: {
                    '$sum': {
                        '$add': [
                            '$M', '$F'
                        ]
                    }
                }
            }
        }
    ];
    const resultall = await client.db("databaseWeek4").collection("aggregation_transactions").aggregate(pipeline).toArray();
    await resultall.forEach(element => {
        console.log(`
        _id:${element._id}, 
        Country: ${element.Country}, 
        Year: ${element.Year}, 
        Age: ${element.Age}, 
        M: ${element.M}, 
        F: ${element.F}, 
        TotalPopulation: ${element.TotalPopulation}`)
    });
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
        await total_population(client, "Netherlands")
        await all_information_for_given_Year_Age(client, 2020, `100+`)
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}

main();