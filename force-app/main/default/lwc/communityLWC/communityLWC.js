import { LightningElement} from 'lwc';
import verifypassword from '@salesforce/apex/CommunityLoginController.verifyPassword';


export default class CommunityLWC extends LightningElement {
  username;
  password;

  handleUserName(event){
    this.username = event.target.value;
    console.log(this.username);
  }

  handlePassword(event){
    this.password = event.target.value;
    console.log(this.password);


  }
 handleLogInClick() {
  console.log(this.username);
  console.log(this.password);

  verifypassword({ username:this.username, password : this.password})
  .then((result) => {

    window.location.href = result;

  })
  .catch(error => {
      this.error = error;

  });
}
}