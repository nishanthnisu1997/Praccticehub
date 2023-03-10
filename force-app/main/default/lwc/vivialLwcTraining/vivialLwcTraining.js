import { LightningElement,track} from 'lwc';
import getAcc from '@salesforce/apex/viviallwctraining.getcontacts';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

import Id from '@salesforce/user/Id';
const column=[{label:'Name',fieldName:'Name'},
 {label:'Industry',fieldName:'Industry'},
 {label:'Type',fieldName:'Type'}
];
export default class VivialLwcTraining extends LightningElement {
@track user = Id;
bolPara = false;
@track name='Money';
column = column;
contacts = [{id:'1', name:'nish'},
 {id:'2', name:'anth'}];
 @track allacnts=[];
 error;
 lwcName;
 lwcDate;
 formValue;
 bolPop;
// ObjLWC=[{Label:'Name', fieldName:'Name'},
//   {label:'date', fieldName:'LWC_trianing_Date__c'}];
//   @wire(getAcc)
//   allacnts;
connectedcallback(){
    getAcc()
    .then(result => {
        this.allacnts= result;
        console.log('this.allacnts'+this.allacnts);
        this.error = undefined;
    })
    .catch(error => {
        this.error = error;
        this.allacnts= undefined;
    });
}  

handleBool(event){
    
    if(event.target.checked===true){
                      this.bolPara=true;
                    
    }else{ 
        this.bolPara=false;
    }
}

handlelwcname(event){
    this.lwcName= event.target.value;
}

handleLwcdate(event){
    this.lwcDate=event.detail.value;
}

handleSubmit(){
    this.formValue=this.lwcName+','+this.lwcDate;
  this.showNotification();    
  this.lwcName='';
  this.lwcDate='';  
}

handleQuickAction(){
this.bolPop= true;
}
showNotification(){
    
    const evt = new ShowToastEvent({
    title:'HI' ,
    message:'this is the message' ,
    variant: 'Success',
});
this.dispatchEvent(evt);
}
handleNew(){
    this[NavigationMixin.Navigate]({
        type: 'standard__objectPage',
        attributes: {
            objectApiName: 'Account',
            actionName: 'new'
        },
    });
}
}