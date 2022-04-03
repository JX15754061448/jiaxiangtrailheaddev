import { LightningElement } from 'lwc';
export default class HelloWorld extends LightningElement {
  greeting = 'LWC';
  changeHandler(event) {
    this.greeting = event.target.value;
  }
}