import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { DishProvider } from '../../providers/dish/dish';
import { Promotion } from '../../shared/promotion';
import { PromotionProvider } from '../../providers/promotion/promotion';
import { Leader } from '../../shared/leader';
import { LeaderProvider } from '../../providers/leader/leader';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage implements OnInit {

  leader: Leader[];
  leaderErrMess: string;
 constructor(public navCtrl: NavController,
    private leaderservice: LeaderProvider,
    @Inject('BaseURL') private BaseURL) { }
	ngOnInit() {
    
    this.leaderservice.getLeaders()
      .subscribe(leader => this.leader = leader,
        errmess => this.leaderErrMess = <any>errmess );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
