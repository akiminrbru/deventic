export const menuOpener = () => {
    const menuToggler = document.querySelector('[data-action="menu-open"]');
    if (!menuToggler) return;
    
    const menu = document.querySelector('.js-menu');
    let subMenuTogglers;
    let activeSubMenu = null;

    const closeSubMenu = () => {
        activeSubMenu.classList.remove('opened');
        activeSubMenu = null;
    }

    const closeMenuHandler = () => {
       // if (activeSubMenu) closeSubMenu();
        document.querySelector('header').classList.remove('opened');
        menuToggler.removeEventListener('click', closeMenuHandler);
        menuToggler.addEventListener('click', openMenuHandler);
        subMenuTogglers.forEach(item => item.removeEventListener('click', subMenuHandler));
    }

    const subMenuHandler = (evt) => {
        evt.preventDefault();
       // if (activeSubMenu) closeSubMenu();
        if (evt.target.closest('.menu__item').classList.contains('opened')) {
            evt.target.closest('.menu__item').classList.remove('opened');
            return;
        }
        activeSubMenu = evt.target.closest('.menu__item').querySelector('.menu__sub');
        if (!activeSubMenu) return;
        evt.target.closest('.menu__item').classList.add('opened');
    }

    const outOfAreaHandler = (evt) => {
        if (menu.contains(evt.target) || menuToggler.contains(evt.target)) return;
        closeMenuHandler();
    }

    const openMenuHandler = (evt) => {
        evt.preventDefault();
        document.querySelector('header').classList.add('opened');
        subMenuTogglers = menu.querySelectorAll('.js-subopener');
        subMenuTogglers.forEach(item => item.addEventListener('click', subMenuHandler));
        menuToggler.removeEventListener('click', openMenuHandler);
        menuToggler.addEventListener('click', closeMenuHandler);
        document.addEventListener('click', outOfAreaHandler);
    }

    menuToggler.addEventListener('click', openMenuHandler);
}