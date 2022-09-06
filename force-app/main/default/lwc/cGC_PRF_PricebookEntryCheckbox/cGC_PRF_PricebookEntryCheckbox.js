import { LightningElement, api, wire } from 'lwc';
import {
    APPLICATION_SCOPE,
    createMessageContext,
    MessageContext,
    publish,
    releaseMessageContext,
    subscribe,
    unsubscribe,
} from 'lightning/messageService';
import recordUpdated from '@salesforce/messageChannel/PricebookEntryMessageChannel__c';
export default class CGC_PRF_PricebookEntryCheckbox extends LightningElement {
    @api label = '';
    @api checked = false;
    @api recordId;
    @api fieldApi;

    @wire(MessageContext)
    messageContext;

    handleChange(event) {
        this.checked = event.target.checked;        
        console.log("checked: " + event.target.checked);
        const payload = { Id : this.recordId, [this.fieldApi] : this.checked};
        publish(this.messageContext, recordUpdated, payload);
    }
}