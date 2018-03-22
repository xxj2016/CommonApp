import { SettingsProvider } from './../../providers/settings/settings'
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
    public nanParams: NavParams,
    private settings: SettingsProvider
  ) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }

  changeTheme() {
    if (this.selectedTheme === 'dark-theme') {
      //改变
      this.settings.setActiveTheme('light-theme');
    } else {
      this.settings.setActiveTheme('dark-theme');
    }
  }
}
