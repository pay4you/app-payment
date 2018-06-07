import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import { CurtoCafPage } from '../curto-caf/curto-caf';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';

@Component({
  selector: 'page-entrar',
  templateUrl: 'entrar.html'
})
export class EntrarPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
  }
  goToCadastro(params){
    if (!params) params = {};
    this.navCtrl.push(CadastroPage);
  } goToEstabelecimentos(params){
    if (!params) params = {};
    this.navCtrl.setRoot(TabsControllerPage);
  } goToCurtoCaf(params){
    if (!params) params = {};
    this.navCtrl.push(CurtoCafPage);
  }
}
