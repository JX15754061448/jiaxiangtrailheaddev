import { LightningElement, api, track } from 'lwc';

export default class HelloLWC extends LightningElement {
    @api message = 'lwc';
    handleClick() {
        const event = new CustomEvent('click');
        // Fire the event from hello lwc
        this.dispatchEvent(event);
    }
}