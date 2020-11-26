

const notesAreaFn = ()=>{
  
  console.log('hello')
  
 
 const data= {
   test:'hello'
 }

 const op = {
  
  method:'GET',
  headers:{
    'Access-Control-Allow-Origin': '*',
   
  
  },


 }
 const arr = []

fetch('/notes',op).then(res=>res.json()).then(data=>{arr.push(data)})

  
  
  
}





window.addEventListener('DOMContentLoaded', notesAreaFn);