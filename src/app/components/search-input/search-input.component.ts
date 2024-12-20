import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.css']
})
export class SearchInputComponent implements OnInit, OnDestroy {


  @Input() initalValue: string = '';
  @Input() debounceTime = 300;

  @Output() textChange = new EventEmitter<string>();

  inputValue = new Subject<string>();
  trigger = this.inputValue.pipe(
    debounceTime(this.debounceTime),
    distinctUntilChanged()
  );


  subscriptions: Subscription[] = [];

  constructor() { }

  ngOnInit(): void {
    const subscription = this.trigger.subscribe(
      currentValue => {
        this.textChange.emit(currentValue);
      });
      this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onInput(e: any) {
    this.inputValue.next(e.target.value);
  }



}
