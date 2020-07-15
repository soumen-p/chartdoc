import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'PrescriptionSearchFilter',
    pure : true
})
export class PrescriptionSearchFilter implements PipeTransform {
    /* transform(
        prescriptions: Prescriptions[], searchTerm: string): Prescriptions[] {
        if (!prescriptions || !searchTerm) {
            return prescriptions;
        }
        return prescriptions.filter(prescription =>
            prescription.DrugName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);

     */
        transform(items: any, filter: any, defaultFilter?: boolean): any {
        if (!filter) {
          return items;
        }
        if (!Array.isArray(items)) {
          return items;
        }
        if (filter && Array.isArray(items)) {
          const filterKeys = Object.keys(filter);
          if (defaultFilter) {
            return items.filter(item =>
                filterKeys.reduce((x, keyName) =>
                    (x && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] == '', true));
          } else {
            return items.filter(item => {
              return filterKeys.some((keyName) => {
                return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] == '';
              });
            });
          }
        }
      }
}
