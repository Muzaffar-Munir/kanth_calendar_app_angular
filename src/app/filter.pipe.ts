import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filtertext'
})
export class FilterPipe implements PipeTransform {
  transform(listOfNames: string[], nameToFilter: string): string[] {
    if (!listOfNames) return null;
    if (!nameToFilter) return listOfNames;
    console.log(listOfNames);
    console.log(nameToFilter);
    return listOfNames.filter(n => n.toString().indexOf(nameToFilter) >= 0);
  }
}
