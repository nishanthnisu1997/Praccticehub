import { LightningElement, track, wire } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
//import insertAccountMethod from '@salesforce/apex/AccountinsertionusingLWC.insertAccountMethod';
import accName from '@salesforce/schema/Account.Name';
import accPhone from '@salesforce/schema/Account.Phone';
import accType from '@salesforce/schema/Account.Type';
import accWebsite from '@salesforce/schema/Account.Website';
import accSite from '@salesforce/schema/Account.Site';


export default class InsertAccountLwc extends LightningElement {
    @track accountname;

    @track error;
    @track arrAcc = [];
    @track gettabRecord = {
        Name: accName,
        Phone: accPhone,
        Type: accType,
        Website: accWebsite,
        Site: accSite

    };
    @track getAccountRecord = {
        Name: accName,
        Phone: accPhone,
        Type: accType,
        Website: accWebsite,
        Site: accSite

    };
    connectedCallback(){
        console.log('Time'+'1233'.localeCompare('123'));
    }
    @track PicklistValues;
    @wire(getPicklistValues, { recordTypeId: '012000000000000AAA', fieldApiName: accType })
    contacts({ data, error }) {
        if (data) {
            this.picklistvalues = data.values;
        }
        if (error) {}
    }


    nameInpChange(event) {
        this.getAccountRecord.Name = event.target.value;
        //window.console.log(this.getAccountRecord.Name);
    }

    phoneInpChange(event) {
        this.getAccountRecord.Phone = event.target.value;
        //window.console.log(this.getAccountRecord.Phone);
    }

    typeInpChange(event) {
        this.getAccountRecord.Type = event.target.value;
        //window.console.log(this.getAccountRecord.Type);
    }

    websiteInpChange(event) {
        this.getAccountRecord.Website = event.target.value;
        //window.console.log(this.getAccountRecord.Type);
    }

    accSiteChange(event) {
        this.getAccountRecord.Site = event.target.value;
        //window.console.log(this.getAccountRecord.Type);
    }
    saveAccountAction(event) {
        console.log("inside");
        console.log('getAccountRecord' + this.getAccountRecord);
        if( this.getAccountRecord.Site == 'west'){
            this.getAccountRecord.Site = 'Northwest';
        }
        //this.gettabRecord = this.getAccountRecord;
        this.arrAcc.push(this.getAccountRecord);
        console.log('gettabRecord' + this.getAccountRecord);
        console.log('arrAccw' + this.arrAcc);
        
        this.getAccountRecord = {};


    }
    handleRemove(event) {
         this.arrAcc =   this.arrAcc.filter((current, index, array) => {   
            return String(current.Name) !== String(event.target.value) ;
         })
    }
}