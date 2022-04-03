import { LightningElement,wire,api,track } from 'lwc';
import getResults from '@salesforce/apex/lwcCustomLookupController.getResults';

export default class LwcCustomLookup extends LightningElement {
    @api objectName = '';
    @api fieldName = '';
    @api selectRecordId = '';
    @api selectRecordName;
    @api label;
    @api placeholder;
    @api searchRecords = [];
    @api required = false;
    @api iconName = ''
    @api loadingText = false;
    @track txtclassname = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
    @track messageFlag = false;
    @track iconFlag =  true;
    @track clearIconFlag = false;
    @track inputReadOnly = false;


    searchField(event) {
        var currentText = event.target.value;
        this.loadingText = true;

        getResults({ ObjectName: this.objectName, fieldName: this.fieldName, value: currentText  })
        .then(result => {
            this.searchRecords= result;
            this.loadingText = false;

            this.txtclassname =  result.length > 0 ? 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-is-open' : 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
            if(currentText.length > 0 && result.length == 0) {
                this.messageFlag = true;
            }
            else {
                this.messageFlag = false;
            }

            if(this.selectRecordId != null && this.selectRecordId.length > 0) {
                this.iconFlag = false;
                this.clearIconFlag = true;
            }
            else {
                this.iconFlag = true;
                this.clearIconFlag = false;
            }
        })
        .catch(error => {
            console.log('-------error-------------'+error);
            console.log(error);
        });

    }

   setSelectedRecord(event) {
        var currentRecId = event.currentTarget.dataset.id;
        var selectName = event.currentTarget.dataset.name;
        this.txtclassname =  'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
        this.iconFlag = false;
        this.clearIconFlag = true;
        this.selectRecordName = event.currentTarget.dataset.name;
        this.selectRecordId = currentRecId;
        const selectedEvent = new CustomEvent('selected', { detail: {selectName, currentRecId}, });
        this.dispatchEvent(selectedEvent);
        this.inputReadOnly = true;
        this.validity();
    }

    resetData(event) {
        this.selectRecordName = "";
        this.selectRecordId = "";
        this.inputReadOnly = false;
        this.iconFlag = true;
        this.clearIconFlag = false;
        var selectName = this.selectRecordName;
        var currentRecId = this.selectRecordId;
        const selectedEvent = new CustomEvent('selected', { detail: {selectName, currentRecId}, });
        this.dispatchEvent(selectedEvent);
        this.validity();
    }

    @api validity() {
        if (this.required) {
            if(this.selectRecordName == "" || this.selectRecordName == undefined) {
                this.template.querySelector('lightning-input').setCustomValidity('Complete this field.');
                this.template.querySelector('lightning-input').reportValidity();
                console.log('confirm this.selectRecordName:' + this.selectRecordName);
                return false;
            } else {
                this.template.querySelector('lightning-input').setCustomValidity('');
                this.template.querySelector('lightning-input').reportValidity();
                console.log('failed this.selectRecordName:' + this.selectRecordName);
                return true;
            }
        }
    }
}