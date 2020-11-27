

const notesAreaFn = ()=>{
  
 const fontsSection = document.querySelector('.fonts--section');
  
 
const main = document.querySelector('main');

const editArea = document.querySelector('.text--area')



const fetchData = () =>{

  //options to avoid cros error

 const op = {
  
  method:'GET',
  headers:{
    'Access-Control-Allow-Origin': '*',
   
  
  },


 }

//fetch data from backend
fetch('/notes', op).then(res=>res.json()).then(data=>{

  //copy that array data
  const arr = [...data];

  setFonts(arr)

 
});







}

const setFonts= (arrData)=>{

  console.log(arrData);
//get font type

const fontType = fontsSection.querySelector('.font--type');

//get select

const fontSelect = fontType.querySelector('select');

//set option values

const fontSelectHTML = arrData.map(dta=>{


  return `
  
   <option value="${dta.family}">
   ${dta.family}
   </option>
  
  
  
  
  
  
  
  
  
  
  `








}).join('');

fontSelect.insertAdjacentHTML('beforeend', fontSelectHTML);
//innerHtml ends here

//fontsFn starts here
const fontsFn =()=>{


  const selection = window.getSelection();

  const no = selection.anchorNode;


  console.log(selection.anchorNode);

  //get both sections

  const fontWsection = document.querySelector('.fontweight');

  //getVariant sect

  const fontSub = document.querySelector('.font--subset');

  //get font weight and  font type
  const fontWeight = document.querySelector('#font--weight');

    const fontSubset = document.querySelector('#font--subset');

        const fontSize = document.querySelector('#font-Size');


 const index = fontSelect.selectedIndex;
//get selectVal
const selectVal = fontSelect.value;

const cateGory = arrData[index].category;

 const variants = arrData[index].variants;

  const subSets = arrData[index].subsets;

  const fontItem =  arrData[index].files;



const fontTypeName = Object.keys(fontItem);
const fontTypeUrl = Object.values(fontItem);
    


editArea.style.fontFamily = `'${selectVal}', ${cateGory}`;

  fontWsection.classList.remove('hide');

  const fontWeightHTML = variants.map(variant=>{
  return `
   
   <option value="${variant}">
   ${variant}
   </option>
  
  
  
  
  `
}).join('');
fontWeight.insertAdjacentHTML('beforeend', fontWeightHTML);
//fw innerHtml ends here


//set subset values
fontSub.classList.remove('hide');
const fontSubsetHTML = subSets.map(sub=>{
  return `
  
   <option value="${sub}">
   ${sub}
   </option>
  
  
  
  
  `
}).join('');
fontSubset.insertAdjacentHTML('beforeend', fontSubsetHTML)
//fs innerHtml ends here




// now set font face
const styleElement = document.createElement('style');

styleElement.appendChild(document.createTextNode(

  `
  @font-face{

   font-family: '${selectVal}', ${cateGory};
   src:url('${fontTypeUrl.map(url=>url)}') format('ttf');






  }
  
  
  
  
  
  
  
  
  `




 ))
// //ele ends here

document.head.appendChild(styleElement);





const setFontVal =(e)=>{

 const target = e.target;

 const targetVal = target.value;


const targetId = target.id;

switch (targetId) {
  case 'font--weight':
    
     editArea.style.fontWeight = `${targetVal}`
    
    break;
   

     case 'font-Size':
     editArea.style.fontSize = ` ${targetVal}pt`
 

    
    break;

}






}






[fontSize, fontWeight,fontSubset].forEach(type=>type.addEventListener('change', setFontVal))

}





//set event for select
fontSelect.addEventListener('change', fontsFn)

}









fetchData();







}




window.addEventListener('DOMContentLoaded', notesAreaFn);