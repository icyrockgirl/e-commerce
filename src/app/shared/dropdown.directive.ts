import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective{
    constructor(private renderer: Renderer2, private elementRef: ElementRef){}

    @HostListener('click') onClick(){
      const dropdownMenu = this.renderer.nextSibling(this.elementRef.nativeElement);
      if(dropdownMenu.classList.contains('show')){
        this.renderer.removeClass(dropdownMenu, 'show');
      } else{
      this.renderer.addClass(dropdownMenu, 'show');
      }
    }

}
