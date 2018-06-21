import { Component } from '@angular/core';
import { AlertController, NavController, ToastController } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";

@Component({
  selector: 'page-pedido',
  templateUrl: 'pedido.html'
})
export class PedidoPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  public order = [];
  public establishment: any;
  public valorTotal: any;
  public cards = [];

  constructor(public navCtrl: NavController, private storage: Storage,
              public http: HttpClient, private alertCtrl: AlertController,
              private toast: ToastController) {

  }


  ionViewWillEnter(){
    this.getOrder();
    this.getPedido();
    this.getCards();
  }

  getOrder() {
    return this.storage.get('order').then((res: any) => {
      if(res) {
        this.establishment = res.establishment;
      }
    });
  }

  getPedido() {

    this.storage.get('pedido').then((res: any) => {
      if(res) {
        this.order = res;
      }
      this.valorTotal = this.getValorTotal();
    });
  }

  getCards() {
    return this.storage.get('cards').then((res: any) => {
      if(res) {
        this.cards = res;
      }
    });
  }

  getValorTotal() {
    let total = 0;
    for(let i = 0; i < this.order.length; i++) {
      total = total + this.order[i][0].price * this.order[i].length;
    }
    return total;
  }

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      if (!map.has(key)) {
        map.set(key, [item]);
      } else {
        map.get(key).push(item);
      }
    });
    return map;
  }

  getMapValues(mapArray) {
    let iterator = mapArray.values();
    let res = [];
    for(let i = 0; i < mapArray.size; i++) {
      res.push(iterator.next().value);
    }
    return res;
  }

  payBill() {
    let selectedCard: any;
    let alert = this.alertCtrl.create();
    alert.setTitle('Escolha seu cartão');


    for(let i = 0; i < this.cards.length; i++) {
      alert.addInput({
        type: 'radio',
        label: this.cards[i].cardnumber,
        value: this.cards[i],
      });
    }
    alert.addButton({
      text: 'Cancelar'
    });
    alert.addButton({
      text: "Pagar",
      handler: (data: any) => {
        selectedCard = data;
      }
    });
    alert.onDidDismiss((data)=> {
      this.pagar(selectedCard);
    });
    alert.present();
  }

  pagar(card){
    let toast;
    if(card) {
      toast = this.toast.create({
        message: 'Pagamento efetuado com sucesso!',
        duration: 3000,
        position: 'bottom'
      });
      this.order = [];
      this.establishment = [];
      this.valorTotal = '';
      this.storage.remove('pedido');
      this.storage.remove('order');
      this.storage.remove('pedidocompleto');
    }
    else {
      toast = this.toast.create({
        message: 'Pagamento não efetuado',
        duration: 2000,
        position: 'bottom'
      });
    }
    toast.present();
  }
}
