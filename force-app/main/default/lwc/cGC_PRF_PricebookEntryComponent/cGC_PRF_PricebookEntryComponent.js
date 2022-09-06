import { LightningElement, track, wire, api } from 'lwc';
import getProducts from '@salesforce/apex/CGC_PRF_PricebookConsoleController.getPricebookEntriesByProductName';
import { NavigationMixin } from "lightning/navigation";
import { refreshApex } from '@salesforce/apex';
import { getRecordNotifyChange } from 'lightning/uiRecordApi';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import PRICEBOOKENTRY_OBJECT from '@salesforce/schema/PricebookEntry';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import TYPOLOGY_FIELD from '@salesforce/schema/PricebookEntry.CGC_Typology__c';
import IMAGE_FIELD from '@salesforce/schema/PricebookEntry.CGC_Image__c';
import { loadStyle } from 'lightning/platformResourceLoader';
import PricebookEntryTable from '@salesforce/resourceUrl/PricebookEntryTable';
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

const columns = [
    { label: 'Name', fieldName: 'Name', type: 'customName', hideDefaultActions: true,
        typeAttributes: {
            Name: { fieldName: 'Name' }
        },
     },
    { label: 'Is Active', fieldName: 'IsActive', type: 'customCheckbox', hideDefaultActions: true,
        typeAttributes: {
            value: { fieldName : 'IsActive' },
            recordId: { fieldName : 'Id'},
            fieldApi: 'IsActive',
        } 
    },
    { label: 'List Price', fieldName: 'UnitPrice', type: 'currency', hideDefaultActions: true},
    { label: 'Typology', fieldName: 'CGC_Typology__c', type: 'customMultiSelectPicklist', initialWidth: 300, wrapText: true, hideDefaultActions: true,
        typeAttributes: {
            picklistOptions: { fieldName : 'typologyPLOptions' },
            value: { fieldName : 'CGC_Typology__c' },
            recordId: { fieldName : 'Id'},
            fieldApi: 'CGC_Typology__c',
        } 
    },
    { label: 'Image', fieldName: 'CGC_Image__c', type: 'customMultiSelectPicklist', initialWidth: 300, wrapText: true, hideDefaultActions: true,
        typeAttributes: {
            picklistOptions: { fieldName : 'imagePLOptions' },
            value: { fieldName : 'CGC_Image__c' },
            recordId: { fieldName : 'Id'},
            fieldApi: 'CGC_Image__c',
        } 
    },
    // { type: "button", initialWidth: 80, hideDefaultActions: true,
    //     typeAttributes: {
    //         label: 'Edit',
    //         name: 'edit',
    //         title: 'edit',
    //         disabled: false,
    //         value: 'test',
    //     }
    // },
]
export default class CGC_PRF_PricebookEntryComponent extends NavigationMixin(LightningElement) {
    @track products = [];
    @track error;
    @track activeSections = [];
    draftValues = [];
    columns = columns;

    typologyOptions = [];
    imageOptions = [];

    subscription = null;

    isRunning = false;

    @wire(MessageContext)
    messageContext;

    @wire(getObjectInfo, { objectApiName: PRICEBOOKENTRY_OBJECT })
    pricebookObjectInfo;
    
    @wire(getPicklistValues, { recordTypeId: '012000000000000AAA'/*'$pricebookObjectInfo.data.defaultRecordTypeId'*/, fieldApiName: TYPOLOGY_FIELD })
    getTypologyPicklistOptions({ error, data }) {
        if (data) { 
            console.log('==>typologyPicklistInfo:' + JSON.stringify(data));
            if (data != undefined) {
                for (var key in data.values) {
                    this.typologyOptions.push({label : data.values[key].label, value : data.values[key].value });
                }
            }
        } else if (error) {
            this.error = error;
        }
    }

    @wire(getPicklistValues, { recordTypeId: '012000000000000AAA'/*'$pricebookObjectInfo.data.defaultRecordTypeId'*/, fieldApiName: IMAGE_FIELD })
    getImagePicklistOptions({ error, data }) {
        if (data) { 
            console.log('==>imagePicklistInfo:' + JSON.stringify(data));
            if (data != undefined) {
                for (var key in data.values) {
                    this.imageOptions.push({label : data.values[key].label, value : data.values[key].value });
                }               
            }
            this.getProducts();
            console.log('==>imageOptions:' + JSON.stringify(this.imageOptions));
        }
    }

    renderedCallback() {
        
        Promise.all([
            loadStyle( this, PricebookEntryTable )
            ]).then(() => {
                console.log( 'Files loaded' );
            })
            .catch(error => {
                console.log( error.body.message );
        });

    }

    subscribeToMessageChannel() {
        if (!this.subscription) {
            this.subscription = subscribe(
                this.messageContext,
                recordUpdated,
                (message) => this.handleMessage(message),
                { scope: APPLICATION_SCOPE }
            );
        }
    }

    unsubscribeToMessageChannel() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    // Handler for message received by component
    handleMessage(message) {
        console.log('==handle message:' + JSON.stringify(message));
        let record = {'fields' : message};
        updateRecord(record);
    }

    // Standard lifecycle hooks used to subscribe and unsubsubscribe to the message channel
    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    disconnectedCallback() {
        this.unsubscribeToMessageChannel();
    }

    async getProducts(){
        this.isRunning = true;
        let products = await getProducts();
        this.activeSections = products.map(record => {
            return record.Name;
        });
        products = JSON.parse(JSON.stringify(products));
        let newProducts = products.map(product => {
            if (product.PricebookEntries != undefined) {
                product.PricebookEntries.forEach(pbEntry => {
                    pbEntry.typologyPLOptions = this.typologyOptions;
                    pbEntry.imagePLOptions = this.imageOptions;
                })
            }
            return {...product}   
        })
        this.products = newProducts;
        console.log('==>products:' + JSON.stringify(this.products));
        this.draftValues = [];
        this.isRunning = false;
    }

    handleToggleSection(event) {
        this.activeSectionMessage =
            'Open section name:  ' + event.detail.openSections;
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        console.log('==row action' + event);
        switch (actionName) {
            case 'edit':
                this.editRow(row);
                break;
            default:
        }
    }

    editRow(row) {
        console.log('==row:' + JSON.stringify(row));
        const { recordId } = row;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: row.Id, 
                actionName: 'edit',
            },
        });
        // refreshApex(this.products);
        getRecordNotifyChange([{recordId: row.Id}]);
    }

    async handleSave(event) {
        // Convert datatable draft values into record objects
        const updatedFields = event.detail.draftValues;
        console.log('==draft event:' + JSON.stringify(event));
        console.log('==draftValues:' + JSON.stringify(event.detail.draftValues));
        // const notifyChangeIds = updatedFields.map(row => { return { "recordId": row.Id } });
        // console.log('==notifyChangeIds:' + JSON.stringify(notifyChangeIds));

        const records = updatedFields.slice().map((draftValue) => {
            const fields = Object.assign({}, draftValue);
            return { fields };
        });

        // Clear all datatable draft values

        try {
            // Update all records in parallel thanks to the UI API
            const recordUpdatePromises = records.map((record) =>{
                updateRecord(record);
            });
            await Promise.all(recordUpdatePromises);
            // Report success with a toast
            setTimeout(() => {
                this.getProducts();
                // refreshApex(this.products);
                // this.dispatchEvent(
                //     new ShowToastEvent({
                //         title: 'Success',
                //         message: 'Pricebook Entries updated',
                //         variant: 'success'
                //     })
                // );
            }, 200);
            // Refresh LDS cache and wires
            // getRecordNotifyChange(notifyChangeIds);
            // Display fresh data in the datatable
            // await refreshApex(this.products);
        } catch (error) {
            console.log('==error:' + JSON.stringify(error));
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error updating or reloading Pricebook Entries',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        }
    }
}
