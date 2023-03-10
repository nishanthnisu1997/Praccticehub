import { LightningElement, track } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import NAME_FIELD from "@salesforce/schema/Account.Name";
import REVENUE_FIELD from "@salesforce/schema/Account.AnnualRevenue";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";

const columns = [
	{ label: "Name", fieldName: "name" },
	{ label: "Annual Revenue", fieldName: "AnnualRevenue", type: "Currency" },
	{ label: "Industry", fieldName: "Industry", type: "Text" }
];
export default class AccountCreator extends LightningElement {
	column = columns;
	str = "";
	@track arrayAcc = [];

	objectApiName = ACCOUNT_OBJECT;
	fields = [NAME_FIELD, REVENUE_FIELD, INDUSTRY_FIELD];
	handleSuccess(event) {
		const toastEvent = new ShowToastEvent({
			title: "Account created",
			message: "Record ID: " + event.detail.id,
			variant: "success"
		});
		this.dispatchEvent(toastEvent);
	}

	handleSubmit(event) {
		event.preventDefault();
		//you can change values from here
		//const fields = event.detail.fields;
		//fields.Name = 'My Custom  Name'; // modify a field
		console.log("Account name : ", event.detail.fields.Name);
		this.str = JSON.stringify(event.detail.fields);
		this.arrayAcc.push({ Name: event.detail.fields.Name, AnnualRevenue: event.detail.fields.AnnualRevenue, Industry: event.detail.fields.Industry });
		console.log("Account detail : ", this.arrayAcc);
	}
}
