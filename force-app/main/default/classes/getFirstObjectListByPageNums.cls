@RestResource(urlMapping='/getFirstObjectListByPageNums')
global with sharing class getFirstObjectListByPageNums {
	
	 	global class forceToWeb{
    	global list<firstObject__c> firstObjectList;
    	global String ErrorMessage;
    	 	
    }
	// instantiate the StandardSetController from a query locator
      	public static ApexPages.StandardSetController con
      	{
          get 
          {
             // if(con == null) {
                  ApexPages.StandardSetController con = new ApexPages.StandardSetController(Database.getQueryLocator([select Name,Id from firstObject__c limit 10000]));
                 // sets the number of records in each page set
                 con.setPageSize(2);
                 con.setpageNumber(1);
                 
            // }
             return con;
          }
         
     }
    
    
     @HttpPost
    global static void doPost(){
    	
    	 forceToWeb back=new forceToWeb();
    	 list<firstObject__c> lists=new list<firstObject__c>();
   		 try{
   		 	
   		 	con.first();
            con.next();
   		 	
   		 	lists=(list<firstObject__c>)con.getRecords();
   		     back.firstObjectList=lists;
   		   
   		
   		 }
   		 catch(Exception e){
   		 	back.ErrorMessage=e.getMessage();
   		 }
   		 RestContext.response.responseBody = formatResponse(Back);
   		 
    }
    global static blob formatResponse(forceToWeb responseData)
    {
        string response;
        response = JSON.serialize(responseData);
        return blob.valueOf(response);
    }
}