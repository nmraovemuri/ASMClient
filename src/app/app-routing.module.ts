import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { FruitsComponent } from './fruits/fruits.component';
import { GroceryComponent } from './grocery/grocery.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import {ShopComponent} from './shop/shop.component';
import {CartComponent} from './cart/cart.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {ContactComponent} from './contact/contact.component';
import {FaqComponent} from './faq/faq.component';
import {MyAddressComponent} from './my-address/my-address.component'
import {MyprofileComponent} from './myprofile/myprofile.component';
import {OrderListComponent} from './order-list/order-list.component';
import {SingleComponent} from './single/single.component';
import {WishlistComponent} from './wishlist/wishlist.component';

const routes: Routes = [
  {path : 'home',
  component: HomeComponent
 },
  {
    path : 'about',
    component : AboutComponent
  },
  {
    path : 'fruits',
    component: FruitsComponent
  },
  {
    path : 'grocery',
    component : GroceryComponent
  },
  {
    path : 'footer',
    component : FooterComponent
  },
  {
    path : 'shop',
    component : ShopComponent
  },
  {
    path : 'cart',
    component : CartComponent
  },
  {
    path : 'checkout',
    component : CheckoutComponent
  },
  {
    path : 'contact',
    component : ContactComponent
  },
  {
    path : 'faq',
    component : FaqComponent
  },
  {
    path : 'myaddress',
    component : MyAddressComponent
  },
  {
    path : 'myprofile',
    component : MyprofileComponent
  },
  {
    path : 'orderlist',
    component : OrderListComponent
  },
  {
    path : 'single',
    component : SingleComponent
  },
  {
    path : 'wishlist',
    component : WishlistComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
