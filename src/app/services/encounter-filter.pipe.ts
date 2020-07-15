import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'encounterFilter'
})
export class EncounterFilterPipe implements PipeTransform {

  transform(items: Array<any>, searchText: string): any {
    if (searchText) {
      return items.filter(item => {
          const filter = Object.keys(item);
          // Array.some() returns true if at least one entry meets the given condition
          return filter.some(
              key => item[key].toLowerCase().indexOf(searchText.toLowerCase()) !== -1
          );
      });
    }
    return items;
  }

}
