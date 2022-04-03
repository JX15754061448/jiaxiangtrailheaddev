public with sharing class helloAuraController {
    public helloAuraController() {
        
    }
    @AuraEnabled
    public static Account[] queryAccount(){
    	return [SELECT Id, Name FROM Account LIMIT 5];
    }
}