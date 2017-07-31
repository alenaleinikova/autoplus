
var burgerOn = document.querySelector('#burger-on'),
    burgerOff = document.querySelector('#burger-off'),
    title = document.querySelectorAll('#title');

burgerOn.addEventListener('click', () => {
    burgerOn.classList.add('on');
});
burgerOff.addEventListener('click', () => {
    burgerOn.classList.remove('on');
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
