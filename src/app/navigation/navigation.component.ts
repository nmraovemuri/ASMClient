import { Component, OnInit, ViewChild } from '@angular/core';
import {ASMService} from '../asm.service';
import {Router,RouterModule} from '@angular/router'
import { CartService } from '../cart.service';
import { ASMCustomerService} from '../asmCustomer.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers :[ASMService]
})
export class NavigationComponent implements OnInit {
  user:any={};
  loginData:any={};
  l :string;  
  customer :any; 
  categories: any;
  subcategories: any;  
  cat_subcat : any;
  cartList: [];
  showModal:boolean = true;
  showSideCart: boolean = false;
  customerLoginData: any;
  searchString : any = '';
  locationList : any = [ 'Balangar', 'Chintal', 'Jagdigirigutta', 'Pragathi Nagar', 'Jeedimetla', 'Suchitra', 'Shapur', 'Gandi Misamma', 'Kompally']
  constructor(public asmService:ASMService, 
              private asmCustomerService:ASMCustomerService,
              private router:Router,
              public cartService: CartService){}

  ngOnInit(): void {
    this.getAllCategories();
    // this.getSubcategories();
    // this.init();
  }
  init(){
    this.categories = this.asmService.getCategories();    
    this.subcategories = this.asmService.getSubcategories();
    this.cat_subcat = this.asmService.getCatSubcat();
  }

  userRegister(user){
    console.log("the data value",user.value);
    this.asmService.createUser(user.value).subscribe((data)=>{
      console.log("user data is added:",data);
    })
  }
   
  userlogin(loginData){
    // console.log("User login data:",loginData.value);
     this.asmCustomerService.userLogin(loginData.value).subscribe((data:any)=>{
      console.log("data:",data);
      this.customerLoginData = data;
       console.log("status data:", this.customerLoginData.status);
      console.log("customer:", this.customerLoginData.customer);
      console.log("Token:", this.customerLoginData.token);
      if(data.status == "success"){
        this.asmCustomerService.setCustomerInfo(data.customer,data.token);

       localStorage.setItem('customer', this.customerLoginData.customer.first_name);
       localStorage.setItem('token', this.customerLoginData.token);
       this.router.navigate([`/cart`]);     
      }
       
     },
    error => {
      console.log(error);
    })
  }
  loggedIn(){
    this.l = this.asmCustomerService.getToken();
    return this.l;
  }
  
  onLogout(){
    // localStorage.removeItem('username');
    localStorage.removeItem('customer');
    localStorage.removeItem('token'); 
    this.asmCustomerService.setCustomerInfo(null, null);
    this.router.navigate([`/home`]);
  }
  getAllCategories()
  {
     this.asmService.getAllCategories().subscribe((result:any)=>{
     //console.log("Allcategoires Data:", data);
     if( result && result.status == "success"){
        this.categories = result.data;        
        this.asmService.setCategories(result.data);
        this.getSubcategories();
        console.log("asmService-navigation:",this.asmService.getCategories());
        console.log("Allcategoires Data:", this.categories);
      }      
    },
    error => {
      console.log(error);
    })
  }
  getSubcategories(){
    this.asmService.getAllSubCategories().subscribe((result:any)=>{
    //console.log("All SubCategories:",data);
    this.subcategories = result.data;
    this.asmService.setSubcategories(this.subcategories);
    console.log("All SubCategories:",this.subcategories);
    this.cat_subcat = this.categories.map(cat=>{
      let  subcat = this.subcategories.filter(subcat=> subcat.category_name ===cat.category_name);
      // console.log(subcat);
      cat.subCategories = subcat;
      // JSON.parse
      return cat;
    }, this.asmService.setCatSubcat(this.cat_subcat))
    console.log("cat_subcat:",this.cat_subcat);
    },
    error => {
      console.log(error);
    })
  }
  getCartList(){
    this.cartList = this.cartService.getCartList();
    console.log("nav cart clicked : ",this.cartList)
  }

  searchProducts(){
    console.log("search String : ",this.searchString);
    console.log("search String : ",this.searchString.length);
    if(this.searchString.length == 0) 
      return
    else{
      let searchString = this.searchString.replace(/ /g, '');
      if(searchString.length == 0) 
        return
    }
    this.router.navigate([`/search/`+this.searchString]);

  }
  
  toggleSideCart(){
    this.showSideCart = !this.showSideCart;
    console.log("showSideCart=", this.showSideCart)
  }
  viewCartPage(){
    this.showSideCart = !this.showSideCart;
    this.router.navigate([`/cart`]); 
  }
 
}
