({
    queryData : function(component) {
    	var action = component.get('c.queryAccounts');
    	action.setCallback(this, function callback(response){
    		if(response.getState() == 'SUCCESS'){
    			var result = response.getReturnValue();
    			console.log('response' + result);
    		}
    	});
    	$A.enqueueAction(action); 
    }
})