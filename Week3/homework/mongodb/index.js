const { MongoClient, ServerApiVersion } = require("mongodb");
const { seedDatabase } = require("./seedDatabase.js");
const dotenv = require('dotenv');
dotenv.config();

async function createEpisodeExercise(client, newListing) {
  /**
   * We forgot to add the last episode of season 9. It has this information:
   *
   * episode: S09E13
   * title: MOUNTAIN HIDE-AWAY
   * elements: ["CIRRUS", "CLOUDS", "CONIFER", "DECIDIOUS", "GRASS", "MOUNTAIN", "MOUNTAINS", "RIVER", "SNOWY_MOUNTAIN", "TREE", "TREES"]
   */

  // Write code that will add this to the collection!
  const result = await client.db("databaseWeek3").collection("bob_ross_episodes").insertOne(newListing)
  console.log(
    `Created season 9 episode 13 and the document got the id ${result.insertedId}`
  );
}

async function findEpisodesExercises(client, EpisodeNumber, EpisodeName, paintedCLIFF, paintedLIGHTHOUSE) {
  /**
   * Complete the following exercises.
   * The comments indicate what to do and what the result should be!
   */

  // Find the title of episode 2 in season 2 [Should be: WINTER SUN]
  const result = await client.db("databaseWeek3").collection("bob_ross_episodes").findOne({
    episode
      : EpisodeNumber
  })
  if (result)
    console.log(
      `The title of episode 2 in season 2 is ${result.title}`
    );
  else console.log('episode S02E02 is not exist')

  // Find the season and episode number of the episode called "BLACK RIVER" [Should be: S02E06]
  const resultBlackRiver = await client.db("databaseWeek3").collection("bob_ross_episodes").findOne({
    title
      : EpisodeName
  })
  if (resultBlackRiver)
    console.log(
      `The season and episode number of the "BLACK RIVER" episode is ${resultBlackRiver.episode}`
    );
  else console.log('title BLACK RIVER is not exist')

  // Find all of the episode titles where Bob Ross painted a CLIFF [Should be: NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL]
  const resultCLIFF = await client.db("databaseWeek3").collection("bob_ross_episodes").find({
    elements: paintedCLIFF
  })
  const array=[]
  const resultCLIFF_to_array = await resultCLIFF.toArray();
  if (resultCLIFF_to_array.length > 0) {
    resultCLIFF_to_array.forEach(element => {
      array.push(element.title)
    });
    console.log(`The episodes that Bob Ross painted a CLIFF are: ${array.join(', ')}`)
  }
  else console.log('title CLIFF is not exist')

  // Find all of the episode titles where Bob Ross painted a CLIFF and a LIGHTHOUSE [Should be: NIGHT LIGHT]
  const resultCLIFF_LIGHTHOUSE = await client.db("databaseWeek3").collection("bob_ross_episodes").find({
    elements: paintedCLIFF,
    elements: paintedLIGHTHOUSE
  })
  const resultCLIFF_LIGHTHOUSE_to_array = await resultCLIFF_LIGHTHOUSE.toArray()
  if (resultCLIFF_LIGHTHOUSE_to_array.length > 0) {
    resultCLIFF_LIGHTHOUSE_to_array.forEach(element => {
      data = new Date(element).toDateString();
      console.log(
        `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${element.title}`
      );
    });
  }
  else console.log(' episode is not exist')
}

async function updateEpisodeExercises(client, BlueRidgeFalls, UpdateBlueRidgeFalls) {
  /**
   * There are some problems in the initial data that was filled in.
   * Let's use update functions to update this information.
   *
   * Note: do NOT change the data.json file
   */

  // Episode 13 in season 30 should be called BLUE RIDGE FALLS, yet it is called BLUE RIDGE FALLERS now. Fix that
  const result = await client.db("databaseWeek3").collection("bob_ross_episodes").updateOne({ episode: BlueRidgeFalls }, { $set: UpdateBlueRidgeFalls })
  console.log(
    `Ran a command to update episode 13 in season 30 and it updated ${result.matchedCount} episodes`
  );

  // Unfortunately we made a mistake in the arrays and the element type called 'BUSHES' should actually be 'BUSH' as sometimes only one bush was painted.
  // Update all of the documents in the collection that have `BUSHES` in the elements array to now have `BUSH`
  // It should update 120 episodes!
  const resultAll = await client.db("databaseWeek3").collection("bob_ross_episodes").updateMany({ elements: { $in: [/bushes/i] } },
  { $set: { "elements.$": "BUSH" } }
    )
  console.log(
    `Ran a command to update all the BUSHES to BUSH and it updated ${resultAll.modifiedCount} episodes`
  );
}

async function deleteEpisodeExercise(client, nameOfListing) {
  /**
   * It seems an errand episode has gotten into our data.
   * This is episode 14 in season 31. Please remove it and verify that it has been removed!
   */
  const result = await client.db("databaseWeek3").collection("bob_ross_episodes").deleteOne({ episode: nameOfListing })
  console.log(
    `Ran a command to delete episode and it deleted ${result.deletedCount} episodes`
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

    // Seed our database
    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(client, {
      episode: "S09E13",
      title: " MOUNTAIN HIDE-AWAY",
      elements: [ "CIRRUS", "CLOUDS", "CONIFER", "DECIDIOUS", "GRASS", "MOUNTAIN", "MOUNTAINS", "RIVER", "SNOWY_MOUNTAIN", "TREE", "TREES" ]
    });

    // READ
    await findEpisodesExercises(client, "S02E02", "BLACK RIVER", "CLIFF", "LIGHTHOUSE");

    // UPDATE
    await updateEpisodeExercises(client, "S30E13", { title: "BLUE RIDGE FALLERS" });

    // DELETE
    await deleteEpisodeExercise(client, "S31E14");
  } catch (err) {
    console.error(err);
  } finally {
    // Always close the connection at the end
    client.close();
  }
}

main();

/**
 * In the end the console should read something like this: 

Created season 9 episode 13 and the document got the id 625e9addd11e82a59aa9ff93
The title of episode 2 in season 2 is WINTER SUN
The season and episode number of the "BLACK RIVER" episode is S02E06
The episodes that Bob Ross painted a CLIFF are NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL
The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are NIGHT LIGHT
Ran a command to update episode 13 in season 30 and it updated 1 episodes
Ran a command to update all the BUSHES to BUSH and it updated 120 episodes
Ran a command to delete episode and it deleted 1 episodes
 
*/