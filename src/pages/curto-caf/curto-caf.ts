import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'page-curto-caf',
  templateUrl: 'curto-caf.html'
})
export class CurtoCafPage {

  private establishment: any;
  private auth: any;
  private products: any;

  constructor(public navCtrl: NavController,
              private navParams: NavParams,
              public http: HttpClient) {
    this.establishment = this.navParams.get('establishment');
    this.auth = this.navParams.get('token');

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
}
