import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class NewAccountForm extends LightningElement {
    showForm = false;
    handleClick = () => {
        this.showForm = !this.showForm;
    }

    handleSuccess(event) {
        this.showForm = !this.showForm;
        const successEvent = new ShowToastEvent({
            title: 'Success',
            message: 'You have successfully created a new account!',
            variant: 'Success'
        });
        this.dispatchEvent(successEvent);
    }
}