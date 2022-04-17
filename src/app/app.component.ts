import { Component, OnInit } from '@angular/core';
import { KeyValue } from '@angular/common';
import { LocalStorageService, ThemeService } from './core/services';
import FilmsJson from '../assets/films.json';
import { take } from 'rxjs/operators';

interface Film {
  title: string;
  poster: string;
  year: string;
  amount: number;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'film-list';

  navItems: KeyValue<string, string | any[]>[] = [
    { key: 'Homepage', value: 'home' },
    {
      key: 'Change view',
      value: [
        { key: 'List view', value: 'list' },
        { key: 'Tile view', value: 'tile' },
      ],
    },
  ];

  films: Film[] = FilmsJson;

  isDarkTheme = false;
  isTile = true;

  constructor(
    private themeService: ThemeService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.themeService.isDarkTheme.pipe(take(1)).subscribe((theme) => {
      this.isDarkTheme = theme;
    });
    this.getSavedView();
  }

  toggleDarkTheme(isDark: boolean): void {
    this.themeService.setDarkTheme(isDark);
    this.isDarkTheme = isDark;
    this.localStorage.set('theme', isDark);
  }

  onHomepageClick(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  onSelect(item: KeyValue<string, string>): void {
    this.isTile = item.value === 'tile';
    this.localStorage.set('view', item);
  }

  getClasses(): string {
    return `films ${this.isTile ? 'films-tile' : 'films-row'}`;
  }

  private getSavedView(): void {
    this.onSelect(this.localStorage.get('view'));
    this.isDarkTheme = this.localStorage.get('theme');
  }
}
