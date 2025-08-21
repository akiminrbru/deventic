
import Swiper, { Navigation, Pagination, Autoplay, EffectFade } from 'swiper';
import { fixHeader } from './components/fix-header';
import { menuOpener } from './components/menu-opener';
import { PopupOpener } from './components/popupOpener';
import { checkField } from './components/utils';
//import { Fancybox } from "@fancyapps/ui";
// import { successTemplate } from './components/success-template';
import { phoneMask } from './components/phone-mask';
import { animateElts } from './components/animation';
import { tabsOpener } from './components/tabs';
import { faqsOpener, serviceTabsOpener } from './components/service';
import { priceOpener } from './components/price-service';
Swiper.use([Navigation, Pagination, Autoplay, EffectFade]);

// Если будет не нужна - убрать
/*Fancybox.bind('[data-fancybox="gallery"]', {
	infinite: false
});*/

try {
	menuOpener();
	fixHeader();
} catch(e) {

}

const advsSliderSettings = {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: false,
    observer: true,
    observeParents: true,
    navigation: {
		nextEl: ".advs-slider__arrow-right",
		prevEl: ".advs-slider__arrow-left",
	},
};
const advsSwiper = new Swiper('.advs-slider', advsSliderSettings);

const fbSliderSettings = {
	slidesPerView: 1,
    spaceBetween: 0,
    loop: false,
    observer: true,
    observeParents: true,
    pagination: {
      el: '.fb-slider__fractions',
    	type: 'fraction',
    },	
    navigation: {
		nextEl: ".fb-slider__arrow-right",
		prevEl: ".fb-slider__arrow-left",
	},
};
const fbSwiper = new Swiper('.fb-slider', fbSliderSettings);

function casesSwiperInit() {
	if (window.matchMedia("(min-width: 540px)").matches) {
		const casesSliderSettings = {
			slidesPerView: 'auto',
			spaceBetween: 16,
			breakpoints: {
				540: {
				  spaceBetween: 24
				},
				// when window width is >= 640px
				1000: {
				  spaceBetween: 18
				}
			},
			pagination: {
				el: '.cases-block__dots',
				clickable: true,
			},
			navigation: {
				nextEl: ".cases-block__arr--right",
				prevEl: ".cases-block__arr--left",
			},
			loop: false,
			observer: true,
			observeParents: true,
		};
		const casesSwiper = new Swiper('.cases-block__slider', casesSliderSettings);
		
	}

	if (window.matchMedia('(min-width:540px) and (max-width: 999px)').matches) {
		const casesSliderSettings = {
			slidesPerView: 'auto',
			spaceBetween: 24,
			loop: false,
			observer: true,
			observeParents: true,
		};
		const articlesSwiper = new Swiper('.blog-section__slider', casesSliderSettings);
		const casesSwiper = new Swiper('.cases-block__slider-vert', casesSliderSettings);
	}
}
casesSwiperInit();
window.addEventListener("resize", casesSwiperInit);
window.onload = () => animateElts();

const valuesSliderSettings = {
	slidesPerView: 1,
  spaceBetween: 0,
  loop: false,
  observer: true,
  observeParents: true,
	effect: 'fade',
	fadeEffect: { crossFade: true },
  pagination: {
    el: '.hh-values-slider__fractions',
    type: 'fraction',
  },
  navigation: {
		nextEl: ".hh-values-slider__arrow-right",
		prevEl: ".hh-values-slider__arrow-left",
	},
	
	// on: {
	// 	slideChangeTransitionStart: function () {
	// 		this.slides[this.snapIndex].classList.add('hidden');
	// 		this.slides[this.snapIndex].classList.remove('visible');
	// 	},
	// 	slideChangeTransitionEnd: function () {
	// 		this.slides[this.snapIndex].classList.remove('hidden');
	// 		this.slides[this.snapIndex].classList.add('visible');
	// 	}
	// },
};
const valuesSwiper = new Swiper('.hh-values-slider__inside', valuesSliderSettings);


// обработка popup 
try {
	const appointmentOpeners = document.querySelectorAll('[data-action="order"]');
	const popupAppointmentElt = document.querySelector('[data-popup="order"]');
	const forms = document.querySelectorAll('form');
	let popupInstance = null;

	const formSubmithandler = (evt) => {
		evt.preventDefault();
		const form = evt.target;
		const fieldsToCheck = form.querySelectorAll('.required');
		if (!checkField(fieldsToCheck)) return;
	};

	if (forms.length > 0) {
		forms.forEach(form => form.addEventListener('submit', formSubmithandler));
	};

	// открытие popup с записью
	if (popupAppointmentElt && appointmentOpeners.length > 0) {
		
		const openHandler = (evt) => {
			evt.preventDefault();
			setTimeout(() => {
				popupInstance = new PopupOpener({
					openElt: evt.target, // элемент, по которому открываем попап
					overlayClass: '[data-popup="order"]', // класс оверлея
					popupClass: '.popup', //класс попапа
					closeBtnClass: '.js-close',
					animationOpenClass: 'fadein', // оба класса пишем без точки, чтобы их потом не чистить
					animationCloseClass: 'fadeout', // класс анимации совпадает с названием анимации (в идеале), чтобы не путаться. 
				});
		
				popupInstance.open();
			},0);
		}
		// appointmentOpeners.forEach(opener => opener.addEventListener('click', openHandler));
	}

} catch(e) {
	console.log(e);
}

try {
    const phoneInputs = document.querySelectorAll('[type="tel"]');
    if (phoneInputs.length) {
      phoneInputs.forEach(item => phoneMask(item));
    }
} catch(e) {
    console.log(e);
}

try {
	tabsOpener('.js-tabs-toggler', '.js-tabs-toggler-body');
} catch(e) {
	console.log(e);
}

try {
	faqsOpener();
} catch(e) {
	console.log(e);
}

try {
	priceOpener();
} catch(e) {
	console.log(e);
}

try {
	serviceTabsOpener('.price-item', '.price-block__content');
} catch(e) {
	console.log(e);
}

try {
	serviceTabsOpener('.specs-block__links-item', '.specs-block__content');
} catch(e) {
	console.log(e);
}