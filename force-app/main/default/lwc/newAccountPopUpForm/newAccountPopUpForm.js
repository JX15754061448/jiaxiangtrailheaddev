import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class NewAccountPopUpForm extends NavigationMixin(LightningElement) {
    handleClick = () => {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'new'
            },
            state : {
                nooverride: '1',
                defaultFieldValues:"Name=Salesforce,AccountNumber=A1,AnnualRevenue=37000,Phone=7055617159"
            }
        });
    }
}