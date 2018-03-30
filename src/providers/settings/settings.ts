import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Toast, ToastController } from 'ionic-angular';
/*
  Generated class for the SettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingsProvider {

  private theme: BehaviorSubject<String>;

  constructor() {
    // theme 是 BehaviorSubject实例
    this.theme = new BehaviorSubject('dark-theme');
    console.log('Hello SettingsProvider Provider');
  }

  setActiveTheme(val) {
    // 改变值
    this.theme.next(val);
  }

  getActiveTheme() {
    // 观察
    return this.theme.asObservable();
  }

}

@Injectable()
export class ToastService {

  toast: Toast;
  constructor(public toastCtrl: ToastController) { }

  create(message, ok = false, duration = 2000) {
    if (this.toast) {
      this.toast.dismiss();
    }

    this.toast = this.toastCtrl.create({
      message,
      duration: ok ? null : duration,
      position: 'bottom',
      showCloseButton: ok,
      closeButtonText: 'OK'
    });
    this.toast.present();
  }
}
