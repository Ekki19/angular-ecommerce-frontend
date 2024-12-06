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
  lastRoute: string | null = null;


  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private cartService: CartService,
              public memoryService: LocationMemoryService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
    this.lastRoute = this.memoryService.getLastRoute();
  }
  handleProductDetails() {

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
    if (this.lastRoute) {
      this.router.navigateByUrl('/cart-details');
    }
    console.log(`lastRoute: ${this.lastRoute}`);
  }
  

  

}
