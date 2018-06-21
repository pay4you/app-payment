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
  public page: any = 1;
  public pagination: any = 1;

  constructor(public navCtrl: NavController, public http: HttpClient,
              public navParams: NavParams) {
                console.log('estabelecimentos', this.navParams.data);
    this.auth = this.navParams.get('token');
    this.getEstablishments();
  }

  getEstablishments() {

    let header = new HttpHeaders().set('Authorization', this.auth);

    let url = 'http://pay4you-club.umbler.net/v1/establishments?pageNumber=' + this.page + '&pageSize=3';

    console.log('headers', this.auth);
    this.http.get(url, { headers: header }).toPromise().then(res => {
      this.establishments = res;
    });

  }

  goToCurtoCaf(item){
    console.log('goToCurtoCaf', item);
    this.navCtrl.push(CurtoCafPage, {'token': this.auth, 'establishment': item});
  }

  backPage() {
    if(this.page > 1) {
      this.pagination--;
      this.page = this.page - 3;
      this.getEstablishments();
    }
  }

  forwardPage() {
    this.page = this.page + 3;
    this.pagination++;
    this.getEstablishments();
  }



}
