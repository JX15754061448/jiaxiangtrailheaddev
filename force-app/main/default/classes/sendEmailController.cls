public class sendEmailController {

    public String inputValue
    {
        get
           {        
                return inputValue;     
           }  
        set
           {
               inputValue =value;
           }
    }
    
    public integer refreshNum{get;set;}

    public String getDescription{
    get{
        String id = apexpages.currentPage().getParameters().get('id');
        String description = apexpages.currentPage().getParameters().get('description');

        return description;
        }

    }
    public void send(){
     String emailAddress=ApexPages.currentPage().getParameters().get('emailAddress');
     String description=ApexPages.currentPage().getParameters().get('description');
     
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        email.setSenderDisplayName('wang jiaxiang');
        email.setPlainTextBody(getDescription);
        email.setSubject('test email from jiaxiang');
        List<String> toAddresses = new List<String>();
        //system.debug('aaa'+contactUser);
        toAddresses.add(inputValue);
        email.setToAddresses(toAddresses);
        //email.setTargetObjectId(emailAddress);//使用此种方式给org内部User/Contact/Lead发邮件，email limit的count不加1
        //email.setSaveAsActivity(false);//如果设置targetObjectId，则必须设置setSaveAsActivity为false，12家祥

        email.setReplyTo('15754061448@163.com');
        Messaging.sendEmail(new List<Messaging.SingleEmailMessage>{email});
        refreshNum=1;
    }
    // Controller code goes here
    /*
    public void send(String emailAddress,String description){
    
         Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        email.setSenderDisplayName('wang jiaxiang');
        email.setPlainTextBody(description);
        email.setSubject('test email from jiaxiang');
        List<String> toAddresses = new List<String>();
        //system.debug('aaa'+contactUser);
        toAddresses.add(emailAddress);
        //email.setToAddresses(toAddresses);
        email.setTargetObjectId(emailAddress);//使用此种方式给org内部User/Contact/Lead发邮件，email limit的count不加1
        email.setSaveAsActivity(false);//如果设置targetObjectId，则必须设置setSaveAsActivity为false，12家祥

        email.setReplyTo('15754061448@163.com');
        Messaging.sendEmail(new List<Messaging.SingleEmailMessage>{email}); 
    
    }*/
}