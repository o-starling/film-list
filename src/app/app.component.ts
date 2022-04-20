import { Component, OnInit, TemplateRef } from '@angular/core';
import { KeyValue } from '@angular/common';
import { LocalStorageService, ThemeService } from './core/services';
import FilmsJson from '../assets/films.json';
import { take } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

interface Film {
  title: string;
  poster: string;
  year: string;
  amount: number;
  actors: string[];
  description: string;
  date: number;
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
    { key: 'Click to add your favorite films', value: 'add' },
    {
      key: 'Sort',
      value: [
        { key: 'By name', value: 'name' },
        { key: 'By year', value: 'year' },
        { key: 'By creation date', value: 'date' },
      ],
    },
    {
      key: 'Change view',
      value: [
        { key: 'List view', value: 'list' },
        { key: 'Tile view', value: 'tile' },
      ],
    },
  ];

  films: Film[] = FilmsJson;
  tempFilms: Film[] = [];

  isDarkTheme = false;
  isTile = true;
  filmForm: FormGroup;
  isSubmitted = false;

  constructor(
    private themeService: ThemeService,
    private localStorage: LocalStorageService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.tempFilms = this.films;
    this.themeService.isDarkTheme.pipe(take(1)).subscribe((theme) => {
      this.isDarkTheme = theme;
    });
    this.getSavedView();
    this.buildForm();
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
    if (item.value === 'list' || item.value === 'tile') {
      this.isTile = item.value === 'tile';
      this.localStorage.set('view', item);
    } else {
      this.sortItems(item.value);
    }
  }

  getClasses(): string {
    return `films ${this.isTile ? 'films-tile' : 'films-row'}`;
  }

  private getSavedView(): void {
    this.onSelect(this.localStorage.get('view'));
    this.isDarkTheme = this.localStorage.get('theme');
  }

  openDialog(myTemplate: TemplateRef<any>): void {
    this.isSubmitted = false;
    this.dialog.open(myTemplate, {
      width: '500px',
    });
  }

  addFilm(): void {
    const data = {
      ...this.filmForm.value,
      date: Date.parse(new Date().toString()),
    };

    this.isSubmitted = true;
    if (this.filmForm.valid) {
      this.dialog.closeAll();
      this.films = this.tempFilms = [...this.films, data];
      this.filmForm.reset();
    }
  }

  deleteFilm(film: Film): void {
    this.films = this.tempFilms = this.films.filter((el) => el !== film);
  }

  private buildForm(): void {
    this.filmForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      poster: new FormControl(null, Validators.required),
      year: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
      actors: new FormArray([
        new FormControl(null, Validators.required),
        new FormControl(null),
        new FormControl(null),
      ]),
      description: new FormControl(null, Validators.required),
    });
  }

  get actors(): FormArray {
    return this.filmForm.get('actors') as FormArray;
  }

  getSantizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  sortItems(type: string): void {
    const sortFunc = {
      name: (a, b) => (a.title > b.title ? 1 : -1),
      year: (a, b) => a.year - b.year,
      date: (a, b) => a.date - b.date,
    };
    this.films.sort(sortFunc[type]);
  }

  onSearch(value: string): void {
    if (!value) {
      this.films = this.tempFilms;
    } else {
      this.films = this.films.filter((el) =>
        el.title.toLocaleLowerCase().includes(value.toLowerCase())
      );
    }
  }
}
