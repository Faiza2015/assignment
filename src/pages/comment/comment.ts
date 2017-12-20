import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';



/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
Comments:FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private viewCtrl:ViewController,private formBuilder: FormBuilder) {
  console.log('UserId', navParams.get('userId'));  
  this.Comments=this.formBuilder.group({

		rating:['5',Validators.required],
		comment:['',Validators.required],
		author:['',Validators.required],
		date:'',
});

}
ionViewDidLoad() 
{
    console.log('ionViewDidLoad CommentPage');
}
dismiss()
{
  this.Comments.value.date= new Date().toISOString();
  this.viewCtrl.dismiss();
}
onSubmit()
{ 
	this.Comments.value.date= new Date().toISOString();
	this.viewCtrl.dismiss(this.Comments.value);
}

}
