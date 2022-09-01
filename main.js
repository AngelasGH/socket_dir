const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT||8080;

//attach http server to the socket.io
const io = require('socket.io')(http);

//route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/index.html'));
})

//create connection
io.on('connection', socket => {
    
    setInterval(function() {
        const fileContent = fs.createReadStream("example/data.txt", 'utf8');
        /**
         * socket.send(fileContent);
        console.log(`sending: %s`, fileContent)
         */
        fileContent.on('data', function(chunk){
            //response.write(chunk);
            socket.send(chunk);
            console.log(chunk);
            }, 200);
      }, 500);

      
})

http.listen(port, () => {
    console.log(`App Listening to port ${port}`);
})
