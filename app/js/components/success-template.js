export const successTemplate = (successMessage) => {
    const successText = successMessage === 'success'
        ? `Спасибо за обращение.
        <br/>Мы свяжемся с вами для уточнения деталей`
        : `Пожалуйста, свяжитесь с нами по почте
				<a href="mailto:@deventica" title="позвонить " class="popup__mail">@deventica</a>`;
    const successName = successMessage === 'success'
    ? `заявка отправлена!`
    : `ошибка отправки!`;

    return `
    <div class="popup-overlay opened" data-popup="${successMessage}">
    <section class="popup popup--success opened">
        <div class="popup__wrapper">
            <button class="btn popup__close js-close"  data-action="js-close>
                <svg width="24" height="24">
                    <use xlink:href="img/sprite.svg#close2"></use>
                </svg>
            </button>
            <div class="popup__body">
                <p class="popup__img">
                    <img src="../img/${successMessage}.svg" alt="success" width="100" height="100">
                </p>
                <p class="popup__name">${successName}</p>
                <p class="popup__message">${successText}</p>
                <button class="btn btn--rounded btn--violet js-close" data-action="js-close"><span>ХОРОШО</span></button>    
            </div>            
        </div>
    </section>
</div>
    `;
}