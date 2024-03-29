public with sharing class SignupController {

    public String siteURL  {get; set;}
    public String error {get;set;}
    public boolean userExists {get;set;}
    public boolean hasError {get;set;}

    public String reg_password {get; set {reg_password = value == null ? value : value.trim(); } }
    public String reg_confirmPassword {get; set { reg_confirmPassword = value == null ? value : value.trim(); } }

    public User u {get;set;}

    public SignupController (ApexPages.StandardController stdController) {
        siteURL  = Site.getBaseUrl();
        u = (User)stdController.getRecord();

    }


    public List<Schema.FieldSetMember> getFields() {
        return SObjectType.User.FieldSets.Registration.getFields();
    }


    private boolean isValidPassword() {
        return reg_password == reg_confirmPassword;
    }


    public PageReference registerUser() {

        if (!isValidPassword()) {
            ApexPages.Message msg = new ApexPages.Message(ApexPages.Severity.ERROR, Label.site.passwords_dont_match);
            ApexPages.addMessage(msg);
            return null;
        }

        String debugger = '';
        for(Schema.FieldSetMember f : this.getFields()) {
            debugger += f.getFieldPath() + ':' + u.get(f.getFieldPath()) ;
        }
        System.debug('CREATE USER: ' + debugger);
        Profile p = [SELECT Id FROM profile WHERE name='Customer Community User'];
        Account a = [SELECT Id FROM account WHERE name='Customers'];


        //u.CommunityNickname = u.email.substring(0,u.email.indexOf('@'));
        u.CommunityNickname = u.username;
        u.ProfileId = p.id;

        String userId = Site.createPortalUser(u, a.id, reg_password);

        if (userId != null) {
            if (reg_password != null && reg_password.length() > 1) {
                return Site.login(u.userName, reg_password, null);
            }
            else {
                PageReference page = System.Page.CommunitiesSelfRegConfirm;
                page.setRedirect(true);
                return page;
            }
        }

        return null;
    }



}
