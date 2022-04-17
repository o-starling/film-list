import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  get(key: string): any {
    return JSON.parse(localStorage.getItem(`${key}`));
  }

  set(key: string, value: any): void {
    localStorage.setItem(`${key}`, JSON.stringify(value));
  }
}
