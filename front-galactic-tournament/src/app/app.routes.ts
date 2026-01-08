import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Ranking } from './pages/ranking/ranking';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'ranking', component: Ranking },
  { path: '**', redirectTo: '' },
];
