import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector: '[appDocClick]'
})

export class DocumentClickDirective{
    constructor(private renderer: Renderer2, private elementRef: ElementRef){}

    @HostListener('document:click', ['$event']) toggle(event: Event){
      const dropdownMenu = this.renderer.nextSibling(this.elementRef.nativeElement);
      if(this.elementRef.nativeElement.contains(event.target)){
        this.renderer.addClass(dropdownMenu, 'show');
      } else{
        this.renderer.removeClass(dropdownMenu, 'show')
      }
    }
}
