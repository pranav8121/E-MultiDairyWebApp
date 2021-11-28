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
    if (string == "NaN" || !string) {
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
    if (date.slice(0, 2) == "32") {
      return `31/${date.slice(3, date.length)}`
    }
    if (date.slice(0, 2) == "31") {
      return `30/${date.slice(3, date.length)}`
    }
    if (date.slice(0, 2) == "21") {
      return `20/${date.slice(3, date.length)}`
    }
     if (date.slice(0, 2) == "11") {
      return `10/${date.slice(3, date.length)}`
    }
    else return date
  }

}