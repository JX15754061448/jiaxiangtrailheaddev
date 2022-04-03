({
    saveRecords : function(component, event, helper, eventParam, selectedRecords) {

        var saveAction = component.get('c.saveEvents');
        saveAction.setParams({"event" : eventParam, "relatedTosString" : JSON.stringify(selectedRecords)});
        saveAction.setCallback(this, (response)=>{
            if (response.getState() === "SUCCESS") {
                component.set('v.isSaving', false);
                helper.showToast("success", "Success!", "The records has been created successfully.");
            } else {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                        helper.showToast("error", "Failed!", errors[0].message);
                    }
                }
            }
        });
        $A.enqueueAction(saveAction);
    },

    showToast : function(type, title, message) {
        $A.get("e.force:closeQuickAction").fire();
        setTimeout(() => {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type":type,
                "title": title,
                "message": message
            });
            toastEvent.fire();
        }, 500);
        $A.get('e.force:refreshView').fire();
    }
})
