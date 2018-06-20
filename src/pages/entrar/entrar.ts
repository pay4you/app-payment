import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
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

  constructor(public navCtrl: NavController,
              public http: HttpClient,
              private storage: Storage) {

    this.storage.get('token').then(token => {
      console.log('token', token);
      if(token){
        this.navCtrl.setRoot(TabsControllerPage, {'token': token});
      }
    });
  }

  goToCadastro(params){
    if (!params) params = {};



    this.navCtrl.push(CadastroPage);
  }

  goToEstabelecimentos(){

    let params = {
      "email": this.email,
      "password": this.password
    };

    let header = new HttpHeaders().set("Content-Type", "application/json");

    this.http.post('http://pay4you-club.umbler.net/v1/users/authenticate', JSON.stringify(params), { headers: header}).toPromise().then((res: any) => {
      console.log('response authentication', res);
      if(res.success) {
        this.storage.set('token', res.token);
        this.msg = res.message;
        this.navCtrl.setRoot(TabsControllerPage, {'token': res.token});
      }
    });
    // this.navCtrl.setRoot(TabsControllerPage);
  }
}
