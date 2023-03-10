/******************************************************************************
Name:  InActivateOrderandOrderItem
Copyright © 2020  Thryv.
==============================================================================

Purpose:
This class inactivate the order and orderitems

History
-------
VERSION     AUTHOR                  DATE              DETAIL
------      ------                  -----            ---------
1.0         Accenture               04/20/2020       SLSCLD-33308
2.0         Prasad                  03/29/2022       SLSCLD-52856 - OrderItem Reconcile
                                                                  - Updated return type from void to list<order> 
                                                                  - arguments update (removed as not used)
*****************************************************************************/
public class InActivateOrderandOrderItem { //2.0 Full class redone
	public static list<Order> updateItemsandOrder() {
		Set<Id> OrderSet = new Set<Id>();
		List<OrderItem> OrderItemList = (List<OrderItem>) Trigger.new;
		Set<Id> matchedorder = new Set<Id>();
		List<Order> matchedorderlist = new List<Order>();
		List<orderitem> matchedOrderItem = new List<orderitem>();
		List<String> printMainStringList = new List<String>();
		Map<id, order> orderAcc = new Map<Id, order>();
		Set<String> itemIdSet = new Set<String>();
		set<id> accountIds = new Set<id>();

		for (OrderItem oi : OrderItemList) {
			accountIds.add(oi.Account__c);
			OrderSet.add(oi.OrderId);
			system.debug('OrderItemList' + oi.Product_Family__c);
			if (oi.Product_Family__c == 'Print' && (oi.Dir_Num__c != null || oi.Dir_Num__c != '') && (oi.Dir_Issue_Num__c != null || oi.Dir_Issue_Num__c != '')) {
				String printMainString = oi.Dir_Num__c + ',' + oi.Dir_Issue_Num__c + ',' + oi.Account__c;
				printMainStringList.add(printMainString);
			} else if (oi.Product_Family__c == 'Digital' && oi.item_id__c != null) {
				string itemid = oi.item_id__c;
				itemIdSet.add(itemid);
			}
		}

		List<order> Acceptedorders = [
			SELECT
				id,
				name,
				status__c,
				IsActive__c,
				(
					SELECT id, OrderId, Orderitem_status__r.name, item_id__c, Dir_Num__c, Dir_Issue_Num__c, Dir_Name__c, Active__c, Product2.Family, Order_ID__c, Account__c
					FROM orderitems
					WHERE Orderitem_status__r.name = 'Accepted' AND Active__c = TRUE
				)
			FROM order
			WHERE AccountId IN :accountIds AND Id NOT IN :OrderSet AND status__C != 'In Fulfillment' AND status__C != 'Completed'
		];

		if (!Acceptedorders.isEmpty()) {
			for (order orderAccpt : Acceptedorders) {
				orderAcc.put(orderAccpt.id, orderAccpt);
				System.debug('Acceptedordersitem::' + orderAccpt.orderitems);

				for (Orderitem oritemtobeUpdated : orderAccpt.orderitems) {
					String printSubstring = oritemtobeUpdated.Dir_Num__c + ',' + oritemtobeUpdated.Dir_Issue_Num__c + ',' + oritemtobeUpdated.Account__c;
					System.debug('printSubstring::' + printSubstring);
					system.debug('printMainStringList' + printMainStringList);
					if (
						((printMainStringList.contains(printSubstring)) && oritemtobeUpdated.Product2.Family == 'Print') ||
						(itemIdSet.contains(oritemtobeUpdated.Item_id__c) && oritemtobeUpdated.Product2.Family == 'Digital')
					) {
						Order updateOrder = orderAcc.get(oritemtobeUpdated.OrderId);
						updateOrder.isActive__C = false;

						if (!matchedorder.contains(oritemtobeUpdated.OrderId)) {
							matchedorder.add(oritemtobeUpdated.OrderId);
							matchedorderlist.add(orderAcc.get(oritemtobeUpdated.OrderId));
						}
						System.debug('matchedorder' + matchedorder);
					}
				}
			}
		}

		return matchedorderlist;
	}
}

//Version 1.0 totally commented for version 2.0
/*public class InActivateOrderandOrderItem {
    public static void updateItemsandOrder(boolean isafter, boolean isinsert,Set<Id> OrderIDSet){
        Set<Id> OrderSet = new Set<Id>();
        List<OrderItem> OrderItemList = (List<OrderItem>)trigger.new;
        Set<Id> matchedorder = new Set<Id>();
        List<Order> matchedorderlist = new List<Order>();
        List<orderitem> matchedOrderItem = new List<orderitem>();
        List<String>printMainStringList = new List<String>();
        Map<id,order> orderAcc = new Map<Id, order>();
        Set<String> itemIdSet = new Set<String>();
        set<id> accountIds = new set<id>();
         System.debug('OrderItemList::'+OrderItemList.size());   
        
        for(OrderItem oi:OrderItemList){
            accountIds.add(oi.Account__c);
            OrderSet.add(oi.OrderId);
            if(oi.Product_Family__c == 'Print' && (oi.Dir_Num__c != Null || oi.Dir_Num__c != '') && (oi.Dir_Issue_Num__c != Null || oi.Dir_Issue_Num__c != '')){
                String printMainString = oi.Dir_Num__c +','+ oi.Dir_Issue_Num__c +','+ oi.Account__c;
                printMainStringList.add(printMainString);
            }
            else if(oi.Product_Family__c == 'Digital' && oi.item_id__c != Null){
                string itemid = oi.item_id__c;
                itemIdSet.add(itemid);
            }
            
        }
        
        List<order> Acceptedorders = [select id,name,status__c,IsActive__c,(select id,OrderId,Orderitem_status__r.name,item_id__c,Dir_Num__c,Dir_Issue_Num__c,Dir_Name__c,Active__c,Product2.Family,Order_ID__c,Account__c from orderitems where Orderitem_status__r.name = 'Accepted'  and Active__c = true) from order where AccountId in :accountIds  and Id NOT IN :OrderSet and status__C !='In Fulfillment' and status__C !='Completed'];
        System.debug('Acceptedorders::'+Acceptedorders.size());
        if(!Acceptedorders.isEmpty())
        for(order orderAccpt : Acceptedorders)
        {
            orderAcc.put(orderAccpt.id, orderAccpt);
            
            for(Orderitem oritemtobeUpdated : orderAccpt.orderitems){
                    String printSubstring = oritemtobeUpdated.Dir_Num__c +','+ oritemtobeUpdated.Dir_Issue_Num__c +','+ oritemtobeUpdated.Account__c;
                    System.debug('printSubstring::'+printSubstring);
                    system.debug('printMainStringList'+printMainStringList);
                    if(((printMainStringList.contains(printSubstring)) && oritemtobeUpdated.Product2.Family == 'Print') || (itemIdSet.contains(oritemtobeUpdated.Item_id__c) && oritemtobeUpdated.Product2.Family == 'Digital' )){
                        Order updateOrder = orderAcc.get(oritemtobeUpdated.OrderId);
                        updateOrder.isActive__C = false;
                        //oritemtobeUpdated.Active__C = false;
                        
                        if(!matchedorder.contains(oritemtobeUpdated.OrderId)){
                            matchedorder.add(oritemtobeUpdated.OrderId);
                            matchedorderlist.add(orderAcc.get(oritemtobeUpdated.OrderId));
                        }
                        
                       // matchedOrderItem.add(oritemtobeUpdated);
                        System.debug('matchedorder'+matchedorder);
                        //System.debug('matchedOrderItem'+matchedOrderItem);
                    }
                   
            }
        }
        //if(!matchedorder.isEmpty() && !matchedOrderItem.isEmpty()){
        if(!matchedorder.isEmpty()){
            System.debug('matchedorderlist'+matchedorderlist);
            update matchedorderlist;
            //update matchedOrderItem;
        }
        
    }
}*/

