import { CreateNewElement } from "./utils";

export class CustomSelect {
    constructor(container, customClass) {
        this.container = container;
        this.customClass = customClass;
        this.selectBlock = this.container.querySelector('select');
        this.options = null;
        this.selectDiv = null;
        this.optionsDiv = null;
        this.currentOption = null;
        this.openSelect = this.openSelect.bind(this);
        this.optionsHandler = this.optionsHandler.bind(this);
        this.outOfAreaHandler = this.outOfAreaHandler.bind(this);
        this.optionsHandler = this.optionsHandler.bind(this);
        this.keySelectHandler = this.keySelectHandler.bind(this);
        this.keyOutOfAreaHandler =this.keyOutOfAreaHandler.bind(this);
        this.optionsKeyHandler =this.optionsKeyHandler.bind(this);
        this.init();
    }

    init() {
        if (!this.selectBlock) return;
        this.container.classList.add(this.customClass);
        this.options = this.selectBlock.querySelectorAll('option');
        this.selectDiv = new CreateNewElement(this.container, 'div', `${this.customClass}__select`);
        this.selectDiv.createElmt();
        this.selectDiv.setAttribute('tabindex','0');
        this.optionsDiv = new CreateNewElement(this.container, 'div', `${this.customClass}__options`);
        this.optionsDiv.createElmt();
        this.optionsDiv.setAttribute('tabindex','0');

        this.options.forEach(opt => this.createOption(opt));
        setTimeout(()=> {
            this.selectDiv = this.container.querySelector(`.${this.customClass}__select`);
            this.selectDiv.addEventListener('click', this.openSelect);
            this.selectDiv.addEventListener('keyup', this.keySelectHandler);
        },0);        
    }

    createOption(opt) {
        const optText = opt.innerText;
        const optId = opt.value;
        const optContainer = this.container.querySelector(`.${this.customClass}__options`);
        const newOpt = new CreateNewElement(optContainer, 'div');
        newOpt.createElmt();
        newOpt.setAttribute('data-id', optId);
        newOpt.setAttribute('tabindex','0');
        newOpt.insertText(optText);
        if (opt.selected) {
            this.currentOption = optId;
            this.selectDiv.insertText(optText);
            newOpt.setAttribute('class','selected')
        };
    }

    openSelect(evt) {
        this.selectDiv.classList.add(`${this.customClass}__select--active`);        
        setTimeout(()=> {
            this.optionsDiv = this.container.querySelector(`.${this.customClass}__options`);
            this.optionsDiv.addEventListener('click', this.optionsHandler);
            this.optionsDiv.addEventListener('keyup', this.optionsKeyHandler);
            this.optionsDiv.querySelector('.selected').focus();
        },0);
        
        document.addEventListener('click', this.outOfAreaHandler);
        document.addEventListener('keyup', this.keyOutOfAreaHandler);
    }

    optionsHandler(evt) {
        [...this.options].find(option => option.value === this.currentOption).selected = false;
        this.optionsDiv.querySelector('.selected').classList.remove('selected');

        const target = evt.target.closest('[data-id]');

        target.classList.add('selected');
        this.currentOption = target.dataset.id;
        [...this.options].find(option => option.value === this.currentOption).selected = true;
        this.selectDiv.innerText = target.innerText;
        this.closeSelect();
    }

    closeSelect() {
        this.selectDiv.classList.remove(`${this.customClass}__select--active`);
        this.optionsDiv.removeEventListener('click', this.optionsHandler);
        this.optionsDiv.removeEventListener('keyup', this.optionsKeyHandler);
        document.removeEventListener('click', this.outOfAreaHandler);
        document.removeEventListener('keyup', this.keyOutOfAreaHandler);
    }

    outOfAreaHandler(evt) {
        if (this.container.contains(evt.target)) return;
        this.closeSelect();
    }

    keySelectHandler(evt) {
        if (evt.code === 'Space') {
            this.openSelect(evt);
        }
    }

    keyOutOfAreaHandler(evt) {
        if (evt.code === 'Escape') {
            this.closeSelect(evt);
        }
    }

    optionsKeyHandler(evt) {
        if (evt.code === 'Enter') {
            this.optionsHandler(evt);
        }
    }

}