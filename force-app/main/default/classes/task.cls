public with sharing class task {

    @AuraEnabled(cacheable=true)
    public static List<Account> acnts(){
        return [SELECT Name,Industry,Phone,Type FROM Account];
    }
    @AuraEnabled(cacheable=true)
    public static List<Account> searchAcnts(String strSearchTerm){
        system.debug('strSearchTerm' + strSearchTerm);
        List<Account> lstAct =new List<Account>();
        try{
            String strKey = '%'+strSearchTerm+'%';
            lstAct =  [SELECT Name,Industry,Phone,Type FROM Account Where Name  Like :strKey];

        }catch(Exception ex){
            system.debug('ex' +ex.getMessage());

        }
        return lstAct;
    }
    @AuraEnabled
    public static void delAcnts(string acrecId){
        Account acc= [SELECT Name,Industry,Phone,Type FROM Account WHERE Id=:acrecId];
        try{
            delete acc;
        }catch(DMLexception ex){
            throw new DMLexception('Error'+ex.getMessage());
        }
               
    }
    @AuraEnabled
    public static void delAcntsCheck(List<string> acrecId2){
     List<Account> selacc = new List<Account>();

        for(String rec:acrecId2 ){
        Account acc= [SELECT Name,Industry,Phone,Type FROM Account WHERE Id=:rec];
        selacc.add(acc);
        }

        try{
            delete selacc;
        }catch(DMLexception ex){
            throw new DMLexception('Error'+ex.getMessage());
        }
               
    }
    @AuraEnabled
    public static List<Contact> relatescontact(Id Accid){
        return [SELECT FirstName,LastName FROM Contact WHERE AccountId=:Accid];
    }

    @AuraEnabled

    public static string verifyPassword(string username, string password , string redirection){
        try {

            system.Site.login(username, password, redirection)  ;    

        }catch(Exception e){
            system.debug(e.getMessage());
        }

          return null;

    }
}