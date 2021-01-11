import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { AboutService } from '../about.service';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private aServ : AboutService) { }
  pid : any;
  product : any = {
              description_fst: "abc",
              description_snd: "xyz",
              id: 1763,
              price: 0,
              product_img: "assets/images/products/200/salted_puffed_rice.png?v=123",
              product_name: "ASWKA MARMUR SALT",
              unit_type: "pc",
              unit_value: "1",
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.pid = params.pid; 
      console.log("P-ID :", this.pid);
     this.pid =  this.pid.substr(0, this.pid.indexOf("?"))

     // this.product = this.aServ.getProduct(this.pid);
     // console.log("Product Data:", this.product);
      
  });

  
  }

}
