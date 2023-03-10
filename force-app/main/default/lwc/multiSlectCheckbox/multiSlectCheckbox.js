import { LightningElement } from 'lwc';
export default class MultiSlectCheckbox extends LightningElement {
    value= [];
   get options(){
        return [ { label: 'roh', value: '1' },
        { label: 'kho', value: '2' },
        { label: 'pro', value: '3' }
    ];}
    get _selected(){
        return this.value.join(',');
    }
    handleChange(event){
        this.value =event.detail.value;
    }
}