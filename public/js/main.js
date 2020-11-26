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

  console.log(input);
  
  const val = input.value;

  form.reset();
  
  const props ={
    fileName: val,
    
    
  }
   
  console.log(props);
   
   localStorage.setItem('props', JSON.stringify(props));
   
  
  
}




form.addEventListener('submit',submitFn);

}








//events--area

addButton.addEventListener('click', addNotesFn);

}












window.addEventListener('DOMContentLoaded', notesFn);