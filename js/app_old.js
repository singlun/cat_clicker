let cats = [];
let cats_name = [];

cats[0] = 'img/cat.jpg';
cats[1] = 'img/cat2.jpg';
cats[2] = 'img/cat3.jpg';
cats[3] = 'img/cat4.jpg';
cats[4] = 'img/cat5.jpg';
cats[5] = 'img/cat6.jpg';

cats_name[0] = 'felix';
cats_name[1] = 'philip';
cats_name[2] = 'mickey';
cats_name[3] = 'mini';
cats_name[4] = 'jeepy';
cats_name[5] = 'leo';

let counter = 0;
cats_name[0] = 'felix';

const catImg = document.querySelector("#cat_img");
const catSection = document.querySelector("#section_left");
const catLists = document.querySelector("#cat_lists");
      
// onclick="changeImage(${i});" 
for (let i = 0; i < cats.length; i++) {

  let figure = document.createElement('figure');
  catSection.appendChild(figure);
  figure.id = "fig-" + i;
  figure.className = "closed";
  let upCaption = document.createElement('figcaption');
  document.querySelector("#fig-" + i).insertAdjacentElement('afterbegin', upCaption);
  upCaption.id = "upCap-" + i;
  upCaption.className = "closed";
  upCaption.innerHTML = cats_name[i];
  let elem2 = document.createElement('img');  
  document.querySelector("#fig-" + i).insertAdjacentElement('afterend', elem2);
  elem2.src = cats[i];
  elem2.id = "img-" + i;
  elem2.className = "closed"; 
  let elem = document.createElement('li'); 
  document.querySelector("#upCap-" + i).appendChild(elem2);

  counter = 0; 
  elem.innerHTML = `<a onclick="changeImage(${i});" href="#">${cats_name[i]}</a>`; 
  catLists.appendChild(elem); 
  document.querySelector("#upCap-" + i).appendChild(elem2); 


  let elemSpan = document.createElement('span'); 
  document.querySelector("#fig-" + i).insertAdjacentElement('afterend', elemSpan);

  elemSpan.id = "span-" + i;
  elemSpan.className = "closed"; 
  document.querySelector("#span-" + i).innerHTML = `The cat click 0 times`;    
  //elemSpan.className = "closed";  

  elem2.addEventListener('click', (function (counter) {
    return function() {     
      counter = counter + 1;  
      document.querySelector("#span-" + i).innerHTML = `The cat click ${counter} times`;    
    };
  }(counter)));    
}

document.querySelector("#fig-0").classList.add('opened');
document.querySelector("#upCap-0").classList.add('opened');
document.querySelector("#img-0").classList.add('opened');
document.querySelector("#span-0").classList.add('opened');

function changeImage(i) {

  const elemsToBeClosed = document.querySelectorAll('figure');
  const spanToBeClosed = document.querySelectorAll('span');

  let arryElements = Array.from(elemsToBeClosed)

  for (let i = 0; i < arryElements.length; i++) {
    document.querySelector("#fig-" + i).classList.remove('opened');
    document.querySelector("#upCap-" + i).classList.remove('opened');
    document.querySelector("#img-" + i).classList.remove('opened');
    document.querySelector("#span-" + i).classList.remove('opened');

    document.querySelector("#fig-" + i).classList.add('closed');
    document.querySelector("#upCap-" + i).classList.add('closed');
    document.querySelector("#img-" + i).classList.add('closed');
    document.querySelector("#span-" + i).classList.add('closed');   
  }
  
  document.querySelector("#fig-" + i).classList.add('opened');
  document.querySelector("#upCap-" + i).classList.add('opened');
  document.querySelector("#img-" + i).classList.add('opened');
  document.querySelector("#span-" + i).classList.add('opened');

} 
