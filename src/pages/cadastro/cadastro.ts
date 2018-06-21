import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { CurtoCafPage } from '../curto-caf/curto-caf';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  public name;
  public email;
  public password;
  public cpf;
  public address;
  public phone;
  public rg;
  public cardname;
  public cardcvv;
  public cardnumber;
  public cardvalid;

  constructor(public navCtrl: NavController,
              public http: HttpClient,
              public storage: Storage) {
  }

  goToEstabelecimentos(){
    let cadastro = {
      "name": this.name,
      "email": this.email,
      "password": this.password,
      "cpf": this.cpf,
      "address": this.address,
      "phone": this.phone
    };

    let card = {
      "cardname": this.cardname,
      "cardnumber": this.cardnumber,
      "cvv": this.cardcvv,
      "valid": this.cardvalid
    };

    let cards: any[];

    cards[0] = card;

    this.storage.set('cards', cards);

    let url = 'http://pay4you-club.umbler.net/v1/users';
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.post(url, JSON.stringify(cadastro), { headers: headers}).toPromise().then((res) => {
      this.navCtrl.setRoot(TabsControllerPage);
    });
  }

  goToCurtoCaf(params){
    if (!params) params = {};
    this.navCtrl.push(CurtoCafPage);
  }
}
