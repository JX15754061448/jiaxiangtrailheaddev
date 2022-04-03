Global class TestBatchupdateProd implements Database.Batchable<sObject>, Database.Stateful{

   

    Public String query = 'Select Id,name from PSI_Product__c limit 1';

    global database.QueryLocator start(Database.BatchableContext bc){

         system.debug('执行开始');

        return Database.getQueryLocator('Select Id from Account limit 1');

    }

    global void execute(Database.BatchableContext bc, List<Account> scope){

         system.debug('执行结果'+scope);


    }

    global void finish(Database.BatchableContext BC){

                 system.debug('执行结束');


    }

}