function resizeGridItem(item, container) {
    const grid = container || item.closest('.masonry');
    const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    const rowSpan = Math.ceil((item.querySelector('.services-item__content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
    item.style.gridRowEnd = "span "+rowSpan;
}
  
export function resizeAllGridItems(container) {
    const allItems = container.querySelectorAll(".services-item");
    for(let x=0; x<allItems.length; x++){
      resizeGridItem(allItems[x], container);
    }
}
/*  
function resizeInstance(instance){
    item = instance.elements[0];
    resizeGridItem(item);
}
  
  window.onload = resizeAllGridItems();
  window.addEventListener("resize", resizeAllGridItems);
  
  allItems = document.querySelectorAll(".services-item");
  for(x=0;x<allItems.length;x++){
    imagesLoaded( allItems[x], resizeInstance);
  }

*/