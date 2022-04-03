({
    onInit : function(component, event, helper) {
        var empApi = component.find("empApi");
        var channel=component.get("v.channel");
        var replayId=-1; // subscribe to next event published
        console.log('***channel:'+channel);
        //whenever event is recieved, below callback function will be called
        var callback = function (message) {
            console.log('Event Received : ' + JSON.stringify(message));
            var eventFireTime =$A.localizationService.formatDateTime(message.data.payload.CreatedDate, 'MMM DD YYYY, hh:mm:ss a');
            var eventMessage = message.data.payload.Event_Info__c;
            var eventMessageForUI = 'Platform event fired at '+ eventFireTime + '. Event Info is-'+eventMessage;
            console.log('*******eventMessageForUI:'+eventMessageForUI);
            component.set("v.ltngEventMessage",eventMessageForUI);
            component.set("v.ltngShowEventMessage","true");
        };
        var errorHandler = function (message) {
            console.error('Received error ', JSON.stringify(message));
        };
        // Register empApi error listener and pass in the error handler function.
        empApi.onError(errorHandler);
        // Subscribe to the channel,specify the callback function and save the returned subscription object.
        console.log('*****now subscribing to channel');
        empApi.subscribe(channel, replayId, callback).then(function(newSubscription){
            console.log('Subscribed to channel12 ' + channel);
            component.set('v.subscription', newSubscription);
            console.log('newSubscription ' + JSON.stringify(newSubscription));
        });
    }
    /*Notification_Event__e demoEvent = new Notification_Event__e(
            Event_Info__c='This is a message called from Notification_Event__e'
            );
    // Call method to publish events
    Database.SaveResult sr = EventBus.publish(demoEvent);
    // Inspect publishing result
    if (sr.isSuccess()) {
        System.debug('Successfully published event.');
    } else {
        for(Database.Error err : sr.getErrors()) {
            System.debug('Error returned: ' +  err.getStatusCode() +' - ' + err.getMessage());
        }
    } */
})
