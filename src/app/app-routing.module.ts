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
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { SignupActivationComponent } from './signup-activation/signup-activation.component';
import { SignupStatusComponent } from './signup-status/signup-status.component';
import { ResetPasswordComponent} from './reset-password/reset-password.component'
import { ChangeUserPasswordComponent } from './change-user-password/change-user-password.component';
import { ForgotPasswordStatusComponent } from './forgot-password-status/forgot-password-status.component';
import { ResetPasswordStatusComponent } from './reset-password-status/reset-password-status.component';
import { SearchComponent } from './search/search.component';
import { TopDealsoftheDayComponent } from './top-dealsofthe-day/top-dealsofthe-day.component';
import { BrandedProductsComponent } from './branded-products/branded-products.component';
import { SitemapComponent } from './sitemap/sitemap.component';
import { TermConditionsComponent } from './term-conditions/term-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { RefundComponent } from './refund/refund.component';


const routes: Routes = [
  {
    path :'',
    component : HomeComponent
    // pathMatch : 'full'
  },
  {
    path : 'home',
    component: HomeComponent,
   // pathMatch : 'prefix'
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
    path : 'my-address',
    component : MyAddressComponent
  },
  {
    path : 'my-profile',
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
  {
    path: 'forgot-password',
    component : ForgotPasswordComponent
  },
  {
    path : 'change-password',
    component : ChangePasswordComponent
  },   
  {
    path : 'signup-status',
    component : SignupStatusComponent
  },
  {
    path : 'signup-activation-status',
    component :SignupActivationComponent,  
  },
  {
    path : 'customer_reset_password/:customer_id',
    component :ResetPasswordComponent,
  },
  {
    path : 'change_password',
    component :ChangeUserPasswordComponent,         
     
  },
  {
    path : 'forgot-password-status',
    component : ForgotPasswordStatusComponent,
  },
  {
    path : 'reset_password_status',
    component : ResetPasswordStatusComponent,
  },
  {
    path : 'search/:search_string',
    component : SearchComponent,
  },
  {
    path : 'top_deals_of_the_day',
    component : TopDealsoftheDayComponent
  },
  {
    path : 'branded_products/:product_brand',
    component : BrandedProductsComponent
  },
  {
     path: 'sitemap',
     component : SitemapComponent
  },
  {
    path : 'terms_&_conditions',
    component : TermConditionsComponent
  },
  {
    path : 'privacy_&_policy',
    component : PrivacyPolicyComponent
  },
  {
    path : 'refund_&_policy',
    component : RefundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
