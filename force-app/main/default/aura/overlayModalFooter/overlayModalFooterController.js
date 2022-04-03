({
    handleCancel : function(component, event, helper) {
        //closes the modal or popover from the component
        component.find("overlayLib").notifyClose();
    },
    handleOK : function(component, event, helper) {
        //do something
        console.log('handle confirm');
        var appEvent = $A.get("e.c:overLayModalEvent");
        appEvent.setParams({
            "alertAction" : "confirm",
            "message" : "An application event fired me. " +
            "It all happened so fast. Now, I'm everywhere!" });
        appEvent.fire();
        component.find("overlayLib").notifyClose();
    }
})
