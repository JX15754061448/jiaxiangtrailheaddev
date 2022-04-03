({
    handleClick : function(component, event, helper) {
        component.set('v.showModal', true);
    },

    handleOverLayModalEvent : function(component, event, helper) {
        var message = event.getParam("message");
        var action = event.getParam("alertAction");
        console.log('action:' + action + ' message:' + message);
    },

    handleOverlayClick : function(component, event, helper) {
        var modalBody;
        var modalFooter;
        $A.createComponents([
            ["c:overLayContent",{"contentBody": " This is alert body"}],
            ["c:overlayModalFooter",{}]
        ],
        function(components, status){
            if (status === "SUCCESS") {
                modalBody = components[0];
                modalFooter = components[1];
                component.find('overlayLib').showCustomModal({
                    header: "Application Confirmation",
                    body: modalBody,
                    footer: modalFooter,
                    showCloseButton: true,
                    // cssClass: "my-modal,my-custom-class,my-other-class,cOverLayContent",
                    /*Any custom CSS class you add with the cssClass parameter must be accompanied
                    by the cMyCmp class, where c is your namespace and MyCmp is the name of the component
                    that creates the modal. For this example, the class is cOverLayContent. Adding this class
                    ensures that the custom styling is properly scoped.*/
                    cssClass: "cOverLayContent",
                    closeCallback: function() {
                        // alert('You closed the alert!');
                    }
                })
            }
        }
        );
    }
})
