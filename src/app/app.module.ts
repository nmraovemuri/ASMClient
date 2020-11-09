import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FruitsComponent } from './fruits/fruits.component';
import { GroceryComponent } from './grocery/grocery.component';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { MyAddressComponent } from './my-address/my-address.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { OrderListComponent } from './order-list/order-list.component';
import { ShopComponent } from './shop/shop.component';
import { SingleComponent } from './single/single.component';
import { WishlistComponent } from './wishlist/wishlist.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    AboutComponent,
    FruitsComponent,
    GroceryComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    ContactComponent,
    FaqComponent,
    MyAddressComponent,
    MyprofileComponent,
    OrderListComponent,
    ShopComponent,
    SingleComponent,
    WishlistComponent       
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
