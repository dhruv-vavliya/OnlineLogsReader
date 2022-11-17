
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.post( '/' ,(req ,res)=>{
    try{
        // write file synchronously. 
        fs.appendFileSync( path.join(__dirname ,'..' ,'log.txt') ,req.body.log ,'utf-8' ,err => {
            if( err ){
                throw err;
            }
        } )
        res.send(200);
    }catch{
        res.send( 500 );
    }
} )

module.exports = router;
