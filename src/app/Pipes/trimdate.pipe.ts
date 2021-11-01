import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimdate'
})
export class TrimdatePipe implements PipeTransform {

  transform(date: any): any {
    if (date.length > 5) {
      return date.slice(0, 5)
    }
  }

}



@Pipe({
  name: 'trimhours'
})
export class TrimdateHours implements PipeTransform {

  transform(hours: any): any {
    if (hours == "संध्याकाळ") {
      return "संध्या"
    }
    else return hours
  }

}

@Pipe({
  name: 'ReplaceNan'
})
export class ReplaceNan implements PipeTransform {

  transform(string: any): any {
    if (string=="NaN" || !string ) {
      return "-"
    }
    else return string
  }

}


@Pipe({
  name: 'ReplaceDate'
})
export class ReplaceDate implements PipeTransform {

  transform(date: any): any {
    if (date=="32/11/2021") {
      return "31/11/2021"
    }
    else return date
  }

}