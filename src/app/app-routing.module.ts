import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './login/login.component'
import { RegisterComponent} from './register/register.component'
import { NavigationComponent } from './navigation/navigation.component';
import { AboutComponent } from './about/about.component';
import { FruitsComponent } from './fruits/fruits.component';
import { GroceryComponent } from './grocery/grocery.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ShopComponent } from './shop/shop.component';
import { CartComponent} from './cart/cart.component';
import { CheckoutComponent} from './checkout/checkout.component';
import { ContactComponent} from './contact/contact.component';
import { FaqComponent} from './faq/faq.component';
import { MyAddressComponent} from './my-address/my-address.component'
import { MyprofileComponent} from './myprofile/myprofile.component';
import { OrderListComponent} from './order-list/order-list.component';
import { SingleComponent} from './single/single.component';
import { WishlistComponent} from './wishlist/wishlist.component';
import { AuthGuard} from './auth.guard';
import { LogoutComponent} from './logout/logout.component';
import { Navigation2Component} from './navigation2/navigation2.component'


const routes: Routes = [
  {
    path :'',
    component : HomeComponent
    // pathMatch : 'full'
  },
  {
    path : 'register',
    component : RegisterComponent
  },
  {
    path :'login',
    component : LoginComponent
  },
  {
    path : 'logout',
    component : LoginComponent
  },
  {
    path : 'nav',
    component :NavigationComponent
  },
  {
    path : 'home',
    component: HomeComponent,
    pathMatch : 'prefix'
 },
  {
    path : 'about',
    component : AboutComponent,
    canActivate : [AuthGuard]
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
    path : 'shop/:cat/:subcat/:id',
    // children :[
    //   {
    //     path : '**',
    //     
    //   }
    // ],    
    component : ShopComponent,        
    pathMatch : 'prefix'
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
  { path : 'single/:pid/:unit_value', component : SingleComponent },
  {
    path : 'wishlist',
    component : WishlistComponent
  },
  // {
  //   path : 'nav2',
  //   component : Navigation2Component
  // }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
