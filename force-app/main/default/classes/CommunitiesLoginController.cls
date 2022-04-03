/**
 * An apex page controller that exposes the site login functionality
 */
// global with sharing class CommunitiesLoginController {

//     global CommunitiesLoginController () {}

//     // Code we will invoke on page load.
//     global PageReference forwardToAuthPage() {
//     	String startUrl = System.currentPageReference().getParameters().get('startURL');
//     	String displayType = System.currentPageReference().getParameters().get('display');
//         return Network.forwardToAuthPage(startUrl, displayType);
//     }
// }
global with sharing class CommunitiesLoginController {

    global CommunitiesLoginController () {}

    // Code we will invoke on page load.
    global PageReference forwardToAuthPage() {
        String communityUrl = Site.getBaseUrl();
        String startUrl = System.currentPageReference().getParameters().get('startURL');
        if (startUrl == null) startUrl = '';
        String displayType = System.currentPageReference().getParameters().get('display');
        return new PageReference(communityUrl + '/signin?startURL=' + EncodingUtil.urlEncode(startUrl, 'UTF-8') +  '&display=' + displayType);
    }


}