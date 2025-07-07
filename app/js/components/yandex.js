import { CreateNewElement } from "./utils";

const coords = {
    coords: [59.946703, 30.360811],
    name: 'Сервис',
    description: "ул. Моисеенко, д.21, офис 8",
};


export class YmapsInitializer {
    constructor(container, placeCoords = coords) {
        this.container = container;
        this.coords = placeCoords;
        this.url = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
        this.myMap = null;
        this.mapContainer = null;
        this.apiScript = null;
        this.myPlacemark = null;
        this.loadMap = this.loadMap.bind(this);
        this.getElementPosition(this.container);   
    }

    addMapDetails(mapCoords) {
        const init= () => {
            this.myMap = new ymaps.Map("map", {
                center: this.coords.coords,
                zoom: 18
            });
            this.myPlacemark  = new ymaps.Placemark(this.myMap.getCenter(), {
                hintContent: this.coords.name,
                balloonContent: mapCoords.description
            }, {
    
                iconLayout: 'default#image',
                iconImageHref: '../img/point.svg',
                iconImageSize: [70, 70],
                iconImageOffset: [-35, -70]
            });
            this.myMap.geoObjects.add(this.myPlacemark);            
        }       

        ymaps.ready(init);
    }

    changeCenter(newCoords) {
        this.myMap.setCenter(newCoords.coords);
        if (this.myPlacemark) this.myPlacemark = null;
        this.myPlacemark  = new ymaps.Placemark(this.myMap.getCenter(), {
            hintContent: newCoords.name,
            balloonContent: newCoords.description
        }, {
            iconLayout: 'default#image',
            iconImageHref: '/img/logo2.svg',
            iconImageSize: [42, 42],
            iconImageOffset: [-5, -38]
        });
        this.myMap.geoObjects.add(this.myPlacemark); 
    }

    loadApikey(url) {
        if (this.apiScript) return;
        this.apiScript = document.createElement('script');
        this.apiScript.src = url;   
        this.container.prepend(this.apiScript);
        this.apiScript.onload = () => this.addMapDetails(this.coords);
    }

    getElementPosition(elem) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadMap();
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(elem);
    }

    loadMap() {
        this.createMapContainer();
        this.loadApikey(this.url); 
    }

    createMapContainer() {
        if (this.mapContainer) return;
        this.mapContainer = new CreateNewElement(this.container, 'div', 'map-container');
        this.mapContainer.createElmt(); 
        this.mapContainer.setAttribute('id','map');          
    }
}

