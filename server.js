const express = require('express');
const bodyParser = require('body-parser');
const { spawn } = require('child_process'); 
const app = express(); 
const fs = require('fs');
const { response } = require('express');
const PORT = 3333;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.sendFile(`${__dirname}/public/index.html`);
}); 


app.post('/readPython', (req, res) => {
    var dataToSend;
    const python = spawn('python3',['public/script.py']);

    python.stdout.on('data', (data) => {
        dataToSend = data.toString();
        console.log(dataToSend)
    })

    python.stderr.on('data', (data) => {
        console.error(`stderrr: ${data}`);
    })

    python.on('exit', (code) => {
        console.log(`child process exited with code ${code}, ${dataToSend}`);
        res.json({
            messageResponse: `djaida ${dataToSend}`
        });
    })
})


var listener = app.listen(PORT, () => {
    console.log(`Your app is listening on port ${listener.address().port}`)
});

