import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TimeValidatorService {
    departureTimeValidator(baseDateTime: Date): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const departureDateTime: Date = new Date(control.value);
      
      // Calculate the difference in milliseconds
      const timeDiffMilliseconds: number = departureDateTime.getTime() - baseDateTime.getTime();
      
      // Convert milliseconds to hours
      const timeDiffHours: number = timeDiffMilliseconds / (1000 * 60 * 60);
      
      // Check if the difference is less than 2 hours
      if (timeDiffHours < 2) {
        return { 'departureTooEarly': true };
      }
      
      return null; // Return null if validation passes
    };
  }
}
