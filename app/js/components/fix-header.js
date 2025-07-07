export function fixHeader() {
    var header = document.querySelector('.header');
    var main = document.querySelector('main');
    if (header) {
      var sticky = header.offsetHeight;
      window.addEventListener('scroll', function() {
  
        if (window.pageYOffset > sticky) {
          header.classList.add("header--scroll");
          //main.style.paddingTop = sticky + 'px';
        } else {
          header.classList.remove("header--scroll");
          main.style.paddingTop = '0';
        }
      });
    }
  }