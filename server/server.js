import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

//const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
const PORT = 3000;

const url = process.env.MONGO_DB_URL;
const dbName = process.env.MONGO_DB;
const planetsDB = process.env.MONGO_DB_PLANETS;
const filmsDB = process.env.MONGO_DB_FILMS;
const charactersDB = process.env.MONGO_DB_CHARACTERS;


app.get('/api/planets', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(planetsDB);
        const planets = await collection.find({}).toArray();
        res.json(planets);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("NO PLANETS FOUND");
    }
});

app.get('/api/films', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(filmsDB);
        const films = await collection.find({}).toArray();
        res.json(films);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("NO FILMS FOUND");
    }
});

app.get('/api/characters', async (req, res) => {
    try {
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(charactersDB);
        const characters = await collection.find({}).toArray();
        res.json(characters);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("NO CHARACTERS FOUND");
    }
});

app.get('/api/characters/:id', async (req, res) => {
    try {
        const id  = req.params.id;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(charactersDB);
        const result = await collection.find({ id: parseInt(id) }).toArray();
        res.json(result);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('CHARACTER NOT FOUND');
    }
});

app.get('/api/films/:id', async (req, res) => {
    try {
        const id  = req.params.id;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(filmsDB);
        const result = await collection.find({ id: parseInt(id) }).toArray();
        res.json(result);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('FILM NOT FOUND');
    }
});


app.get('/api/planets/:id', async (req, res) => {
    try {
        const id  = req.params.id;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(planetsDB);
        const result = await collection.find({ id: parseInt(id) }).toArray();
        res.json(result);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('PLANET NOT FOUND');
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});