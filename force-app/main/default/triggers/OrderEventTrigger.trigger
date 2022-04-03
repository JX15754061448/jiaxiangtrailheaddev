trigger OrderEventTrigger on Order_Event__e (after insert) {
    List<Task> taskList = New List<Task>();
    system.debug('order_event:' + trigger.New);
    for(Order_Event__e event : trigger.New) {
        if(event.Has_Shipped__c == true) {
            Task t = New Task(
                Priority = 'Medium',
                Subject = 'Follow up on shipped order ' + event.Order_Number__c,
                OwnerId = Userinfo.getUserId()
            );
                taskList.add(t);
        }
    }
    system.debug('taskList:' + taskList);
    if(!taskList.isEmpty()) {
        insert taskList;
    }
}