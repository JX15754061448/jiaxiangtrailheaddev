@RestResource(urlMapping='/webGetAccountList')
global with sharing class webGetAccountList {
    global class forceToWeb{
    	global list<Account> accountList;
    	global String ErrorMessage;
    	
    }
    @HttpPost
    global static void doPost(){
    	
    	 forceToWeb back=new forceToWeb();
   		 list<Account> lists=new list<Account>();
   		 try{
   			 lists=[select Name,Site from Account];
   		     back.accountList=lists;
   		
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