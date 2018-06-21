import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
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
  public cards = [];

  constructor(public navCtrl: NavController, private http: HttpClient,
              private storage: Storage, private alertCtrl: AlertController) {
    this.storage.get('token').then(token => {
      this.token = token;
      this.getUserInfo();
    });

    this.storage.get('cards').then(cards => {
      if(cards){
        this.cards = cards;
      }
      else {
        this.mockCard();
      }
    });
  }

  mockCard() {
    this.cards.push({
      'cardnumber': '4677.2803.0402.9624',
      'cardname': 'NICOLAS W B PEREIRA',
      'cardvalid': '10/2023',
      'cardcvv': '152'
    });
    this.storage.set('cards', this.cards);
  }

  getUserInfo() {
    let url = 'http://pay4you-club.umbler.net/v1/users/profile';

    let headers = new HttpHeaders().set("Authorization", this.token);
    this.http.get(url, {headers: headers}).toPromise().then((res: any) => {
      if(res.success) {
        this.user = res.user;
      }
    });
  }

  openModalCard() {
    let alert = this.alertCtrl.create();

    let cardnumber;
    let cardcvv;
    let cardvalid;
    let cardname;
    let newcard;

    alert.setTitle('Cadastrar novo cartão');

    alert.addInput({
      type: 'text',
      placeholder: 'Numero do cartão',
      label: 'Numero de Cartao',
      value: cardnumber
    });

    alert.addInput({
      type: 'text',
      placeholder: 'Nome do Proprietário',
      label: 'Nome do Proprietário',
      value: cardname
    });

    alert.addInput({
      type: 'text',
      placeholder: 'data de expiração',
      label: 'validade',
      value: cardvalid
    });

    alert.addInput({
      type: 'text',
      placeholder: 'CVV',
      label: 'CVV',
      value: cardcvv
    });

    alert.addButton({
      text: 'Cancelar'
    });

    alert.addButton({
      text: 'Cadastrar',
      handler: (data: any) => {
        newcard = {
          'cardnumber': data[0],
          'cardname': data[1],
          'cardvalid': data[2],
          'cardcvv': data[3]
        };
      }
    });

    alert.onDidDismiss((data)=> {
      if(data) {
       this.addCard(newcard);
      }
    });
    alert.present();
  }

  addCard(newcard) {
    if(newcard) {
      this.cards.push(newcard);
      this.storage.set('cards', this.cards);
    }
  }
}
