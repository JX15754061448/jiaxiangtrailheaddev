import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import { updateRecord } from 'lightning/uiRecordApi';
import { CloseActionScreenEvent } from 'lightning/actions';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import FNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LNAME_FIELD from '@salesforce/schema/Contact.LastName';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';

const FIELDS = [FNAME_FIELD, LNAME_FIELD, PHONE_FIELD];
export default class StakeholderAction extends LightningElement {
    disabled = false;
    @api recordId;
    @api objectApiName;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    contact;

    get firstname() {
        return getFieldValue(this.contact.data, FNAME_FIELD);
    }

    get lastname() {
        return getFieldValue(this.contact.data, LNAME_FIELD);
    }

    get phone() {
        return getFieldValue(this.contact.data, PHONE_FIELD);
    }

    handleCancel(event) {
       // Add your cancel button implementation here
       this.dispatchEvent(new CloseActionScreenEvent());
    }

    handleLastNameChange(event) {
        // Display field-level errors if last name field is empty.
       if (!event.target.value) {
           event.target.reportValidity();
           this.disabled = true;
       }
       else {
        this.disabled = false;
       }
   }

    handleSubmit(e) {
        // Add your updateRecord implementation

        // Close the modal window and display a success toast
        this.dispatchEvent(new CloseActionScreenEvent());
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Record updated!',
                variant: 'success'
            })
        );
    }
}