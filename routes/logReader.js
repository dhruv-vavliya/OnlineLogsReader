
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.post( '/' ,(req ,res)=>{
    
    // 0.5 MB : 2500 logs at a time.
    const readable = fs.createReadStream( 
        path.join(__dirname ,'..' ,'log.txt') ,{encoding : 'utf8' ,highWaterMark:500000 ,start: req.body.offset }
    );

    const fetchChunk = async (readable)=>{
        try{

            // read next chunk of data from log file.
            for await (const chunk of readable) {
                if( chunk != null ){
                    res.send(200 ,JSON.stringify({
                        logs : chunk,
                        isEnd : false,
                        offset : req.body.offset + 500000
                    }));   
                }else{
                    res.send(200 ,JSON.stringify({
                        isEnd : false
                    }));   
                }
                break;
            }
        }catch{
            res.send(500 ,JSON.stringify({
                isEnd : false
            }));   
        }
    }

    fetchChunk(readable);
} );

module.exports = router;
