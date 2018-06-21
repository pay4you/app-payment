import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ContaPage } from '../conta/conta';
import { PedidoPage } from '../pedido/pedido';
import { EstabelecimentosPage } from '../estabelecimentos/estabelecimentos';
import { CurtoCafPage } from '../curto-caf/curto-caf';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {

  tab1Root: any = EstabelecimentosPage;
  tab2Root: any = PedidoPage;
  tab3Root: any = ContaPage;
  token: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.token = this.navParams.get('token');
  }
  goToConta(params){
    if (!params) params = {};
    this.navCtrl.push(ContaPage, this.token);
  }
  goToPedido(params){
    if (!params) params = {};
    this.navCtrl.push(PedidoPage, this.token);
  }
  goToEstabelecimentos(params){
    if (!params) params = {};
    this.navCtrl.push(EstabelecimentosPage, {'token': this.token});
  }
  goToCurtoCaf(params){
    if (!params) params = {};
    this.navCtrl.push(CurtoCafPage);
  }
}
