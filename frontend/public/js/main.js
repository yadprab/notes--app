const notesFn = ()=>{

    //get add button
    const addButton = document.querySelector('#add--button');



    


const addNotesFn =(e)=>{

    e.preventDefault();

    //get add file name section

    const sect = document.querySelector('.notes--name');

      sect.classList.remove('hide');









}








//events--area

addButton.addEventListener('click', addNotesFn);

}












window.addEventListener('DOMContentLoaded', notesFn);