import { createElement } from 'lwc';
import CGC_PRF_PricebookEntryCheckbox from 'c/cGC_PRF_PricebookEntryCheckbox';

describe('c-c-g-c-p-r-f-pricebook-entry-checkbox', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('TODO: test case generated by CLI command, please fill in test logic', () => {
        // Arrange
        const element = createElement('c-c-g-c-p-r-f-pricebook-entry-checkbox', {
            is: CGC_PRF_PricebookEntryCheckbox
        });

        // Act
        document.body.appendChild(element);

        // Assert
        // const div = element.shadowRoot.querySelector('div');
        expect(1).toBe(1);
    });
});