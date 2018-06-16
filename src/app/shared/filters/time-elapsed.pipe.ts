/**
 * Created by davidherod on 3/2/17.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'timeElapsedAsText'})
export class TimeElapsedAsTextPipe implements PipeTransform {
    transform(time: number): string {
        const minutes = 60;
        const hours = 3600;
        const days = 86400;

        const currentTime = new Date();
        time = currentTime.getTime() - time;
        time = time / 1000;

        if (time < minutes) {
            return Math.floor(time) + ' seg';
        } else if (time < hours) {
            return Math.floor(time / minutes) + ' min';
        } else if (time < days) {
            return Math.floor(time / hours) + ' hr';
        } else {
            return Math.floor(time / days) + ' dias';
        }
    }
}
