import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CurtoCafPage } from '../curto-caf/curto-caf';

@Component({
  selector: 'page-estabelecimentos',
  templateUrl: 'estabelecimentos.html'
})
export class EstabelecimentosPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
  }
  goToCurtoCaf(params){
    if (!params) params = {};
    this.navCtrl.push(CurtoCafPage);
  }
}
