import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'actuatorState'
})
export class ActuatorStatePipe implements PipeTransform {
  states :string[] = ['Reset','Home','Work','Active'];
  transform(value: number, ...args: unknown[]): string {
    return (value>=0)?this.states[value]:'Faulted';
  }

}
