import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
    selector: 'components-increaser',
    templateUrl: './increaser.component.html',
    styleUrl: './increaser.component.css',
})
export class IncreaserComponent implements OnInit {
    @Input('value') progress: number = 50;
    @Input() btnClass: string = 'btn-primary';

    @Output() progressChange: EventEmitter<number> = new EventEmitter();

    ngOnInit(): void {
        this.btnClass = `btn ${this.btnClass}`;
    }

    changeValue(value: number) {
        if (this.progress >= 100 && value > 0) {
            this.progress = 100;
            this.progressChange.emit(100);
            return;
        }

        if (this.progress <= 0 && value < 0) {
            this.progress = 0;
            this.progressChange.emit(0);
            return;
        }

        this.progress = this.progress + value;

        this.progressChange.emit(this.progress);
    }

    onChange(newValue: number) {
        if (newValue >= 100) {
            this.progress = 100;
        } else if (newValue <= 0) {
            this.progress = 0;
        } else {
            this.progress = newValue;
        }

        // Set updated value
        this.progressChange.emit(this.progress);
    }
}
