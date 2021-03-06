import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { RestF } from "./services/restF";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { HeaderComponent } from './header/header.component';
import { FeedComponent } from './feed/feed.component';
import { LoginComponent } from './login/login.component';
import { CategoryComponent } from './category/category.component';
import { ContactsComponent } from './contacts/contacts.component';
import { SearchComponent } from './header/search/search.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './header/carousel/carousel.component';
import { HomeComponent } from './home/home.component';
import { PostSinglePageComponent } from './post-single-page/post-single-page.component';


const appRoutes:Routes = [
  { path:'post/:id', component:PostSinglePageComponent , data:{title: "Post"}},
  { path:'about', component:AboutComponent , data:{title: "Sobre"}},
  { path:'feed', component:FeedComponent , data:{title: "Feed" }},
  { path:'login', component:LoginComponent , data:{title:"Login" }},
  { path:'', component:HomeComponent , data:{title:"Home" }},
]

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HeaderComponent,
    CategoryComponent,
    FeedComponent,
    LoginComponent,
    ContactsComponent,
    SearchComponent,
    FooterComponent,
    CarouselComponent,
    HomeComponent,
    PostSinglePageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    RestF,HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

 }