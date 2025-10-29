const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// Claster0 user and password error
// simpleDBUser
// Je92iM98b7AiXa8p


// Claster1 User and Password 

// const uri = "mongodb+srv://simpleDBUser:<db_password>@cluster0.tachgq7.mongodb.net/?appName=Cluster0";
const uri = "mongodb+srv://simpleDBUser:Je92iM98b7AiXa8p@cluster0.tachgq7.mongodb.net/?appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



app.get('/', (req, res)=> {
    res.send('Simple CRUD Server is Runnig ');

})

async function run() {
    try{
        await client.connect();
        // add database related apis here
        const usersDB = client.db('usersDB');
        const usersCollection = usersDB.collection('users');

        app.get('/users', async (req, res)=> {
          const cursor = usersCollection.find();
          const result = await cursor.toArray();
          res.send(result);
        })




        app.post('/users', async (req, res)=>{
          // console.log('hitting the users post api');
          const newUser = req.body;
          console.log('user info: ', newUser);
          const result = await usersCollection.insertOne(newUser);
          res.send(result);


        })


        await client.db("admin").command({ping: 1});
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally{
      // await client.close();
    }
}
run().catch(console.dir)




app.listen(port, ()=> {
    console.log(`Simple CRUD server is Running on Port: ${port}`);

})


