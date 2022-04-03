({
    selectedRecords : function(component, event, helper) {
        var selectRecName = event.getParam('selRecords');
        if(selectRecName != undefined) {
            component.set("v.selectedRecords", selectRecName);
        }
    },

    selectedUserRecord : function(component, event, helper) {
        var selectRecName = event.getParam('selectName');
        var selectRecId = event.getParam('currentRecId');
        if(selectRecName != undefined) {
            component.set("v.selectUserName", selectRecName);
            component.set("v.selectUserId", selectRecId);
        }
    },

    selectedContactRecord : function(component, event, helper) {
        var selectRecName = event.getParam('selectName');
        var selectRecId = event.getParam('currentRecId');
        if(selectRecName != undefined) {
            component.set("v.selectContactName", selectRecName);
            component.set("v.selectContactId", selectRecId);
        }
    },

    handleCancel: function(component, event, helper) {
        $A.get("e.force:closeQuickAction").fire();
    },

    handleSave: function(component, event, helper) {
        component.find('startDate').reportValidity();
        component.find('endDate').reportValidity();

        if ( component.find('startDate').checkValidity()
            && component.find('endDate').checkValidity()
            && component.find('relatedto').validity()) {

                var eventParam = {};
                eventParam.Description = component.find('description').get('v.value');
                eventParam.WhoId = component.get('v.selectContactId');
                eventParam.Subject = component.find('subject').get('v.value');
                eventParam.StartDateTime = component.find('startDate').get('v.value');
                eventParam.EndDateTime = component.find('endDate').get('v.value');
                eventParam.IsAllDayEvent = component.get('v.isAllDayEvent');

                helper.saveRecords(component, event, helper, eventParam, component.get('v.selectedRecords'));
                component.set('v.isSaving', true);
        }
    }
})
