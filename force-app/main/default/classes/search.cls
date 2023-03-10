public with sharing class search {
    @AuraEnabled(cacheable=true)
    public static List<Account> searchFunctionality(string key){
        try {
            string searchkey ='%'+key+'%';
            return [Select name,Id from Account where name like :searchkey];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}
