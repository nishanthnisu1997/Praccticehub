import { LightningElement, track, api } from 'lwc';
import acnts from '@salesforce/apex/task.acnts';
import acntSearch from '@salesforce/apex/task.searchAcnts';

import delacnts from '@salesforce/apex/task.delAcnts';
import delacntscheck from '@salesforce/apex/task.delAcntsCheck';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import IMAGES from "@salesforce/resourceUrl/Logo";


import ACCOUNT_OBJECT from '@salesforce/schema/Account';
//import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import { refreshApex } from '@salesforce/apex';


export default class HelloWorld extends LightningElement {
    @track objectApiName = ACCOUNT_OBJECT;
    @track accountstore = [];
    @api selectedrecId = [];
    @api tabval = 'Account';
    @track error;
    @api recordId;
    @api accountrecId;
    @track queryTerm;
    
    @track messageVar;
    @track NotifVar;

    @api recId = '';
    @api showNew = false;
    showEdit = false;
    uiImage = IMAGES;
    connectedCallback() {
        this.getacts();
    }
    handleInputSearch(event){
        let texValue = event.target.value;
        console.log(texValue);
        if(texValue.length === 0){
            this.getacts();
        }
    }

    @api
    getacts(){
        acnts()
        .then(result => {
            this.accountstore = result;
        })
        .catch(error => {
            this.error = error;
            this.contacts = undefined;
        });
    console.log(this.recordId);
    }
    handleKeyUp(evt) {
        console.log('123456789');
        const isEnterKey = evt.keyCode === 13;
        if (isEnterKey) {
            this.queryTerm = evt.target.value;
            acntSearch({strSearchTerm: this.queryTerm})
            .then(result => {
                console.log('2345678');
    
                this.accountstore = result;
            })
            .catch(error => {
    
                this.error = error;
                this.contacts = undefined;
                console.log(this.error);

            });
        }
        console.log(this.queryTerm);

       
    }
    handleNew() {
        this.showNew = true;
    }
    handleClose() {
        this.showNew = false;
        this.showEdit = false;

    }
    handletab() {
            this.tabval = 'Account';
        }
        /*   handleSuccess(event) {
               this.showNew = false;
               const toastEvent = new ShowToastEvent({
                   title: 'Success!',
                   message: event.detail.id,
                   variant: 'success'
               });
               this.dispatchEvent(toastEvent);
               this.AccountrecId = event.detail.id;
               console.log(event.detail.value);



               return refreshApex(this.accountstore);

           }
           handleSuccesscon(event) {
               const toastEvent = new ShowToastEvent({
                   title: 'Success!',
                   message: event.detail.id,
                   variant: 'success'
               });
               this.dispatchEvent(toastEvent);
           }*/

    handleEdit(event) {
        this.recId = event.target.value;
        console.log(this.recId);
        this.showEdit = true;

    }
    handleDelete(event) {
        this.recId = event.target.value;
        console.log(this.recId);
        delacnts({ acrecId: this.recId })
            .then(() => {
                this. showNotification('Successfully Deleted','Success');

                window.location.reload();
            })
            .catch(error => {
                this.error = error;
                this. showNotification(this.error.body.message,'Error');

                console.log('unable to delete');
            });
    }
    handleAccSave() {
        this.tabval = 'Related Contact';

    }

    handleEditSuccess() {
        this.showEdit = false;
        window.location.reload();
    }

    handleSelect(event) {
        this.selectedrecId.push(event.target.value);
        let uniqueIDTODel =this.selectedrecId.filter((element, index) => {
            return this.selectedrecId.indexOf(element) === index;
        });
        // this.selectedrecId.push(event.currentTarget.dataset.accountid);
        console.log(uniqueIDTODel);

    }
    handleacctId(event) {
        this.accountrecId = event.detail.accountrecId;
        console.log('AccountrecId' + this.accountrecId);
    }
    handleDeleteCheck(event) {
        console.log(this.recId = event.target.value);
        delacntscheck({ acrecId2: this.selectedrecId })
            .then(() => {
                this. showNotification('Successfully Deleted','Success');

                window.location.reload();
            })
            .catch(error => {
                this.error = error;
    
                
                console.log('unable to deleeeete',this.error.body.message);
                              this. showNotification(this.error.body.message,'Error');

            });
    }

    showNotification(messageVar, NotifVar){
        console.log('unable----',messageVar);

        const evt = new ShowToastEvent({
        title:'Error' ,
        message: messageVar,
        variant: NotifVar,
    });
    this.dispatchEvent(evt);
    }
}