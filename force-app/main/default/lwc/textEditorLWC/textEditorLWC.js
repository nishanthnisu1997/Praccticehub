import { LightningElement, track } from 'lwc';

export default class TextEditorLWC extends LightningElement {
    @track customclass;
    strValue = '';
    boldhandler() {

        this.strValue = this.strValue.bold();

    }

    handlebod(event) {
        
        console.log('qeqgggbgbg', event.target.title);
        switch (event.target.title) {
            case 'Bold':
                console.log(this.template.querySelector('[data-id="txtInp"]').classList.value);
                if (!this.template.querySelector('[data-id="txtInp"]').classList.value.includes("boldText")) {
                    this.template.querySelector('[data-id="txtInp"]').classList.add('boldText');
                } else {
                    this.template.querySelector('[data-id="txtInp"]').classList.remove('boldText');

                }
                // this.customclass = 'boldText';
                break;
            case 'Italic':
                if (!this.template.querySelector('[data-id="txtInp"]').classList.value.includes("italicText")) {
                    this.template.querySelector('[data-id="txtInp"]').classList.add('italicText');
                } else {
                    this.template.querySelector('[data-id="txtInp"]').classList.remove('italicText');

                } break;
            case 'UL':
                if (!this.template.querySelector('[data-id="txtInp"]').classList.value.includes("ulText")) {
                    this.template.querySelector('[data-id="txtInp"]').classList.add('ulText');
                } else {
                    this.template.querySelector('[data-id="txtInp"]').classList.remove('ulText');

                } break;
            default:
                console.log("Score value is neither 10 or 20");
        }

    }

    handleItalic() {
        this.customclass = 'italicText';
    }
    handleUL() {
        this.customclass = 'italicText';
    }
    handleInput(event) {
        console.log(event.target.value.substring(event.target.selectionStart, event.target.selectionStart));
        this.strValue = event.target.value;
    }
}