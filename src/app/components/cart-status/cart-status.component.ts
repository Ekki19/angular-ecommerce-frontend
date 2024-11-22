import { Component, OnInit } from '@angular/core';
import { LocationMemoryService } from 'src/app/page-memory/location-memory.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {


  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: CartService,
              private memoryService: LocationMemoryService
  ) { }

  ngOnInit(): void {
    this.updateCartStatus();
    this.memoryService.register();

  }
  updateCartStatus() {
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }

}
