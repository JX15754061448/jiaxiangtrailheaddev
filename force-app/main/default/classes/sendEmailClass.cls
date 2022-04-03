global class sendEmailClass {
         //@RemoteAction
        webservice static string send(String contactUser ) {
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        email.setSenderDisplayName('wang jiaxiang');
        email.setPlainTextBody('this is test email made by apex SingleEmailMessage,\nthank you!');
        email.setSubject('test email from jiaxiang');
        List<String> toAddresses = new List<String>();
        system.debug('aaa'+contactUser);
        toAddresses.add(contactUser);
        //email.setToAddresses(toAddresses);
        email.setTargetObjectId(contactUser);//使用此种方式给org内部User/Contact/Lead发邮件，email limit的count不加1
        email.setSaveAsActivity(false);//如果设置targetObjectId，则必须设置setSaveAsActivity为false，12家祥

        email.setReplyTo('15754061448@163.com');
        Messaging.sendEmail(new List<Messaging.SingleEmailMessage>{email}); 
        return 'success'+contactUser;   
        }
}