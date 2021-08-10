import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BioComponent } from './bio/bio.component';
import { WorkComponent } from './work/work.component';
import { ContactComponent } from './contact/contact.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    BioComponent,
    WorkComponent,
    ContactComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: '', component: HomepageComponent},
      {path: 'home', component: HomepageComponent},
      {path: 'bio', component: BioComponent},
      {path: 'work', component: WorkComponent},
      {path: 'contact', component: ContactComponent}
    ], {useHash: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
