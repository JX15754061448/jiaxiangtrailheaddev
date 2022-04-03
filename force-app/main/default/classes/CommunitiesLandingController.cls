/**
 * An apex page controller that takes the user to the right start page based on credentials or lack thereof
 */
// public with sharing class CommunitiesLandingController {

//     // Code we will invoke on page load.
//     public PageReference forwardToStartPage() {
//         return Network.communitiesLanding();
//     }

//     public CommunitiesLandingController() {}
// }
public with sharing class CommunitiesLandingController {

    // Code we will invoke on page load.
    public PageReference forwardToStartPage() {

        String communityUrl = Site.getBaseUrl();
        String startUrl = System.currentPageReference().getParameters().get('startURL');
        if (startUrl == null) startUrl = '';
        if (UserInfo.getUserType().equals('Guest')) {
            return new PageReference(communityUrl + '/signin?startURL=' + EncodingUtil.urlEncode(startUrl, 'UTF-8'));
        } else {
            return Network.communitiesLanding();
        }

    }
    public CommunitiesLandingController() {}

}