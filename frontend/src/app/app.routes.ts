import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JegyarakComponent } from './jegyarak/jegyarak.component';
import { TermeberlesComponent } from './teremberles/teremberles.component';
import { MediaajanlatComponent } from './mediaajanlat/mediaajanlat.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'jegyarak', component: JegyarakComponent },
  { path: 'teremberles', component: TermeberlesComponent },
  { path: 'mediaajanlat', component: MediaajanlatComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: '**', redirectTo: '' }
];
