import { Component, Input, Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'app-rating',
    templateUrl: 'rating.component.html',
    styleUrls: ['assets/imgs/rating.component.scss'] //had to move here to get access
})

export class RatingComponent {
    @Input() rating: number;
    @Input() itemId: number;
    @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

    inputsName:string;
    ngOnInit() {
      this.inputsName = this.itemId + '_rating';
    }

    onClick(rating: number): void {
        this.rating = rating;
        this.ratingClick.emit({
            itemId: this.itemId,
            rating: rating
        });
    }

}
