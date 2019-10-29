import {Directive, Input} from '@angular/core';

@Directive({
    selector: '[nsStickyHeader]'
})
export class StickyHeaderDirective {
    @Input() listData;

    constructor() {
    }

}
