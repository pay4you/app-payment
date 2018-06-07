import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';
import { CurtoCafPage } from '../curto-caf/curto-caf';

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
  }
  goToEstabelecimentos(params){
    if (!params) params = {};
    this.navCtrl.setRoot(TabsControllerPage);
  }
  goToCurtoCaf(params){
    if (!params) params = {};
    this.navCtrl.push(CurtoCafPage);
  }
}
