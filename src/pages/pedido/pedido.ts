import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HttpClient} from "@angular/common/http";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-pedido',
  templateUrl: 'pedido.html'
})
export class PedidoPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  public order: any;

  constructor(public navCtrl: NavController,
              private storage: Storage,
              public http: HttpClient) {
    this.storage.get('order').then((res: any) => {
      this.order = res;
    });
  }

  getOrderInfo() {

  }

}
