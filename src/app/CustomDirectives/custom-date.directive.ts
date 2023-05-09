import { Directive, Input, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[data-rating]',
})
export class CustomDateDirective implements OnInit {
  @Input('data-rating') customData: any;
  constructor(private el: ElementRef) {}
  ngOnInit(): void {
    console.log(this.customData);
  }
}
