const express = require('express');

const path = require('path');

const app = express();

const bodyParser = require('body-parser')

app.use('/public',express.static(path.resolve(__dirname, 'frontend', 'public')));


app.get('/', (req, res)=>{

    res.sendFile(path.resolve('frontend', 'index.html'));

})

app.get('/home', (req, res)=>{

    res.sendFile(path.resolve('frontend', 'index.html'));

})


const PORT = process.env.PORT || 3000;



app.listen(PORT, ()=>{
    console.log('im in');
})

