import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsProvider, ToastService } from './../../providers/settings/settings'
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  
  following = false;
  user = {
    name: 'Jet Xu',
    profileImage: 'assets/imgs/avatar/girl-avatar.png',
    coverImage: 'assets/imgs/background/background-5.jpg',
    occupation: '前端奋斗者',
    location: '珠海, 香洲',
    description: '认真你就输了？切，不认真你才输呢！',
    followers: 456,
    following: 1052,
    posts: 35
  };

  posts = [
    {
      postImageUrl: 'assets/imgs/background/background-2.jpg',
      text: `I believe in being strong when everything seems to be going wrong.
             I believe that happy girls are the prettiest girls.
             I believe that tomorrow is another day and I believe in miracles.`,
      date: 'November 5, 2016',
      likes: 12,
      comments: 4,
      timestamp: '11h ago'
    },
    {
      postImageUrl: 'assets/imgs/background/background-3.jpg',
      text: 'Do not go where the path may lead, go instead where there is no path and leave a trail.',
      date: 'October 23, 2016',
      likes: 30,
      comments: 64,
      timestamp: '30d ago'
    },
    {
      postImageUrl: 'assets/imgs/background/background-4.jpg',
      date: 'June 28, 2016',
      likes: 46,
      text: `Hope is the thing with feathers that perches in the soul
             and sings the tune without the words And never stops at all.`,
      comments: 66,
      timestamp: '4mo ago'
    },
  ];

  selectedTheme: String;
  constructor(
      public navCtrl: NavController,
      private settings: SettingsProvider,
      public toastCtrl: ToastService
    ) {
      this.settings.getActiveTheme().subscribe( val => this.selectedTheme = val );
  }

  changeTheme() {
    if (this.selectedTheme === 'dark-theme') {
      this.settings.setActiveTheme('light-theme');
    } else {
      this.settings.setActiveTheme('dark-theme');
    }
  }

  ionViewDidLoad() {
    console.log('Hello ProfileFour Page');
  }

  follow() {
    this.following = !this.following;
    this.toastCtrl.create('切换主题成功');
  }

  imageTapped(post) {
    this.toastCtrl.create('Post image clicked');
  }

  comment(post) {
    this.toastCtrl.create('Comments clicked');
  }

  like(post) {
    this.toastCtrl.create('Like clicked');
  }


}
