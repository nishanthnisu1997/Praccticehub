import { LightningElement,wire,track,api } from 'lwc';import getAccountcontrollerTableMethod from '@salesforce/apex/ComvAccountcontrollerController.getAccountcontrollerTableMethod';import { refreshApex } from '@salesforce/apex';export default class ComvtestAccountTableLwcCom extends LightningElement {@api searchkey;@track Alldata;@track error;@track refreshcash = 1;@wire(getAccountcontrollerTableMethod)wiredRecords({ error , data}){if (data) {this.error =undefined;this.Alldata = data;if(this.refreshcash !== 1)this.template.querySelector("c-record-List").loadpagedata(this.Alldata.fieldsRecordsdata);}else if (error) {this.error = error;this.Alldata = undefined;}}refreshcomp(event){this.refreshcash = event.detail.refreshcash; return refreshApex(this.wiredRecords);}}