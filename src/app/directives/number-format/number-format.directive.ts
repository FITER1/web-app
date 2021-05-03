import { Directive, OnInit, forwardRef, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Directive({
  selector: '[mifosxNumberFormatDirective]'
})
export class NumberFormatDirective implements OnInit {
  currencyChars = new RegExp('[\.,]', 'g'); // we're going to remove commas and dots

  constructor(public el: ElementRef, public renderer: Renderer2, private decimalPipe: DecimalPipe) {}

  ngOnInit() {
    this.format(this.el.nativeElement.value); // format any initial values
  }

  @HostListener('input', ['$event.target.value']) onInput(e: string) {
    this.format(e);
  };

  @HostListener('paste', ['$event']) onPaste(event: ClipboardEvent) {
    event.preventDefault();
    this.format(event.clipboardData.getData('text/plain'));
  }

  format(nStr: string) {

    nStr += '';
    const comma = /,/g;
    nStr = nStr.replace(comma,'');
    const x = nStr.split('.');
    let x1 = x[0];
    const x2 = x.length > 1 ? '.' + x[1] : '';
    const rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    const numberFormat =  x1 + x2;
    this.renderer.setProperty(this.el.nativeElement, 'value', numberFormat);
  }

}
