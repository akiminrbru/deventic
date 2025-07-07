export const faqsOpener = () => {
    const items = document.querySelectorAll(".faq-item");

    items?.forEach((item) => {
        item.addEventListener('click', (el) => {
            console.log({el})
            el.target.classList.toggle('active')
        });
    });
}