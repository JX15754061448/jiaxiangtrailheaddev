import { api, LightningElement, track, wire } from 'lwc';
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
/**
 * Combobox with different configuration options that also supports multi select.
 * @alias CGC_PRF_PricebookMultiSelectCombobox
 * @extends LightningElement
 * @hideconstructor
 *
 * @example
 * <c-c-g-c_-p-r-f_-pricebook-multi-select-combobox label="Products" name="products" options={options} ... required></c-c-g-c_-p-r-f_-pricebook-multi-select-combobox>
 */
export default class CGC_PRF_PricebookMultiSelectCombobox extends LightningElement {
  /**
   * If present, the combobox is disabled and users cannot interact with it.
   * @type {boolean}
   * @default false
   */
  @api disabled = false;

  /**
   * Text label for the combobox.
   * @type {string}
   * @default ''
   */
  @api label = '';

  /**
   * Specifies the name of the combobox.
   * @type {string}
   */
  @api name;

  /**
   * A list of options that are available for selection. Each option has the following attributes: label and value.
   * @type {Array}
   * @example
   * options = [
   *   {
   *     "label": "Option 1",
   *     "value": "option1"
   *   },
   *   {
   *     "label": "Option 2",
   *     "value": "option2"
   *   },
   * ]
   */
  @api options = [];
  @api set picklistOptions(value) {
    console.log('==>picklistOptions:' + JSON.stringify(value));
    this.options = value;
    this.currentOptions = JSON.parse(JSON.stringify(this.options));
  }
  get picklistOptions() {
    return this.options;
  }

  /**
   * Text that is displayed before an option is selected, to prompt the user to select an option.
   * @type {string}
   * @default 'Select an Option'
   */
  @api placeholder = 'Select an Option';

  /**
   * If present, the combobox is read-only. A read-only combobox is also disabled.
   * @type {boolean}
   * @default false
   */
  @api readOnly = false;

  /**
   * If present, a value must be selected before a form can be submitted.
   * @type {boolean}
   * @default false
   */
  @api required = false;

  /**
   * If present, the combobox only allows the selection of a single value.
   * @type {boolean}
   * @default false
   */
  @api singleSelect = false;

  /**
   * If present, the combobox will show a pill container with the currently selected options.
   * @type {boolean}
   * @default false
   */
  @api showPills = false;
  // @api set selectedValue(value){
  //   if (value != undefined && value != null) {
  //     this.selectedItems = value.split(';');
  //   }
  // }

  @track currentOptions = [];
  @api selectedItems = 'www';
  @api set testSelectedItems(value) {
    console.log('==>selectedItems:' + JSON.stringify(value));
    this.selectedItems = value;
    if (this.selectedItems) {
      let selectedOptions = this.selectedItems.split(';');
      selectedOptions.forEach(selectItem => {
        this.currentOptions.forEach(option => {
          if (option.value === selectItem) {
            option.selected = true;
          }
        });
      });
    } 
  }

  get testSelectedItems() {
    return this.selectedItems;
  }
  selectedOptions = [];
  isInitialized = false;
  isLoaded = false;
  isVisible = false;
  isDisabled = false;
  
  @api recordId;
  @api fieldApi;

  @wire(MessageContext)
    messageContext;

  connectedCallback() {
    this.isDisabled = this.disabled || this.readOnly;
    this.hasPillsEnabled = this.showPills && !this.singleSelect;
    console.log('==>recordId: ' + this.recordId + '==>apiname: ' + this.fieldApi);
  }

  renderedCallback() {
    if (!this.isInitialized) {
        this.template.querySelector('.multi-select-combobox__input').addEventListener('click', (event) => {
        this.handleClick(event.target);
        event.stopPropagation();
      });
      this.template.addEventListener('click', (event) => {
        event.stopPropagation();
      });
      // document.addEventListener('click', () => {
      //   this.close();
      // });
      this.isInitialized = true;
      this.setSelection();
    }
  }

  handleChange(event) {
    this.change(event);
  }

  handleRemove(event) {
    this.selectedOptions.splice(event.detail.index, 1);
    this.change(event);
    if (this.selectedItems != this.placeholder) {
      const payload = { Id : this.recordId, [this.fieldApi] : this.selectedItems};
      publish(this.messageContext, recordUpdated, payload);
    }
  }

  handleClick() {
    // initialize picklist options on first click to make them editable
    // if (this.isLoaded === false && !this.currentOptions) {
    //   this.currentOptions = JSON.parse(JSON.stringify(this.options));
    //   this.isLoaded = true;
    // }

    if (this.template.querySelector('.slds-is-open')) {
      this.close();
    } else {
      this.template.querySelectorAll('.multi-select-combobox__dropdown').forEach((node) => {
        node.classList.add('slds-is-open');
      });
    }
  }

  change(event) {
    // remove previous selection for single select picklist
    if (this.singleSelect) {
      this.currentOptions.forEach((item) => (item.selected = false));
    }

    // set selected items
    this.currentOptions
      .filter((item) => item.value === event.detail.item.value)
      .forEach((item) => (item.selected = event.detail.selected));
    this.setSelection();
    const selection = this.getSelectedItems();
    this.dispatchEvent(new CustomEvent('change', { detail: this.singleSelect ? selection[0] : selection }));

    // for single select picklist close dropdown after selection is made
    if (this.singleSelect) {
      this.close();
    }
  }

  close() {
    this.template.querySelectorAll('.multi-select-combobox__dropdown').forEach((node) => {
      node.classList.remove('slds-is-open');
    });
    if (this.selectedItems != this.placeholder) {
      const payload = { Id : this.recordId, [this.fieldApi] : this.selectedItems};
      publish(this.messageContext, recordUpdated, payload);
    }
    this.dispatchEvent(new CustomEvent('close'));
  }

  setSelection() {
    const selectedItems = this.getSelectedItems();
    let selection = '';
    if (selectedItems.length < 1) {
      selection = this.placeholder;
      this.selectedOptions = [];
    } /*else if (selectedItems.length > 2) {
      selection = `${selectedItems.length} Options Selected`;

      this.selectedOptions = this.getSelectedItems();
    } */else {
      selection = selectedItems.map((selected) => selected.label).join(';');
      this.selectedOptions = this.getSelectedItems();
    }
    this.selectedItems = selection;
    this.isVisible = this.selectedOptions && this.selectedOptions.length > 0;
  }

  getSelectedItems() {
    return this.currentOptions.filter((item) => item.selected);
  }
}
