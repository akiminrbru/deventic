export const priceOpener = () => {
    const buttons = document.querySelectorAll('.price-item');
    const contents = document.querySelectorAll('.price-block__content');

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
