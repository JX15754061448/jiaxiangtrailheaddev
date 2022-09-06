import { LightningElement } from 'lwc';
import LightningDatatable from 'lightning/datatable';
import customNameTemplate from './customName.html';
import customMultiSelectTemplate from './customMultiSelect.html';
import customSingleSelectTemplate from './customSingleSelect.html';
import customMultiSelectEditTemplate from './customMultiSelectEdit.html';
import customCheckboxTemplate from './customCheckbox.html';

export default class CGC_PRF_PricebookEntryDatatable extends LightningDatatable {
    static customTypes = {
        customName: {
            template: customNameTemplate,
            standardCellLayout: true,
            typeAttributes: ['Name'],
        },
        customMultiSelectPicklist: {
            template: customMultiSelectTemplate,
            // editTemplate: customMultiSelectTemplate,
            standardCellLayout: true,
            typeAttributes: ['picklistOptions', 'value', 'recordId', 'fieldApi'],
        },
        customSinglePicklist: {
            template: customSingleSelectTemplate,
            standardCellLayout: true,
            typeAttributes: ['picklistOptions', 'value'],
        },
        customImagePicklist: {
            template: customMultiSelectTemplate,
            standardCellLayout: true,
            typeAttributes: ['options', 'value'],
        },
        customCheckbox: {
            template: customCheckboxTemplate,
            standardCellLayout: true,
            typeAttributes: ['value','recordId', 'fieldApi'],
        }
    }
}