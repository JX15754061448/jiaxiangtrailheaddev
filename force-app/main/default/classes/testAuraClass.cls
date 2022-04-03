public with sharing class testAuraClass {
    public testAuraClass() {
        
    }
    @AuraEnabled
    public static List<Account> queryAccounts(){
    	
    	return [SELECT Id, Name FROM Account LIMIT 10];

    }
}