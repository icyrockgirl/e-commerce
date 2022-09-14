import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform{
    transform(value: any, propName: string) {
      if(propName == 'All'){
        return value
      }
      let returnArr = [];
        for(let item of value){
          if(item['category'] == propName){
             returnArr.push(item)
          }
        }
        return returnArr
    }
}
