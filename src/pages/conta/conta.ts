import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'page-conta',
  templateUrl: 'conta.html'
})
export class ContaPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  private user;
  private token;

  constructor(public navCtrl: NavController,
              private http: HttpClient,
              private storage: Storage) {
    this.storage.get('token').then(token => {
      this.token = token;
      this.getUserInfo();
    });
  }

  getUserInfo() {
    let url = 'http://pay4you-club.umbler.net/v1/users/profile';

    let headers = new HttpHeaders().set("Authorization", this.token);
    this.http.get(url, {headers: headers}).toPromise().then((res: any) => {
      if(res.success) {
        console.log('user', this.user);
        this.user = res.user;
      }
    });
  }

  openModalCard() {

  }
}
