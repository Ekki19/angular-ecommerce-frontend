import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { LocationMemoryService } from 'src/app/page-memory/location-memory.service';

import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {



  product!: Product;
  lastRoute: string | null = "";


  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: CartService,
              private router: Router,
              private memoryService: LocationMemoryService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }
  handleProductDetails() {
    this.lastRoute = this.memoryService._lastRoute;
    const productId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(productId).subscribe(
      data => {
        this.product = data;
      }
    )

  }

  addToCart(){

    console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`)

    const cartItem = new CartItem(this.product);

    this.cartService.addToCart(cartItem);


  }

  goBackToCartDetails() {
    console.log(`LocationMemory GetLastRoute variable: ${this.memoryService._lastRoute} vs get Method: ${this.memoryService.getLastRoute()}`)
    this.router.navigateByUrl(`${this.memoryService._lastRoute}`);
  }
  

  

}
