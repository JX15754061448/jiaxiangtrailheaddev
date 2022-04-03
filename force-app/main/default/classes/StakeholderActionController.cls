public with sharing class StakeholderActionController {
    @AuraEnabled
    public static void saveEvents(Event event, String relatedTosString){
        try {
            List<lwcCustomLookupController.SObJectResult> relatedTos = (List<lwcCustomLookupController.SObJectResult>)JSON.deserialize(relatedTosString, List<lwcCustomLookupController.SObJectResult>.class);
            List<Event> events = new List<Event>();
            for (lwcCustomLookupController.SObjectResult relatedTo : relatedTos) {
                Event newEvent = new Event (
                    OwnerId = UserInfo.getUserId(),
                    Description = event.Description,
                    WhoId = event.WhoId,
                    WhatId = relatedTo.recId,
                    StartDateTime = event.StartDateTime,
                    EndDateTime = event.EndDateTime,
                    Subject = event.Subject,
                    IsAllDayEvent = Boolean.valueOf(event.IsAllDayEvent)
                );
                events.add(newEvent);
            }

            if (events.size() > 0) {
                Database.insert(events, false);
            }

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
