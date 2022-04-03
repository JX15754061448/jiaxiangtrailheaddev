({
    query : function(component) {
    console.log('before fire');
    var action = component.get('c.queryAccount');
    	action.setCallback(this, function (response){
    		var state = response.getState();
    		if(state == 'SUCCESS'){
    			var result = response.getReturnValue();
                console.log('==>result:' + result);
    			 var navEvt = component.getEvent('helloAuraEvent11');
                navEvt.setParams({
                    "account": result
                });
                navEvt.fire();
                console.log('fire');
    		}

    	});
    $A.enqueueAction(action);
    }
})