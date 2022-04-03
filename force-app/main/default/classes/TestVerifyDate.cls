@isTest
private class TestVerifyDate {
    @isTest static void testDateWithin30Days()
    {
        Date Date1 =date.today();
       Date Date2= Date1.adddays(29);
        Date d = VerifyDate.CheckDates(Date1,Date2);
        System.assertEquals(d, Date2);
           }
    @isTest static void testDateNotWithin30Days()
    {
         Date Date1 =date.today();
       Date Date2= Date1.adddays(30);
        Date d = VerifyDate.CheckDates(Date1,Date2);
        System.assertEquals(d, Date1);
    }
 
}