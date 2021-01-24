import express, { response } from 'express';
import bp from 'body-parser';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex'; 
import handleRegister from './controllers/register.js';
import handleSignin from './controllers/signin.js';
import handleProfileGet from './controllers/profile.js';
import { handleImage,handleApiCall } from './controllers/image.js';

const pg = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '1234',
      database : 'smart-brain'
    }
  });

const app = express();
app.use(bp.json());
app.use(cors());


app.post('/signin', (req, res) => {handleSignin(req, res, pg, bcrypt)});
app.post('/register',(req, res) => { handleRegister(req, res, pg ,bcrypt)});
app.get('/profile/:id', (req, res) => { handleProfileGet(req, res, pg)});
app.put('/image', (req, res) => { handleImage(req, res, pg) });
app.post('/imageurl', (req, res) => { handleApiCall(req, res) });


app.listen(3000);