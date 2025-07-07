export const tabsOpener = (className, bodyClassName) => {
    let togglers = document.querySelectorAll(className);
    console.log(togglers);
    if (togglers.length === 0 ) return;
    const openHandler = (evt) => {
        evt.preventDefault();
        const target = evt.target.closest(className);
        if (!target) return;
        const togglerBody = Boolean(target.closest(bodyClassName)) 
            ? target.closest(bodyClassName)
            : target.closest(className).parentElement;
        togglerBody.classList.toggle('opened');
    }

    let observer = new MutationObserver(() => {
        togglers.forEach(toggler => toggler.removeEventListener('click', openHandler));
		togglers = document.querySelectorAll(className);
        togglers.forEach(toggler => toggler.addEventListener('click', openHandler));
	});

    const main = togglers[0].closest('section') || togglers[0].closest('main');
 
    if (main) {
        observer.observe(main, {
            childList: true, // наблюдать за непосредственными детьми
            subtree: true, // и более глубокими потомками
        });   
    }

    togglers.forEach(toggler => toggler.addEventListener('click', openHandler));
}

export const tabsOpenerOutOfArea = (className, elementClassName) => {
    let togglers = document.querySelectorAll(className);
    let targetElement = document.querySelector(elementClassName);
    
    if (!targetElement || togglers.length === 0) return;
    let parent;
    let target;

    const closeHandler = () => {
        parent.classList.remove('opened');
        document.removeEventListener('click', clickCloseHandler);
        target.removeEventListener('click', closeHandler);
        document.removeEventListener('keyup', keyCloseHandler);
        togglers.forEach(toggler => toggler.addEventListener('click', openHandler));
    }

    const clickCloseHandler = (evt) => {
        if (parent.contains(evt.target)) return;
        closeHandler();
    }

    const keyCloseHandler = (evt) => {
        if (evt.code === 'Escape') {
            closeHandler();
        }
    }

    const openHandler = (evt) => {
        evt.preventDefault();
        target = evt.target.closest(className);
        parent = target.parentElement;
        targetElement = parent.querySelector(elementClassName);
        if (!targetElement) return;
        parent.classList.add('opened');
        togglers.forEach(toggler => toggler.removeEventListener('click', openHandler));
        document.addEventListener('click', clickCloseHandler);
        target.addEventListener('click', closeHandler);
        document.addEventListener('keyup', keyCloseHandler);
    }

    let observer = new MutationObserver(mutationRecords => {
        togglers.forEach(toggler => toggler.removeEventListener('click', openHandler));
		let togglers = document.querySelectorAll(className);
        togglers.forEach(toggler => toggler.addEventListener('click', openHandler));
	});

    const main = togglers[0].closest('section') || togglers[0].closest('main');

    if (main) {
        observer.observe(main, {
            childList: true, // наблюдать за непосредственными детьми
            subtree: true, // и более глубокими потомками
        });
    }
    togglers.forEach(toggler => toggler.addEventListener('click', openHandler));
}