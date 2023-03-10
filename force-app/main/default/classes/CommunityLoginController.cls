public with sharing class CommunityLoginController {
	@AuraEnabled
	public static String verifyPassword(string username, string password) {
		try {
            String startUrl = 'awt68-dev-ed.my.site.com/mysupportsite';

			ApexPages.PageReference pageRef = Site.login(username, password, startUrl);

			if (pageRef != null) {
				return pageRef.getUrl();
			} else {
				return null;
			}
		} catch (Exception e) {
			system.debug(e.getMessage());
			return null;
		}
		// PageReference newFloodOnlyUrl = new PageReference(redirection);
		// newFloodOnlyUrl.setRedirect(true);
		// return newFloodOnlyUrl;
	}
}
