# OnlineLogsReader
Read online logs from file which is present at server.

# Project Setup

### `npm install`

To install all project's dependencies.\
Run in client as well as in root folder.

### `npm run dev`

To run application in local Server.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run client`

To run client application individually.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run server`

To run server application individually.\
Open [http://localhost:80](http://localhost:80) to view it in your browser.<br/><br/>


# 3 major technical issues : 
1. synchronization in Data Transfer between client and server.
    - set up synchronization using HTTP request-response.
    - ensured consistency of logs.
    
2. Read logs in chunks : 
    - set up data reading stream.
    - reads datastream in chunks [ chunksize = 0.5MB ,around 500000 logs at a time ]
    
3. Alert of log read/write : 
    - set up Alert notification to ensure data durability.
    - ensure to client for log transaction is performed correctely or not?

