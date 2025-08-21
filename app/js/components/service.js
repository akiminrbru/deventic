export const faqsOpener = () => {
    const items = document.querySelectorAll(".faq-item");

    items?.forEach((item) => {
        item.addEventListener('click', (el) => {
            console.log({el})
            el.target.classList.toggle('active')
        });
    });
}

export const serviceTabsOpener = (classLink, classContent) => {
    const buttons = document.querySelectorAll(classLink);
    const contents = document.querySelectorAll(classContent);

    buttons?.forEach((btn) => {
        btn.addEventListener('click', (el) => {
            const id_btn = el.target.getAttribute('data-index');
            resetButtons();
            el.target.classList.toggle('active');
            contents.forEach((content) => {
                const id_content = content.getAttribute('data-index');
                content.classList.remove('active');
                if (id_btn === id_content) content.classList.add('active')
            });
        });
    });

    const resetButtons = () => {
        buttons.forEach((item) => item.classList.remove('active'))
    }
}
