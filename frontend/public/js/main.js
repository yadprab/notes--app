const notesFn = ()=>{

    //get add button
    const addButton = document.querySelector('#add--button');



    


const addNotesFn =(e)=>{

    e.preventDefault();

    //get add file name section

    const sect = document.querySelector('.notes--name');
    
     const form = sect.querySelector('form');

      sect.classList.remove('hide');

console.log(form)


const submitFn =(e)=>{
  
  const input = form.querySelector('input');
  
  const val = input.val;
  
  const props ={
    fileName: val,
    
    
  }
   
   
   localStorage.setItem('props', JSON.stringify(props));
   
  
  
}




form.addEventListener('submit',submitFn);

}








//events--area

addButton.addEventListener('click', addNotesFn);

}












window.addEventListener('DOMContentLoaded', notesFn);