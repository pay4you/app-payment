import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { EstabelecimentosPage } from '../pages/estabelecimentos/estabelecimentos';
import { PedidoPage } from '../pages/pedido/pedido';
import { ContaPage } from '../pages/conta/conta';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { EntrarPage } from '../pages/entrar/entrar';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { CurtoCafPage } from '../pages/curto-caf/curto-caf';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    EstabelecimentosPage,
    PedidoPage,
    ContaPage,
    TabsControllerPage,
    EntrarPage,
    CadastroPage,
    CurtoCafPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EstabelecimentosPage,
    PedidoPage,
    ContaPage,
    TabsControllerPage,
    EntrarPage,
    CadastroPage,
    CurtoCafPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
