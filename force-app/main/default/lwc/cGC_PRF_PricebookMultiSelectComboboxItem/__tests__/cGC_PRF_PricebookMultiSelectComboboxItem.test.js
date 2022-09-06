import CGC_PRF_PricebookMultiSelectComboboxItem from 'c/cGC_PRF_PricebookCGC_PRF_PricebookMultiSelectComboboxItem';
import { createElement } from 'lwc';

let element;

describe('c-c-g-c_-p-r-f_-pricebook-multi-select-combobox-item', () => {
  beforeEach(() => {
    element = createElement('c-c-g-c_-p-r-f_-pricebook-multi-select-combobox-item', {
      is: CGC_PRF_PricebookMultiSelectComboboxItem
    });
  });

  afterEach(() => {
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  it('should show label of selected item', () => {
    // given
    element.item = { name: 'name', label: 'label', selected: true };

    // when
    document.body.appendChild(element);
    const item = element.shadowRoot.querySelector('span.slds-truncate');

    // then
    expect(item.textContent).toBe('label');
  });

  it('should fire change event when clicked', () => {
    // given
    const mockClickHandler = jest.fn();
    element.item = { name: 'name', label: 'label', selected: false };
    element.addEventListener('click', mockClickHandler);

    // when
    document.body.appendChild(element);
    const listItem = element.shadowRoot.querySelector('li');
    listItem.click();

    // then
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  });
});
