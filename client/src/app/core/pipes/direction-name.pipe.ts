import { Pipe, PipeTransform } from '@angular/core';
import { WindDirection } from '../models/theme';

@Pipe({
  name: 'directionName',
  standalone: true
})
export class DirectionNamePipe implements PipeTransform {

  transform(direction:string): string {
    let retval='';

    switch (direction) {
      case 'N':
        retval = WindDirection.N;
        break;
        case 'NNE':
        retval = WindDirection.NNE;
        break;
        case 'NE':
        retval = WindDirection.NE;
        break;
        case 'ENE':
        retval = WindDirection.ENE;
        break;
        case 'E':
        retval = WindDirection.E;
        break;
        case 'ESE':
        retval = WindDirection.ESE;
        break;
        case 'SE':
        retval = WindDirection.SE;
        break;
        case 'SSE':
        retval = WindDirection.SSE;
        break;

      default:
        break;
    }



    return retval;

  }

}
