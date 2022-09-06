import { api, LightningElement } from 'lwc';

/**
 * Component that represents an item within the multi select combobox parent component.
 * @alias CGC_PRF_PricebookMultiSelectComboboxItem
 * @extends LightningElement
 * @hideconstructor
 *
 * @example
 * <c-c-g-c_-p-r-f_-pricebook-multi-select-combobox-item key={item.key} item={item} onchange={handleChange}></c-c-g-c_-p-r-f_-pricebook-multi-select-combobox-item>
 */
export default class CGC_PRF_PricebookMultiSelectComboboxItem extends LightningElement {
  /**
   * Single selectable item received from the multi select combobox parent component.
   * @type {Object}
   */
  @api item;

  get itemClass() {
    return `slds-listbox__item ${this.item.selected ? 'slds-is-selected' : ''}`;
  }

  handleClick() {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { item: this.item, selected: !this.item.selected }
      })
    );
  }
}
