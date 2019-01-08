import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { FeedComponent } from './feed/feed.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { CategoryComponent } from './category/category.component';
import { ContactsComponent } from './contacts/contacts.component';

const appRoutes:Routes = [
  { path:'about', component:AboutComponent , data:{title: "Sobre"}},
  { path:'feed', component:FeedComponent , data:{title: "Feed" }},
  { path:'login', component:LoginComponent , data:{title:"Login" }},
  { path:'user', component:UserComponent, data:{title:"user" } },
  { path:'category', component:UserComponent, data:{title:"Categoria" } },
  { path:'contact', component:UserComponent, data:{title:"Contato" } }
]

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HeaderComponent,
    CategoryComponent,
    FeedComponent,
    LoginComponent,
    UserComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }