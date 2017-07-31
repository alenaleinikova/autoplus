
/* Каталог в мобильной версии */

/*const title = document.getElementsByClassName('.title');



for ( var i = 0; i < title.length; i++) {
  title[i].addEventListener('focus', function() {
    if (!(this.classList.contains('active'))) {
      for (var  i = 0; i < title.length; i++) {
        title[i].classList.remove('active');
      }
    }
  })
}
*/

var burgerOn = document.querySelector('#burger-on'),
    burgerOff = document.querySelector('#burger-off'),
    title = document.querySelectorAll('#title'),
    promo = document.querySelector('#promo'),
    header = document.querySelector('.menu');

burgerOn.addEventListener('click', () => {
    burgerOn.classList.add('on');
});
burgerOff.addEventListener('click', () => {
    burgerOn.classList.remove('on');
});

promo.addEventListener('scroll', () => {
   if( window.pageYOffset > 100 ) {
     header.classList.add('on-scroll');
   } else {
     header.classList.remove('on-scroll');
   }
 });


for ( var i = 0; i < title.length; i++) {
  title[i].addEventListener('click', catalog )
}



function catalog () {
  if (this.classList.contains('active')) {
    this.classList.remove('active');
  } else {
    this.classList.add('active');
  }
}
