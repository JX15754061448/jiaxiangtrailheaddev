import { createElement } from 'lwc';
import CGC_PRF_PricebookEntryComponent from 'c/cGC_PRF_PricebookEntryComponent';

describe('c-c-g-c-p-r-f-pricebook-entry-component', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('TODO: test case generated by CLI command, please fill in test logic', () => {
        // Arrange
        const element = createElement('c-c-g-c-p-r-f-pricebook-entry-component', {
            is: CGC_PRF_PricebookEntryComponent
        });

        // Act
        document.body.appendChild(element);

        // Assert
        // const div = element.shadowRoot.querySelector('div');
        expect(1).toBe(1);
    });
});