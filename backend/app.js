// ! 1
/* 
   ! 1) dependencies installed FOR BACKEND:
   - express
   - cors
   - dotenv
   - nodemon
   - mongoose

   ! 2) how to start the backend server: 
   - on terminal type: npm start

   ! 3) the scripts inside package.json must be changed to the example below using nodemon:
   "scripts": {
    "start": "nodemon app.js"
    },
*/

require ('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()
const { db } = require('./db/db')
const { readdirSync } = require('fs')

const PORT = process.env.PORT

// ! middlewares
app.use(express.json())
app.use(cors())

// ! routes -- using readdirSync to access the routes' folder
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port: ', PORT)
    })
}

server()