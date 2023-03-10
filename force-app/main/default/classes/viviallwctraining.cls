public with sharing class viviallwctraining {
    public viviallwctraining() {

    }
    @AuraEnabled(cacheable = true)
    public static List<Contact> getcontacts(Id recordId){
        try {
            return [select Name,Email from Contact where AccountId=:recordId];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static contact insertCon(Id acctid,String fname,string lname, string email, string mailingStreet, string mailingPc, string otherStreet, string otherPc){
        
        Contact con = new Contact();
        con.AccountId =acctid;
        con.FirstName = fname;
        con.LastName = lname;
        con.Email = email;
        con.MailingStreet=mailingStreet;
        con.MailingPostalCode=mailingPc;
        con.OtherStreet = otherStreet;
        con.OtherPostalCode=otherPc;
        insert con;
        return con;
    } 


}
