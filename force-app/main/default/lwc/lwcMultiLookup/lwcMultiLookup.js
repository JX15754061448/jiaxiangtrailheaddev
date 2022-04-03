import { LightningElement,api,track,wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import getResults from '@salesforce/apex/lwcCustomLookupController.getResults';
const FIELDS = [
    'Account.Name',
    'Account.Id',
];
export default class LwcMultiLookup extends LightningElement {
    @api objectName = 'Account';
    @api fieldName = 'Name';
    @api label;
    @api placeholder;
    @track searchRecords = [];
    @track selectedRecords = [];
    @api required = false;
    @api iconName = 'action:new_account'
    @api loadingText = false;
    @track txtclassname = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
    @track messageFlag = false;
    @track needEdit = true;
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wireRecord({error, data}) {
        if (error) {
            console.log('===>error:' + error.body.message);
        } else if (data) {
            console.log('==>data:' + data);
            this.setSelectedValue(data.Id, data.Name);
        }
    }

    get labelName() {
        return this.required ? `<span><span style="color: red">* </span>${this.label}</span>` : this.label;
    }

    get showInputBox() {
        return this.selectedRecords.length <= 0 ? true : this.needEdit ? true : false;
    }

    get showSelectedList() {
        return this.selectedRecords.length > 0 ;
    }

    connectedCallback() {
        if (this.recordId != null) {

        }
    }

    enableEdit() {
        this.needEdit = true;
    }

    searchField(event) {

        var currentText = event.target.value;
        var selectRecId = [];
        for(let i = 0; i < this.selectedRecords.length; i++){
            selectRecId.push(this.selectedRecords[i].recId);
        }
        this.loadingText = true;
        getResults({ ObjectName: this.objectName, fieldName: this.fieldName, value: currentText, selectedRecId : selectRecId })
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
        var recId = event.currentTarget.dataset.id;
        var recName = event.currentTarget.dataset.name;
        this.setSelectedValue(recId, recName);
    }

    setSelectedValue(recId, recName) {
        let newsObject = { 'recId' : recId ,'recName' : recName };
        this.selectedRecords.push(newsObject);
        this.txtclassname =  'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click';
        let selRecords = this.selectedRecords;
		this.template.querySelectorAll('lightning-input').forEach(each => {
            each.value = '';
        });
        this.needEdit = false;
        const selectedEvent = new CustomEvent('selected', { detail: {selRecords}, });
        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
        this.validity();
    }

    removeRecord (event){
        let selectRecId = [];
        for(let i = 0; i < this.selectedRecords.length; i++){
            if(event.detail.name !== this.selectedRecords[i].recId)
                selectRecId.push(this.selectedRecords[i]);
        }
        this.selectedRecords = [...selectRecId];
        let selRecords = this.selectedRecords;
        const selectedEvent = new CustomEvent('selected', { detail: {selRecords}, });
        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
        setTimeout(() => {
            this.validity();
        }, 100);
    }

    @api validity() {
        if (this.required && this.showInputBox) {
            if(this.selectedRecords.length <=0 || this.selectedRecords == undefined) {
                this.template.querySelector('lightning-input').setCustomValidity('Complete this field.');
                this.template.querySelector('lightning-input').reportValidity();
                return false;
            } else {
                this.template.querySelector('lightning-input').setCustomValidity('');
                this.template.querySelector('lightning-input').reportValidity();
                return true;
            }
        } else {
            return true;
        }
    }
}