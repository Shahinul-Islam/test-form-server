const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");

const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("test form server is running successfully");
});

const uri =
  "mongodb+srv://interView:fA21AoPzBmSmpw3k@cluster0.kdwgcoc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const usersCollection = client.db("testUsers").collection("usersCollection");
const sectorsCollection = client.db("testUsers").collection("sectors");

async function run() {
  try {
    //code goes here
    app.get("/sectors", async (req, res) => {
      const query = {};
      const cursor = await sectorsCollection.find(query);
      const sectors = await cursor.toArray();
      res.send(sectors);
    });
    app.get("/users", async (req, res) => {
      const query = {}; //joto object ache sob gulo select kore
      const cursor = await usersCollection.find(query); //like of pointer to get all users
      const users = await cursor.toArray(); //cursor ta ke array te convert kore dibe
      res.send(users);
    });
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
      console.log(result);
    });
  } catch {
    (err) => {
      console.error(err);
    };
  } finally {
    //code goes here
  }
}
run().catch((err) => {
  console.error(err);
});

app.listen(port, () => {
  console.log(`the server is running on port number : ${port}`);
});
