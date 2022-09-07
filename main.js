const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT||8080;
const readline = require('readline');
const { syncBuiltinESMExports } = require('module');


//attach http server to the socket.io
const io = require('socket.io')(http);

//route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/index.html'));
})

//create connection
io.on('connection', socket => {
    
    

    async function processLineByLine(){

        const filestream = fs.createReadStream("example/data.txt");

        const rl = readline.createInterface ({
            input: filestream,
            crlfDelay: Infinity
        });
    
        for await(const line of rl) {
            console.log(`${line}`);
            socket.send(line);
            await sleep(1000)
        }

        function sleep(ms){
            return new Promise(resolve=>{
                setTimeout(resolve,ms)
            })
        }
        
    }

    processLineByLine();


    
}, 500);


http.listen(port, () => {
    console.log(`App Listening to port ${port}`);
})


/**
 * const fileContent = fs.createReadStream("example/data.js", 'utf8');
       
        socket.send(fileContent);
        console.log(`sending: %s`, fileContent)

        fileContent.on('data', function(chunk){
            console.log(chunk);
        response.write(chunk);
            
            for (let i = 0; i < chunk.length; i++) {
                socket.send(chunk);
                console.log(chunk);
            }
            
            socket.send(chunk);
            console.log(chunk);
         }, 200)
 * 
 */