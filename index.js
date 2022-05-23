const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dkitf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     console.log('Bike parts DB cunnected')
//     // perform actions on the collection object
//     client.close();
// });

async function run() {
    try {
        await client.connect();
        const partsCollection = client.db('bikeParts').collection('parts');

        app.get('/parts', async (req, res) => {
            const query = {};
            const cursor = partsCollection.find(query);
            const parts = await cursor.toArray();
            res.send(parts);
        });
    }
    finally {

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('running Biks Parts Manufacturer')
});

app.listen(port, () => {
    console.log('Listening to port', port);
})

