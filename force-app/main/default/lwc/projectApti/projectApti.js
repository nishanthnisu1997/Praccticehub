import { LightningElement,track } from 'lwc';
import getApti from '@salesforce/apex/addordeleteapexclass.getquestion';

export default class ProjectApti extends LightningElement {
 
    @track allApti=[];
    connectedCallback(){
        getApti()
        .then(result => {
            this.allApti= result;
            console.log('this.allacnts'+this.allApti);
            this.error = undefined;
        })
        .catch(error => {
            this.error = error;
            this.allacnts= undefined;
        });
    }  
 
}