import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MovieService, Movie } from '../services/movie.service';

interface TmdbMovie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
  original_language?: string;
  runtime?: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  currentMovies: Movie[] = [];
  comingSoonMovies: Movie[] = [];
  loading = true;
  searchText = '';
  
  // Slider properties
  sliderMovies: TmdbMovie[] = [];
  currentSlideIndex = 0;
  sliderInterval: any;
  
  // Date selection
  selectedDate: string = 'ma';
  weeklySchedule = [
    {
      date: 'Január 30.',
      dayName: 'Ma (Péntek)',
      movies: [] as any[]
    },
    {
      date: 'Január 31.',
      dayName: 'Holnap (Szombat)',
      movies: [] as any[]
    },
    {
      date: 'Február 1.',
      dayName: 'Vasárnap',
      movies: [] as any[]
    },
    {
      date: 'Február 6.',
      dayName: 'Péntek (Premier)',
      movies: [] as any[]
    },
    {
      date: 'Február 7.',
      dayName: 'Szombat',
      movies: [] as any[]
    },
    {
      date: 'Február 8.',
      dayName: 'Vasárnap',
      movies: [] as any[]
    },
    {
      date: 'Február 12.',
      dayName: 'Csütörtök (Premier)',
      movies: [] as any[]
    }
  ];

  constructor(
    private movieService: MovieService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Only load from TMDB, not from Laravel backend
    // this.loadMovies(); // Commented out - using TMDB API instead
    this.loadSliderMovies();
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    if (this.sliderInterval) {
      clearInterval(this.sliderInterval);
    }
  }

  loadMovies(): void {
    this.movieService.getMovies().subscribe({
      next: (movies) => {
        console.log('Movies loaded:', movies);
        this.currentMovies = movies.filter(m => m.status === 'current');
        this.comingSoonMovies = movies.filter(m => m.status === 'coming_soon');
        console.log('Current movies:', this.currentMovies.length);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading movies:', error);
        this.loading = false;
      }
    });
  }

  loadSliderMovies(): void {
    // TMDB API - ingyenes, de API kulcs kell: https://www.themoviedb.org/settings/api
    const apiKey = '3fd2be6f0c70a2a598f084ddfb75487c'; // Demo API key
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=hu-HU&page=1`;
    
    this.http.get<{ results: TmdbMovie[] }>(url).subscribe({
      next: (response) => {
        console.log('TMDB Response:', response);
        this.sliderMovies = response.results || [];
        console.log('Slider movies loaded:', this.sliderMovies.length);
        // Generáljuk a heti műsort miután betöltődtek a filmek
        this.generateWeeklySchedule();
      },
      error: (error) => {
        console.error('Error loading slider movies:', error);
        // Fallback: használjuk a saját filmjeinket
        this.sliderMovies = this.currentMovies.map(m => ({
          id: 0,
          title: m.title,
          poster_path: m.poster_url || '',
          backdrop_path: '',
          overview: m.description || '',
          vote_average: 7.5,
          release_date: m.release_date || ''
        })) as any;
      }
    });
  }

  startAutoSlide(): void {
    this.sliderInterval = setInterval(() => {
      this.nextSlide();
    }, 3000); // 3 másodpercenként vált
  }

  nextSlide(): void {
    if (this.sliderMovies.length === 0) return;
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.sliderMovies.length;
  }

  prevSlide(): void {
    if (this.sliderMovies.length === 0) return;
    this.currentSlideIndex = this.currentSlideIndex === 0 
      ? this.sliderMovies.length - 1 
      : this.currentSlideIndex - 1;
  }

  goToSlide(index: number): void {
    this.currentSlideIndex = index;
    // Restart auto-slide timer
    if (this.sliderInterval) {
      clearInterval(this.sliderInterval);
      this.startAutoSlide();
    }
  }

  getSliderTransform(): string {
    const itemWidth = 220; // 200px + 20px gap
    return `translateX(-${this.currentSlideIndex * itemWidth}px)`;
  }

  getPosterUrl(path: string): string {
    return path ? `https://image.tmdb.org/t/p/w500${path}` : 'https://via.placeholder.com/200x300';
  }

  getAgeRatingIcon(rating: number | undefined): string {
    if (!rating) return '';
    return `/assets/images/ages/${rating}-circle.svg`;
  }

  // Date selection methods
  selectDate(date: string): void {
    this.selectedDate = date;
  }

  getDateTitle(): string {
    const titles: { [key: string]: string } = {
      'ma': 'Ma (Péntek) - Január 30.',
      'holnap': 'Holnap (Szombat) - Január 31.',
      'feb1': 'Február 1. (Vasárnap)',
      'feb6': 'Február 6. (Péntek) - Premier',
      'feb7': 'Február 7. (Szombat)',
      'feb8': 'Február 8. (Vasárnap)',
      'feb12': 'Február 12. (Csütörtök) - Premier'
    };
    return titles[this.selectedDate] || '';
  }

  getMoviesForDate(): any[] {
    console.log('getMoviesForDate called, sliderMovies:', this.sliderMovies.length);
    // Használjuk a TMDB filmeket 2-3 véletlenszerű filmmel
    const showtimes = ['17:00', '19:30', '21:45'];
    
    if (this.sliderMovies.length === 0) {
      return [];
    }
    
    // Véletlenszerű kiválasztás minden naphoz
    const randomMovies = this.getRandomMovies(3);
    const movies = randomMovies.map((movie, index) => ({
      id: movie.id,
      title: movie.title,
      poster_url: this.getPosterUrl(movie.poster_path),
      showtime: showtimes[index] || '18:00',
      genre: '',
      vote_average: movie.vote_average
    }));
    console.log('Returning movies:', movies);
    return movies;
  }

  getRandomMovies(count: number): TmdbMovie[] {
    if (this.sliderMovies.length === 0) return [];
    
    // Véletlenszerű indexek generálása
    const shuffled = [...this.sliderMovies].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  generateWeeklySchedule(): void {
    // Minden napra elosztjuk a filmeket különböző időpontokkal
    const times = ['15:00', '17:30', '19:45', '21:30'];
    
    if (this.sliderMovies.length === 0) {
      return;
    }
    
    this.weeklySchedule = this.weeklySchedule.map((day, dayIndex) => {
      // Minden napra 3 véletlenszerű filmet választunk
      const randomMovies = this.getRandomMovies(3);
      const moviesForDay = randomMovies.map((movie, index) => ({
        id: movie.id,
        title: movie.title,
        poster_url: this.getPosterUrl(movie.poster_path),
        showtime: times[(dayIndex + index) % times.length],
        genre: 'Film',
        description: movie.overview,
        vote_average: movie.vote_average
      }));
      
      return {
        ...day,
        movies: moviesForDay
      };
    });
  }

  goToMovieDetails(movieId: number, movieObj?: any): void {
    console.log('=== goToMovieDetails called ===');
    console.log('movieId:', movieId);
    console.log('movieObj:', movieObj);
    
    // If movie object is passed directly, use it
    if (movieObj) {
      const movieData = {
        id: movieObj.id,
        title: movieObj.title,
        poster_path: movieObj.poster_path || movieObj.poster_url,
        overview: movieObj.overview || movieObj.description || '',
        vote_average: movieObj.vote_average || 0,
        release_date: movieObj.release_date || '',
        original_language: movieObj.original_language || 'hu'
      };
      console.log('✓ Storing movie data in localStorage:', movieData);
      localStorage.setItem('selectedMovie', JSON.stringify(movieData));
      this.router.navigate(['/movie', movieId], {
        state: { movie: movieData }
      });
      return;
    }
    
    // Find the movie in sliderMovies
    const movie = this.sliderMovies.find(m => m.id === movieId);
    console.log('Found movie in sliderMovies:', movie);
    if (movie) {
      // Store movie data in localStorage for persistence
      const movieData = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        overview: movie.overview,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        original_language: movie.original_language
      };
      console.log('✓ Storing slider movie in localStorage:', movieData);
      localStorage.setItem('selectedMovie', JSON.stringify(movieData));
      
      // Navigate with movie data in state
      this.router.navigate(['/movie', movieId], {
        state: { movie: movieData }
      });
    } else {
      console.log('✗ Movie not found, navigating with ID only');
      // Fallback: just navigate with ID
      this.router.navigate(['/movie', movieId]);
    }
  }
}
