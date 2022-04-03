global class accountBatchTest implements  Database.Batchable<sObject>, Database.Stateful{
    
    // instance member to retain state across transactions
    global Integer recordsProcessed = 0;
    global Database.QueryLocator start(Database.BatchableContext bc) {
                  
        system.debug('执行开始');

        return Database.getQueryLocator(
            'SELECT Id FROM firstObject__c where Id=\'a006F000037V8YR\''
        );
        
    }
    global void execute(Database.BatchableContext bc, List<firstObject__c > scope){
        // process each batch of records
               system.debug('执行结果：'+scope);
               List<firstObject__c > firstObjects = new List<firstObject__c >();

               firstObject__c obj=scope[0];
               obj.Name='来自batch';
               firstObjects.add(obj);
               update firstObjects;
    }    
    global void finish(Database.BatchableContext bc){
        system.debug('执行结束');
        
    }    
}