({
    myAction : function(component, event, helper) {
    
    },

    onClick : function(component, event, helper) {

    	var atr = component.get('v.sonName');
    	console.log(atr);
    	component.set('v.sonName', '李四');
    	helper.queryData(component);
    
    }
})