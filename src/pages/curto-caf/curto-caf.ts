import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-curto-caf',
  templateUrl: 'curto-caf.html'
})
export class CurtoCafPage {

  private establishment: any;
  private auth: any;
  private products: any;
  private order: any;
  public pedidocompleto = [];
  public pedido: any;
  public valorTotal = 0;

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              public http: HttpClient,
              private storage: Storage) {
    this.establishment = this.navParams.get('establishment');
    this.auth = this.navParams.get('token');
    this.storage.get('order').then((res: any) => {
      if(res) {
        this.order = res;
      }
    });

    this.getProductsByEstablishment();
  }


  getProductsByEstablishment() {
    let url = 'http://pay4you-club.umbler.net/v1/establishments/'+ this.establishment.id + '/products';
    let headers = new HttpHeaders().set('Authorization', this.auth);

    this.http.get(url, {headers: headers}).toPromise().then((res: any) => {
      if(res.success) {
        this.products = res.products;
      }
    });
  }

  addItem(item) {
    this.pedidocompleto.push(item);

    this.valorTotal = this.valorTotal + item.price;
    console.log('addItem', this.valorTotal);
    console.log('pedido', this.pedidocompleto);
    let pedidoMap = this.groupBy(this.pedidocompleto, produto => produto.id);
    this.pedido = this.getMapValues(pedidoMap);

    // let products = new Array();
    if(!this.order) {
      this.createOrder();
    }


    this.order.products.push(item.id);
    console.log(this.order);
    this.storage.set('order', this.order);
  }

  createOrder() {
    this.order = {
      "products": [],
      "establishment": this.establishment.id
    }
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

  confirmOrder() {
    let url = 'http://pay4you-club.umbler.net/v1/orders';
    let headers = new HttpHeaders({'Authorization': this.auth, 'Content-Type': 'application/json'});

    console.log(headers);

    this.http.post(url, JSON.stringify(this.order), { headers: headers }).toPromise().then((res: any) => {
      this.pedido = [];
      this.pedidocompleto = [];
    });
  }
}
