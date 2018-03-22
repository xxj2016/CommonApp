import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  selectedTheme: String;
  constructor(
    public navCtrl: NavController,
    public nanParams: NavParams
  ) {
    
  }

}
