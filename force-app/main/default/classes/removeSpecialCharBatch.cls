global class removeSpecialCharBatch implements Database.Batchable<sObject>{

        string objectName;
     public removeSpecialCharBatch( string objName){
         objectName = objName;
     }
    Map<string,List<string>> mapSpecialChar = new Map<string,List<string>>();
    List<string> lstString = new List<String>();
    List<string> lstString1= new List<String>();
    List<string> lstString2 = new List<String>();
    List<string> lstString3 = new List<String>();
    List<string> lstString4 = new List<String>();
    List<string> lstString5 = new List<String>();


    global Database.QueryLocator start(Database.BatchableContext BC){
        string query;
        if(objectName == 'Account'){
            query='SELECT Id,Name,Phone,Add_delete_Text_field__c,BillingCity,BillingStreet,BillingState,BillingPostalCode From Account where name Like \'%Test%\' LIMIT 3';
        }
       
        return Database.getQueryLocator(query);

     }
  
     global void execute(Database.BatchableContext BC, List<Account> actList){
        system.debug('lstact'+actList);
        if(objectName == 'Account'){
            for(Account s : actList){
                String SPECIAL_CHAR_PATTERN = '[^a-zA-Z0-9]';
                Pattern p = Pattern.compile(SPECIAL_CHAR_PATTERN);
                
                
                if(s.BillingCity!=null){
                    Matcher billcity = p.matcher(s.BillingCity);
                    while (billcity.find()) {
                        lstString.add(billcity.group(0));
                        mapSpecialChar.put('billcity',lstString);
                    }
                }
               
                if(s.BillingStreet != null){
                    Matcher billStreet = p.matcher(s.BillingStreet);
                while (billStreet.find()) {
                    lstString1.add(billStreet.group(0));
                    mapSpecialChar.put('billstreet',lstString1);        
                }
        
                }
                
                if(s.BillingState != null){
                    Matcher billState = p.matcher(s.BillingState);
                    while (billState.find()) {
                        lstString3.add(billState.group(0));
                        mapSpecialChar.put('billState',lstString3);          
                    }
                }
            
                if(s.BillingPostalCode != null){
                    Matcher billZip = p.matcher(s.BillingPostalCode);
                    while (billZip.find()) {
                        lstString4.add(billZip.group(0));
                        mapSpecialChar.put('billZip',lstString4);
                    }
                }
                if(s.phone != null){
                    Matcher phn = p.matcher(s.Phone);
                    while (phn.find()) {
                        lstString2.add(phn.group(0));
                        mapSpecialChar.put('phn',lstString2);
                    }
                }
        
                if(s.Name != null){
                    Matcher nameField = p.matcher(s.Name);
                    while (nameField.find()) {
                        lstString5.add(nameField.group(0));
                        mapSpecialChar.put('nameField',lstString5);
                    }
                }
              }
        }
      
      system.debug('Map'+mapSpecialChar);
    }  
      global void finish(Database.BatchableContext BC){
        AsyncApexJob a = [Select Id, Status,ExtendedStatus,NumberOfErrors,JobItemsProcessed,TotalJobItems, CreatedBy.Email from AsyncApexJob where Id =:BC.getJobId()];

    }
}