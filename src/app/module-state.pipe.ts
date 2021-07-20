import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moduleState'
})
export class ModuleStatePipe implements PipeTransform {
  states : string[] = ['Reset', 'Manual','Automatic','Starting','Running', 'Stopping'];
  transform(value: number, ...args: unknown[]): string {
    return (value>=0)?this.states[value]:'Faulted';
  }

}
