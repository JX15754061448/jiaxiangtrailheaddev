public with sharing class CGC_PRF_PricebookConsoleController {
    @AuraEnabled(cacheable=true)
    public static List<Product2> getPricebookEntriesByProductName(){
        try {
            return [
                SELECT Id, 
                        Name, 
                        (SELECT Pricebook2Id, 
                                Product2Id,
                                Product2.Name,
                                Product2.colorTheme__c,  
                                Id, 
                                Name, 
                                IsActive, 
                                ProductCode,
                                UnitPrice,
                                CGC_Image__c,
                                CGC_Typology__c
                        FROM PricebookEntries) 
                FROM Product2]; 
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
