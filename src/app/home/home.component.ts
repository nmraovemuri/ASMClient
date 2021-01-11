import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AboutService} from '../about.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
 ProductsData = [{
  "title": "Brown eggs",
  "type": "dairy",
  "description": "Raw organic brown eggs in a basket",
  "filename": "0.jpg",
  "height": 600,
  "width": 400,
  "price": 28.1,
  "rating": 4,
  "image" : '../assets/img/item/1.jpg'
}, {
  "title": "Sweet fresh stawberry",
  "type": "fruit",
  "description": "Sweet fresh stawberry on the wooden table",
  "filename": "1.jpg",
  "height": 450,
  "width": 299,
  "price": 29.45,
  "rating": 4,
  "image" : '../assets/img/item/1.jpg'
}, {
  "title": "Asparagus",
  "type": "vegetable",
  "description": "Asparagus with ham on the wooden table",
  "filename": "2.jpg",
  "height": 450,
  "width": 299,
  "price": 18.95,
  "rating": 3,
  "image" : '../assets/img/item/1.jpg'
}, {
  "title": "Green smoothie",
  "type": "dairy",
  "description": "Glass of green smoothie with quail egg's yolk, served with cocktail tube, green apple and baby spinach leaves over tin surface.",
  "filename": "3.jpg",
  "height": 600,
  "width": 399,
  "price": 17.68,
  "rating": 4,
  "image" : '../assets/img/item/1.jpg'
}, {
  "title": "Raw legums",
  "type": "vegetable",
  "description": "Raw legums on the wooden table",
  "filename": "4.jpg",
  "height": 450,
  "width": 299,
  "price": 17.11,
  "rating": 2,
  "image" : '../assets/img/item/1.jpg'
}]
  categories:Array<any>;
  constructor(private router: Router,private aserv : AboutService) { 
    this.categoriesList();
  }
  
  ngOnInit(): void {
    
  }
  singleProduct(){
    console.log("this.router.navigate(['update', id]) ");
    this.router.navigate(['single']);
    
  }
categoriesList(){
  this.aserv.getAllCategories().subscribe((result:any)=>{        
    console.log("categories list :",result.data);
    this.categories = result.data;
   // console.log("categories list :",this.categories);
  })
  
}
}
