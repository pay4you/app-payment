import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { Http, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-entrar',
  templateUrl: 'entrar.html'
})
export class EntrarPage {

  private email: any;
  private password: any;

  constructor(public navCtrl: NavController, public http: Http,
    public headers: RequestOptions) {
  }
  goToCadastro(params){
    if (!params) params = {};



    this.navCtrl.push(CadastroPage);
  }
  goToEstabelecimentos(){

    console.log('goToEstabelecimento - login', this.email, ' senha', this.password);

    let params = {
      "email": this.email,
      "password": this.password
    };

    let header = new Headers();
    header.set("Content-Type", "application/json");

    let opt = new RequestOptions({
      headers: header
    });

    this.http.post('http://pay4you-club.umbler.net/v1/users/authenticate', JSON.stringify(params), opt).toPromise().then(res => {
      console.log('response authentication', res);
    });



    this.navCtrl.setRoot(TabsControllerPage);
  }
}
