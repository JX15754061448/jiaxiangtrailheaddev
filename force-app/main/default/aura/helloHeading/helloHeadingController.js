({
    handleEvent : function(component, event, helper) {
    	var accountList = event.getParams().account;
    	var source = event.getSource();
    	console.log('source:' + source);
    	var name = event.getName();
    	console.log('name:' + name);
    	console.log(accountList);
    	component.set('v.accountList', accountList);
    }
})