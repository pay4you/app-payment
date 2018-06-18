import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CurtoCafPage } from '../curto-caf/curto-caf';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'page-estabelecimentos',
  templateUrl: 'estabelecimentos.html'
})
export class EstabelecimentosPage {

  private auth: any;
  private establishments: any;

  constructor(public navCtrl: NavController, public http: HttpClient,
              public navParams: NavParams) {
                console.log('estabelecimentos', this.navParams.data);
    this.auth = this.navParams.get('token');
    this.getEstablishments();
  }

  getEstablishments() {

    let header = new HttpHeaders().set('Authorization', this.auth);

    console.log('headers', this.auth);
    this.establishments = this.http.get('http://pay4you-club.umbler.net/v1/establishments?pageNumber=1&pageSize=3', { headers: header }).toPromise().then(res => {
    console.log('estabelecimentos', res);
      return res;
    });
  }

  goToCurtoCaf(params){
    if (!params) params = {};
    this.navCtrl.push(CurtoCafPage);
  }


}
