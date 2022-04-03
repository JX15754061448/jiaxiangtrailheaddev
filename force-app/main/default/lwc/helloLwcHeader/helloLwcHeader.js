import { LightningElement, track } from 'lwc';
import queryAccount from '@salesforce/apex/helloAuraController.queryAccount';
export default class HelloLwcHeader extends LightningElement {
    @track accountList = [];
    getAccounts = async() => {
        const response = await queryAccount();
        this.accountList = response;
        console.log('==>response:' + response);
    }
}