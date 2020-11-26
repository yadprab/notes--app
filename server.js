const express = require('express');

const path = require('path');

const axios = require('axios');



const API_KEY = `AIzaSyBMtY1tYsvlOy-2iG44fHRyoRj6H_9a1h8`;

const URL = `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`;

const arr = []


 axios.get(URL)
     .then(res=>arr.push(res.data))
     .catch(err=>console.log(err))



const app = express();

app.use(express.json());

const bodyParser = require('body-parser')

app.set('view engine', 'ejs')

const urlencodedParser = bodyParser.urlencoded({ extended: false })
 

app.use(express.static('public'))


app.get('/', (req, res)=>{

    res.sendFile(__dirname, 'index.html');

})

app.get('/home', (req, res)=>{

    res.sendFile(__dirname, 'index.html');

})

app.post('/notes',urlencodedParser,(req, res)=>{

    res.render('notes');
  
   

})

app.get('/notes',(req, res)=>{


res.json(arr)
  
   

})









const PORT = process.env.PORT || 3000;



app.listen(PORT, ()=>{
    console.log('im in');
})

