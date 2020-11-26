const express = require('express');

const path = require('path');

const fetch = require('node-fetch');



const API_KEY = `AIzaSyBMtY1tYsvlOy-2iG44fHRyoRj6H_9a1h8`;

const URL = `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`;

const arr =[]



 




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

app.get('/notes', async(req, res)=>{
  
const fetch_res = await fetch(URL)
const res_json = await fetch_res.json();

console.log(res_json);
res.json(res_json.items);
  
   

})








const PORT = process.env.PORT || 3000;



app.listen(PORT, ()=>{
    console.log('im in');
})



