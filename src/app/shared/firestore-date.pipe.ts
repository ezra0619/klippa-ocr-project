import {formatDate} from '@angular/common';
import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'firestoreDate'
})
export class FirestoreDatePipe implements PipeTransform {

    constructor(@Inject(LOCALE_ID) private locale: string) {
    }

    transform(timestamp, format?: string): string {
        if (!timestamp?.toDate) {
            // do nothing;
        }
        return formatDate(timestamp.toDate(), format || 'medium', this.locale);
    }
}