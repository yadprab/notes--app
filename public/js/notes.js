

const notesAreaFn = ()=>{
  
 
  
 
 const data= {
   test:'hello'
 }

 const op = {
  
  method:'GET',
  headers:{
    'Access-Control-Allow-Origin': '*',
   
  
  },


 }
 

const fetchData = async ()=>{
  
  const res = await fetch('/notes',op)
  console.log(res)
  
  return data;
  
  
  
}
fetchData();
console.log(fetchData())

}




window.addEventListener('DOMContentLoaded', notesAreaFn);