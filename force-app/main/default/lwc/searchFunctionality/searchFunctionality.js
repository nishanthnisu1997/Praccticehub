import { LightningElement, wire } from 'lwc';
import acc from '@salesforce/apex/search.searchFunctionality';

export default class SearchFunctionality extends LightningElement {
    key ='';
@wire(acc,{key :'$Key'})
accounts;
}