import { Injectable,Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'placeholder',
})

export class PlaceholderPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    return value.toLowerCase();
  }
}
