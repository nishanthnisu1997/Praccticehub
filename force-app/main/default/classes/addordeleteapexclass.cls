public with sharing class addordeleteapexclass {
	public addordeleteapexclass() {
	}
	public static void addString(string txt, Id accountId) {
		account act = [SELECT Name, Add_delete_Text_field__c FROM Account WHERE id = :accountId];
		system.debug('b' + act.Add_delete_Text_field__c);
		// if (!act.Add_delete_Text_field__c.contains(txt)) {
		// 	act.Add_delete_Text_field__c = act.Add_delete_Text_field__c == null ? txt : act.Add_delete_Text_field__c + ',' + txt;
		// 	update act;
		// }
		if (act.Add_delete_Text_field__c == null) {
			act.Add_delete_Text_field__c = '';
			act.Add_delete_Text_field__c += txt;
		} else if(!act.Add_delete_Text_field__c.contains(txt)){
			act.Add_delete_Text_field__c += ',' + txt;
		}
		update act;

		system.debug('act' + act.Add_delete_Text_field__c);
	}
	public static void removeString(string remTxt, Id accountId) {
		account b = [SELECT Name, Add_delete_Text_field__c FROM Account WHERE id = :accountId];
		if (b.Add_delete_Text_field__c.contains(remTxt)) {
			b.Add_delete_Text_field__c = b.Add_delete_Text_field__c.replace(remTxt, '');
			b.Add_delete_Text_field__c = b.Add_delete_Text_field__c.replace(',,', ',');
			b.Add_delete_Text_field__c = b.Add_delete_Text_field__c.removeEndIgnoreCase(',');
			b.Add_delete_Text_field__c = b.Add_delete_Text_field__c.removestart(',');

			update b;
		}
		// system.debug('b'+b.Add_delete_Text_field__c);
	}

@AuraEnabled(cacheable=true)
public static List<Aptitude_Test__c> getquestion(){
	try {
		return [SELECT id,Answer__c,Option_1__c,Option_2__c,Questions__c FROM Aptitude_Test__c]; 

	} catch (Exception e) {
		throw new AuraHandledException(e.getMessage());
	}
}

}