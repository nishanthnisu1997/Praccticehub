public with sharing class AccountinsertionusingLWC {
 
    @AuraEnabled
    public static Account insertAccountMethod(Account accountObj){
        
            // system.debug(accountObj);
            // Account acobj = new Account();
            // acobj.Name=accountObj.accName;
            // acobj.Phone=accountObj.accPhone;
            // acobj.Type=accountObj.accType;
            // acobj.Site=accountObj.accSite;
            // acobj.Website=accountObj.accWebsite;
            // system.debug(acobj);
try{
 insert accountObj;
 system.debug(accountObj);

 return accountObj;
        } catch (DmlException  exp) {
            

            system.debug('The following exception has occurred:'+exp.getMessage());

         throw new AuraHandledException(exp.getMessage());
        }
    }
public class WrapperExample{
    @AuraEnabled public String accName{get;set;}
    @AuraEnabled public String accPhone{get;set;}
    @AuraEnabled public String accType{get;set;}
    @AuraEnabled public String accSite{get;set;}
    @AuraEnabled public String accWebsite{get;set;}


}
}