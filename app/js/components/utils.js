export class CreateNewElement {
    constructor(elmnt, tag = 'div', className) {
        this.elmnt = elmnt;
        this.tag = tag;
        this.className = className || null;
        this.newElement = null;
        this.createElmt = this.createElmt.bind(this);
    }

    createElmt() {
        this.newElement = document.createElement(this.tag);
        if (this.className) this.newElement.classList.add(this.className)
        this.elmnt.append(this.newElement);
        
        return this.newElement;
    }

    destroyElmt() {
        this.newElement.remove();
        this.newElement = null;
    }

    insertText(text) {
        this.newElement.innerHTML = '';
        this.newElement.insertAdjacentHTML('beforeend', text);
    }

    setAttribute(atrName,atrValue) {
        this.newElement.setAttribute(atrName, atrValue);
    } 
}


// проверяем поле на соответстве правилу для типов (здесь указаны только поля, используемые в квизе)
    // при необходимости можно дополнить любыми другими полями
    const checkType = (field) => {
        let mistake ;
        const re = /^[a-zA-Zа-яА-ЯЁё ]*$/;
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        const phoneRegexp = /^[\d\+][\d\(\)\ -]{16,16}\d$/;

        if (typeof field.value === 'undefined') {
            return;
        }

        if (field.type !== 'checkbox' && field.value.length === 0) {
            mistake = 'Это поле обязательно для заполнения';
            return mistake;
        }

        switch(field.type) {
            case 'number':
                if (isNaN(parseFloat(field.value))) {
                    mistake = 'Неверный формат';
                }
                break;
            case 'text':
                if (field.value.length < 2 && !re.test(field.value)) {
                    mistake = 'Неверный формат';
                }
                break;
            case 'tel':
                if (!phoneRegexp.test(field.value)) {
                    mistake = 'Неверный формат';
                }
                break;
            case 'email':
                if (!EMAIL_REGEXP.test(field.value)) {
                    mistake = 'Неверный формат';
                }
                break;
            case 'checkbox':
                if (field.checked !== true) {
                    mistake = 'Это поле обязательно для заполнения';
                }
                break;
        }
        
        return mistake;
    };


// проверяем поле на непустое и на соответствие правилу для типов
export const checkField = (fields) => {
    
    let mistakes = 0;
    fields.forEach(field => {
        if (field.closest('label').classList.contains('mistake')) field.closest('label').classList.remove('mistake');
        let newField;  
        if (typeof field.value === 'undefined') {
            const label = field.closest('label');
            newField = label.querySelector('input');
        } else {
            newField = field;
        }
        if (Boolean(checkType(newField))) {
            field.closest('label').classList.add('mistake');
            let mistake  = checkType(newField) || 'Заполните поле';
            if (!field.closest('label').querySelector('.form__mistake')) {
                const mistakeBlock = document.createElement('span');
                mistakeBlock.classList.add('form__mistake');
                field.closest('label').append(mistakeBlock);
            }

            field.closest('label').querySelector('.form__mistake').innerText = mistake;
            mistakes++;
        }
    })


    if (fields[0].closest('form').querySelector(".cf7sr-g-recaptcha").closest('label').classList.contains('mistake'))
        fields[0].closest('form').querySelector(".cf7sr-g-recaptcha").closest('label').classList.remove('mistake');
    var v = grecaptcha.getResponse();

    var mistake = "Заполните каптчу"
    if(v.length == 0)
    {
        fields[0].closest('form').querySelector(".cf7sr-g-recaptcha").closest('label').classList.add('mistake');
        if (!fields[0].closest('form').querySelector(".cf7sr-g-recaptcha").closest('label').querySelector('.form__mistake')) {
            var mistakeBlock = document.createElement('span');
            mistakeBlock.classList.add('form__mistake');
            fields[0].closest('form').querySelector(".cf7sr-g-recaptcha").closest('label').append(mistakeBlock);
        }
        fields[0].closest('form').querySelector(".cf7sr-g-recaptcha").closest('label').querySelector('.form__mistake').innerText = mistake;
        mistakes++;
    }
    return mistakes === 0;
}

