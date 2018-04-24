import {Component, ContentChild, forwardRef, Inject, Input, TemplateRef} from '@angular/core';

@Component({
    selector: 'accordion',
    templateUrl: './accordion.component.html',
    styleUrls:['./accordion.component.scss']
})
export class AccordionComponent { 

    styleClass: any;
    
    public header: AccordionHeaderComponent;
    @Input() public isOpen:boolean = false;

    setHeader(header: AccordionHeaderComponent) {
        this.header = header;
    }
    toggle() {
        this.isOpen = !this.isOpen;  
    }
}

@Component({
    selector: 'accordion-header',
    template: '',
    styleUrls:['./accordion.component.scss']
})
export class AccordionHeaderComponent {

    @Input() key;
    @Input() header;
    @Input() width;
    @Input() fixedWidth;
    @Input() minWidth;
    @Input() headerWidth;
    @ContentChild(TemplateRef) template: TemplateRef<any>;

    constructor(@Inject(forwardRef(() => AccordionComponent)) public accordion: AccordionComponent) {
        accordion.setHeader(this);
    }
}