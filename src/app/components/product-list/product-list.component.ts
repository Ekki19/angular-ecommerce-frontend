import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategroyId: number = 1;
  currentCategoryName: string = "";
  searchMode: boolean = false;
  searchKeyword: string = "";

  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 0;

  searchRequestSubscriptions: Subscription[] = [];

  previousKeyword: string = "";
  private unsubscribe$ = new Subject<void>();

  constructor(private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService) {
      //this.searchKeyword = "TEST";
     }

  ngOnInit() {
    console.log(this.products);
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProducts();
      console.log(this.searchMode, this.searchKeyword);
    } else {
      this.handleListProducts();
    }
  }
  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    if(this.previousKeyword != theKeyword){
      this.pageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, pageNumber=${this.pageNumber}`);

    this.searchKeyword = theKeyword;
    //search for the prodocuts using keyword
    this.productService.searchProductsPaginate(this.pageNumber - 1,
                                              this.pageSize,
                                              theKeyword).subscribe(this.processResult());

  }


  handleListProducts() {

    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    }
    else {
      // not category id available ... default to category id 1
      this.goBackToDefault();
      
    }

    //prüfe, ob es sich um eine neue Kategorie handelt als die davor
    //Grund dafür ist die Anpassung der PageNummer sowie totoalElements

    if(this.previousCategroyId != this.currentCategoryId){
      this.pageNumber = 1;
    }


    this.previousCategroyId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, pageNumber=${this.pageNumber}`);




    // now get the products for the given category id
    this.productService.getProductListPaginate(this.pageNumber - 1, 
                                               this.pageSize, 
                                               this.currentCategoryId)
                                              .subscribe(this.processResult());
  }


  updatePageSize(pageSize: string) {
    this.pageSize = +pageSize;
    this.pageNumber = 1;
    this.listProducts();
  }

  processResult(){
    return (data: any) => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    }
  }

  addToCart(product: Product) {
    console.log(`Adding to cart: ${product.name}, ${product.unitPrice}`)


    const cartItem = new CartItem(product);

    this.cartService.addToCart(cartItem);

  }

  onTextChange(changedText: string) {
    this.cancelPendingRequests();

    if(!changedText) {

      this.listProducts();

    }else{
      
      const productSubscription = this.productService
      .getResults(changedText)
      .pipe(takeUntil(this.unsubscribe$)).subscribe(
        data => {
          this.products = data;
        },
        errorResponse => {
          console.error(errorResponse);
        })

    this.searchRequestSubscriptions.push(productSubscription);
    }
  }

  cancelPendingRequests() {
    this.searchRequestSubscriptions.forEach(sub => sub.unsubscribe());
  }



  goBackToDefault() {
    this.currentCategoryId = 1;
    this.currentCategoryName = "Books";
    this.pageNumber = 1;
    this.pageSize = 5;
  }


}


