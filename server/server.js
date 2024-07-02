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
const filmCharDB = process.env.MONGO_DB_FILMS_CHARACTERS;
const filmPlanetDB = process.env.MONGO_DB_FILMS_PLANETS;

// Route for /api/characters
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

// Route for /api/films
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

// Route for /api/planets
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

// Route for /api/characters/:id
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

// Route for /api/films/:id
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

// Route for /api/planets/:id
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

// Route for /api/films/:id/characters
app.get('/api/films/:id/characters', async (req, res) => {
    try {
        const id  = req.params.id;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(filmCharDB);
        const collection2 = db.collection(charactersDB)
        
        // find all of the characters within the selected film
        const result = await collection.find({film_id: parseInt(id)}).toArray();
        let allChars = [];
               
        // iterate through result, get characters from their IDs, and append to allChars array
        for (let i = 0; i < result.length; i++) {
            let charID = result[i].character_id;
            const result2 = await collection2.find({ id: parseInt(charID) }).toArray();
            allChars.push(result2[0]);
        }
        res.json(allChars);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('FILM/CHARACTER NOT FOUND');
    }
});

// Route for /api/films/:id/planets
app.get('/api/films/:id/planets', async (req, res) => {
    try {
        const id  = req.params.id;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(filmPlanetDB);
        const collection2 = db.collection(planetsDB)
        
        // find all of the planets in the selected film
        const result = await collection.find({film_id: parseInt(id)}).toArray();
        let allPlanets = [];
               
        // iterate through result, get characters from their IDs, and append to allPlanets array
        for (let i = 0; i < result.length; i++) {
            let planetID = result[i].planet_id;
            const result2 = await collection2.find({ id: parseInt(planetID) }).toArray();
            allPlanets.push(result2[0]);
        }
        res.json(allPlanets);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('FILM/PLANET NOT FOUND');
    }
});

// Route for /api/characters/:id/films
app.get('/api/characters/:id/films', async (req, res) => {
    try {
        const id  = req.params.id;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(filmCharDB);
        const collection2 = db.collection(filmsDB)
        
        // find all of the films the selected character has appeared in
        const result = await collection.find({character_id: parseInt(id)}).toArray();
        let allFilms = [];
               
        // iterate through result, get films from their IDs, and append to allFilms array
        for (let i = 0; i < result.length; i++) {
            let filmID = result[i].film_id;
            const result2 = await collection2.find({ id: parseInt(filmID) }).toArray();
            allFilms.push(result2[0]);
        }
        res.json(allFilms);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('CHARACTER/FILM NOT FOUND');
    }
});

// Route for /api/planets/:id/films
app.get('/api/planets/:id/films', async (req, res) => {
    try {
        const id  = req.params.id;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(filmPlanetDB);
        const collection2 = db.collection(filmsDB)
        
        // find all of the films the selected planet has appeared in
        const result = await collection.find({planet_id: parseInt(id)}).toArray();
        let allFilms = [];
               
        // iterate through result, get films from their IDs, and append to allFilms array
        for (let i = 0; i < result.length; i++) {
            let filmID = result[i].film_id;
            const result2 = await collection2.find({ id: parseInt(filmID) }).toArray();
            allFilms.push(result2[0]);
        }
        res.json(allFilms);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('PLANET/FILM NOT FOUND');
    }
});

// Route for /api/planets/:id/characters
app.get('/api/planets/:id/characters', async (req, res) => {
    try {
        const id  = req.params.id;
        const client = await MongoClient.connect(url);
        const db = client.db(dbName);
        const collection = db.collection(charactersDB);
        
        // find all of the characters the selected planet is home to
        const result = await collection.find({homeworld: parseInt(id)}).toArray();
        console.log(result);
        
        res.json(result);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('PLANET/FILM NOT FOUND');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});