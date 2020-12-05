const express = require('express');


const fetch = require('node-fetch');

require('dotenv').config();



const API_KEY =`AIzaSyBMtY1tYsvlOy-2iG44fHRyoRj6H_9a1h8`;
const URL = `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`;





 




const app = express();


const bodyParser = require('body-parser')

app.set('view engine', 'ejs')

app.use(express.json());



const urlencodedParser = bodyParser.urlencoded({ extended: false })
 app.use(bodyParser.urlencoded({
  extended: true
}));
const jsonParser = bodyParser.json();
app.use(bodyParser.json())


app.use(express.static('public'));

app.use(express.static('src'));




app.get('/', (req, res)=>{

    res.sendFile(__dirname, 'index.html');

})

app.get('/home', (req, res)=>{
  
    res.sendFile(__dirname, 'index.html');

})



app.post('/notes/:name/:id',jsonParser,(req, res)=>{

   
    res.render('notes', {data:req.body})
  
  
   

})

app.get('/notes/:name/:id', async(req, res)=>{


  
  
const fetch_res = await fetch(URL)
const res_json = await fetch_res.json();


res.json(res_json.items);
  
   

})








const PORT = process.env.PORT || 3000;



app.listen(PORT, ()=>{
    console.log('im in');
})



