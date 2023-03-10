import { LightningElement, api } from 'lwc';
import getRelCon from "@salesforce/apex/viviallwctraining.getcontacts";
import NAME_FIELD from '@salesforce/schema/Account.Name';
import TYPE_FIELD from '@salesforce/schema/Account.Type';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';


const column = [
	{ label: "Name", fieldName: "Name" },
	{ label: "Email", fieldName: "Email" }
];
export default class ChildVivialTraining extends LightningElement {
@api name = 'wow';
@api bolChild = false;
@api recId;
relCon;
column=column;
 // Expose a field to make it available in the template
 nameField = [NAME_FIELD,TYPE_FIELD,INDUSTRY_FIELD];

 // Flexipage provides recordId and objectApiName
 @api recordId;
handletable() {
    getRelCon({ recordId: this.recId })
        .then((result) => {
            this.relCon = result;
        })
        .catch((error) => {
            this.error = error.message;
            window.console.log("UNABLE TO SAVE");
        });
}
}