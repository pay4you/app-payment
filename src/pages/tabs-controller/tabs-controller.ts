import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController) {
  }
  goToConta(params){
    if (!params) params = {};
    this.navCtrl.push(ContaPage);
  }
  goToPedido(params){
    if (!params) params = {};
    this.navCtrl.push(PedidoPage);
  }
  goToEstabelecimentos(params){
    if (!params) params = {};
    this.navCtrl.push(EstabelecimentosPage);
  }
  goToCurtoCaf(params){
    if (!params) params = {};
    this.navCtrl.push(CurtoCafPage);
  }
}
