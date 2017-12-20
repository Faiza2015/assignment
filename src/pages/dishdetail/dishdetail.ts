import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController,ActionSheetController,ModalController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { CommentPage } from '../comment/comment';
/**
 * Generated class for the DishdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
    favorite: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    @Inject('BaseURL') private BaseURL,
	private favoriteservice: FavoriteProvider,
	private toastCtrl:ToastController,
	private ActionSheetCtrl:ActionSheetController,
	private ModalCtrl:ModalController) {
    this.dish = navParams.get('dish');
	this.favorite = favoriteservice.isFavorite(this.dish.id);
    this.numcomments = this.dish.comments.length;
    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating );
    this.avgstars = (total/this.numcomments).toFixed(2);
	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }
  OpenModal()
  {
  let modal=this.ModalCtrl.create(CommentPage);
			
		
			modal.onDidDismiss(data => {
			if(data){
this.dish.comments.push(data);
}});
  modal.present();
  }
  openActionSheet(){
  let ActionSheetCtrl=this.ActionSheetCtrl.create({
  title:'Select Actions',
  buttons:[
  {
  text:'Add to Favorites',
  handler:()=>{
   this.addToFavorites();
  
  } },
  {
  text:'Add Comment',
  handler:()=>{
            console.log('Add comment clicked');
			this.OpenModal(); } 
  },
  {
  text:'Cancel',
 role:'cancel',
  handler:()=>
  {
            console.log('Cancel clicked');
			}}]
}).present();
 }
  
addToFavorites() {
 console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
	this.toastCtrl.create({
	message: 'Dish ' + this.dish.id + ' added successfully',
	position:'middle',
	duration:3000
	
	}).present(); 
  }
}