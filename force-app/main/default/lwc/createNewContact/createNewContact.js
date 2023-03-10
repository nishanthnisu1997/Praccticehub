import { LightningElement, api } from "lwc";
import insertContMethod from "@salesforce/apex/viviallwctraining.insertCon";
// import FNAME_FIELD from "@salesforce/schema/Contact.FirstName";
// import LNAME_FIELD from "@salesforce/schema/Contact.LastName";
// import EMAIL_FIELD from "@salesforce/schema/Contact.Email";
// import MAILING_STREET from "@salesforce/schema/Contact.MailingStreet";
// import MAILING_POSTALCODE from "@salesforce/schema/Contact.MailingPostalCode";
// import OTHER_STREET from "@salesforce/schema/Contact.OtherStreet";
// import OTHER_POSTALCODE from "@salesforce/schema/Contact.OtherPostalCode";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { NavigationMixin } from "lightning/navigation";

import getRelCon from "@salesforce/apex/viviallwctraining.getcontacts";

const column = [
	{ label: "Name", fieldName: "Name" },
	{ label: "Email", fieldName: "Email" }
];
export default class CreateNewContact extends NavigationMixin(LightningElement) {
	streetValue;
	postalCodeValue;
	streetValueMail;
	postalCodeValueMail;
	bolAddresss;
	@api recordId;
	accountId = this.recordId;
	fname;
	lname;
	email;
	mailingStreet;
	mailingPostalCode;
	otherStreet;
	otherPostalCode;
	column = column;
	relCon;

	handleFname(event) {
		this.fname = event.target.value;
		console.log("event.target.value" + event.target.value);
	}

	handleLname(event) {
		this.lname = event.target.value;
		console.log("this.recordId" + this.recordId);
		console.log("event.target.value" + event.target.value);
	}

	handleEmail(event) {
		this.email = event.target.value;
		console.log("event.target.value" + event.target.value);
	}
	HAndleMailingAddress(event) {
		this.mailingStreet = event.target.street;
		//		console.log("event.target.Street" + event.target.street);
		this.mailingPostalCode = event.target.postalCode;
		// this.postalCodeValueMail = event.target.postalCode;
	}

	handleOtherAddress(event) {
		this.contObj.otherStreet = event.target.OtherStreet;
		this.contObj.otherPostalCode = event.target.OtherPostalCode;
	}

	handleCheckbox(event) {
		this.bolAddresss = event.target.checked;

		if (this.bolAddresss === true) {
			this.streetValue = this.mailingStreet;
			this.postalCodeValue = this.mailingPostalCode;
		} else {
			this.streetValue = " ";
			this.postalCodeValue = " ";
		}
	}
	handleSave() {
		insertContMethod({
			acctid: this.recordId,
			fname: this.fname,
			lname: this.lname,
			email: this.email,
			mailingStreet: this.mailingStreet,
			mailingPc: this.mailingPostalCode,
			otherStreet: this.streetValue,
			otherPc: this.postalCodeValue
		})
			.then((result) => {
				console.log("result.Id" + result.Id);

				const toastEvent = new ShowToastEvent({
					title: "Success!",
					message: "Successfully a new contact has been created",
					variant: "success"
				});
				this.dispatchEvent(toastEvent);

				this[NavigationMixin.Navigate]({
					type: 'standard__recordPage',
					attributes: {
						recordId: result.Id,
						objectApiName: 'Contact',
						actionName: 'view'
					},
				});
			})

			.catch((error) => {
				this.error = error;
				window.console.log("UNABLE TO SAVE");
			});

			this.template.queryselectorall().value=' ';
	}

	handletable() {
		getRelCon({ recordId: this.recordId })
			.then((result) => {
				this.relCon = result;
			})
			.catch((error) => {
				this.error = error.message;
				window.console.log("UNABLE TO SAVE");
			});
	}
}
