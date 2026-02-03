import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Movie {
  id: number;
  title: string;
  description?: string;
  poster_url?: string;
  age_rating?: number;
  status: string;
  duration?: number;
  genre?: string;
  release_date?: string;
  showtimes?: Showtime[];
}

export interface Showtime {
  id: number;
  movie_id: number;
  showtime: string;
  hall?: string;
  format?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'http://127.0.0.1:8000/api/movies';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl);
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }
}
