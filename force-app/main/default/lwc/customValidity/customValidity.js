import { LightningElement, track } from 'lwc';
import w3webResource from '@salesforce/resourceUrl/plain';
import w3webResource1 from '@salesforce/resourceUrl/Test_image';


export default class CustomValidity extends LightningElement {
    @track boolImage = false ;
    @track boolImage1 = false ;

    @track imageurl =w3webResource;
    @track imageurl1=w3webResource1;
    @track dataType = 'password';
    bool = false;
    displayText;
    @track counter = 0;
    timerId;

    onhover(event){
        if(event.target.name === 'ccv'){
            this.boolImage = true;
        }else if(event.target.name === 'RN'){
            this.boolImage1 = true;  
        }
    }
    onhoverout(event){
        if(event.target.name === 'cvv'){
            this.boolImage = false;
        }else if(event.target.name === 'RN'){
            this.boolImage1 = false;  
        }
    }
    onhover1(){
        this.boolImage1 = true;
    }
    onhoverout1(){
        this.boolImage1 = false;
    }

    handleicon() {
        this.dataType = 'Text';
    }

    handleOut() {
        this.dataType = 'Password';
    }

    //    increaseCounter() {
    //        this.counter++;
    //        this.timerId = setTimeout(this.increaseCounter.bind(this), 100);

    // if(this.template.querySelector('lightning-input').type=='password'){
    //     this.template.querySelector('lightning-input').type='Text';
    // }else{
    //     this.template.querySelector('lightning-input').type='Password';
    // }
    //    }
    //    stopCounting() {
    //        clearTimeout(this.timerId);
    //    }


    // handleicon(event){
    //    // displayText = event.detail.value;
    //     displayText+= '*';
    // }
    // handlepass(){
    //     this.bool = true;
    // }
}