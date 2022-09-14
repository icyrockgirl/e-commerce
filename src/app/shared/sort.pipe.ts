import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'sort'
})

export class SortPipe implements PipeTransform{
    transform(value: any, propName: any) {
      if(propName == ''){
        return value
      }
      if(propName == 'h-to-l'){
        return value.sort((a,b) => {
          if(a.price > b.price){
            return -1
          }
        })
      }
      if(propName == 'l-to-h'){
        return value.sort((a,b) => {
          if(a.price < b.price){
            return -1
          }
        })
      }
    }
}
