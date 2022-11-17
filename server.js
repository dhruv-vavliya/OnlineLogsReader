
const express = require('express');
const path = require('path');
const cors = require('cors');       
require('dotenv').config()       

const port = process.env.PORT || 80;
const app = express();

// middlewares
app.use(cors());   
app.use(express.json());       

// routes
app.use( '/fetchlogs' ,require('./routes/logReader') );
app.use( '/pushlog' ,require('./routes/logWriter') );

// production setup
if(process.env.NODE_ENV === 'production'){
    app.use( express.static( path.join( __dirname ,"client","build")));
    app.get( "*" ,(req,res)=>{
        res.sendFile( path.join( __dirname ,"client","build","index.html"));
    })
}

app.listen( port ,()=>{
    console.log(`server started at ${port}....`);
} )
