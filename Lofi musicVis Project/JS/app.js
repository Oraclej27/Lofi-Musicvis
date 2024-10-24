
 // a set of functions that interact with dom elements and functionality. 
 // I followed a tutotial on youtube for the nav bar links , all code for nav bar functionality is taken from there// 
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function(){
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
})


// followed online and video for dark mode// 
function toggleDarkmode () {
    let element = document.body;
    element.classList.toggle('dark-mode');
};

// After research I found this code in overtack , it stops the screen from scrolling on the web page when pressing the spacebar. 
//I wanted the space bar to pause and play the music without moving the webpage. 
window.addEventListener('keydown', (e) => {  
    if (e.keyCode === 32 && e.target === document.body) {  
      e.preventDefault();  
    }  
  });


