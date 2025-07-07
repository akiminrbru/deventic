export const animateElts = () => {
    let timeInd = 0;
      const imageBlocks = document.querySelectorAll('.animate-block');
      const itemsStart = document.querySelectorAll('.animate-elt');
      if (itemsStart.length > 0) {
        itemsStart.forEach(item => item.classList.add('hovered'));
      }

      if (imageBlocks.length > 0) {
          let observer = new IntersectionObserver((entries, observer) => {
              entries.forEach(entry => {
                  if(entry.isIntersecting) {
                      if (entry.target.dataset.delay) {
                        timeInd = entry.target.dataset.delay;
                      }
                      const items = entry.target.querySelectorAll('.animate-elt');
                      if (items.length > 0) {
                          items.forEach((item,i) => {
                            item.classList.remove('hovered');
                            if (timeInd !== 0) item.style.transitionDelay = `${timeInd * i}s`;
                          })
                      }
                      observer.unobserve(entry.target);
                  }
              })
          }, { threshold: 0.2});
  
  
          imageBlocks.forEach((item) => {
              observer.observe(item);
          })
      }
}