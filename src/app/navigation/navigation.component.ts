import { Component, OnInit } from '@angular/core';
import {AboutService} from './../about.service';
import {Router,RouterModule} from '@angular/router'


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers :[AboutService]
})
export class NavigationComponent implements OnInit {
  user:any={};
  loginData:any={};
  l :string;  
  username = localStorage.getItem("username");
  subcategories: any;
  categories: any;
  cat_subcat : any;

    
  constructor(private aserv:AboutService,private router:Router){}

  ngOnInit(): void {
    this.getAllCategories();
   this.getSubcategories();
  }
  userRegister(user){
    console.log("the data value",user.value);
    this.aserv.createUser(user.value).subscribe((data)=>{
      console.log("user data is added:",data);
    })
  }
  userlogin(loginData){
   // console.log("User login data:",loginData.value);
    this.aserv.userLogin(loginData.value).subscribe((data)=>{
     console.log("prsent user login data is :", data);
    //  console.log("token",data.token)
     // localStorage.setItem('token',data.token);
      this.router.navigate["home"];
    //  let token = localStorage.getItem('token');
    //  console.log("Token:",token);
    })
  }
  loggedIn()
  {
    this.l = this.aserv.getToken();
    return this.l;
  }
  onLogout()
  {
    localStorage.removeItem('username');
    localStorage.removeItem('emailID');
    localStorage.removeItem('token'); 
    this.router.navigate([`/home`]);
  }
  getAllCategories()
  {
    this.aserv.getAllCategories().subscribe((result:any)=>{
   //   console.log("Allcategoires Data:", data);
      if( result && result.status == "success")
      {
         this.categories = result.data;
         console.log("Allcategoires Data:", this.categories);
      }
  
      
    })
  }
  getSubcategories(){
    this.aserv.getAllSubCategories().subscribe((result:any)=>{
 //     console.log("All SubCategories:",data);
      this.subcategories = result.data;
      console.log("All SubCategories:",this.subcategories);
      this.cat_subcat = this.categories.map(cat=>{
      let  subcat = this.subcategories.filter(subcat=> subcat.category_name ===cat.category_name);
        // console.log(subcat);
        cat.subCategories = subcat;
        // JSON.parse
        return cat;
    })
    console.log("cat_subcat:",this.cat_subcat);
    })
  }

}
