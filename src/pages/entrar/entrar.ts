import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'page-entrar',
  templateUrl: 'entrar.html'
})
export class EntrarPage {

  private email: any;
  private password: any;
  public msg: any;

  constructor(public navCtrl: NavController, public http: HttpClient) {
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

    let header = new HttpHeaders().set("Content-Type", "application/json");

    this.http.post('http://pay4you-club.umbler.net/v1/users/authenticate', JSON.stringify(params), { headers: header}).toPromise().then(res => {
      // console.log('response authentication', res);
      if(res.success) {
        this.msg = res.message;
        this.navCtrl.setRoot(TabsControllerPage);
      }
    });
    // this.navCtrl.setRoot(TabsControllerPage);
  }
}
