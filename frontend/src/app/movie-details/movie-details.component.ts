import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface Seat {
  number: number;
  status: 'available' | 'occupied' | 'selected';
}

interface SeatRow {
  rowNumber: number;
  seats: Seat[];
}

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class MovieDetailsComponent implements OnInit {
  searchText: string = '';
  currentStep: number = 1;
  orderMethod: string = '';
  movieId: string | null = null;
  isLoadingMovie: boolean = true;

  selectedMovie: any = {
    title: 'Betöltés...',
    language: 'Magyar nyelvű',
    duration: '1 óra 45 perc',
    showDate: 'Ma, január 30., péntek',
    showTime: '17:00',
    location: 'Szabadság terem',
    endTime: '18:45',
    poster: 'https://via.placeholder.com/300x400?text=Bet%C3%B6lt%C3%A9s...',
    ageRating: '16',
    dayName: 'péntek',
    venue: 'Szabadság Mozi - Film és Színház, 5400 Mezőtúr, Petőfi út 5., Szabadság terem'
  };

  bookingData = {
    name: '',
    email: '',
    note: ''
  };

  ticketTypes: TicketType[] = [
    {
      id: '2d-kedv',
      name: '2D Kedvezményes',
      description: 'Gyermek (7 éves korig), diák és nyugdíjas részére csak igazolvány felmutatásával.',
      price: 1800,
      quantity: 0
    },
    {
      id: '2d-teljes',
      name: '2D Teljes árú',
      description: 'Teljes árú jegy',
      price: 2000,
      quantity: 0
    },
    {
      id: 'ajandek',
      name: 'Ajándék mozijegy',
      description: 'Ajándék mozijegy vásárlása a jegypénztárban lehetséges.',
      price: 2200,
      quantity: 0
    },
    {
      id: 'tisztelet',
      name: 'Tisztelet Mozijegy',
      description: 'Ajándék mozijegy vásárlása a jegypénztárban lehetséges.',
      price: 1800,
      quantity: 0
    }
  ];

  seatMap: SeatRow[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
    this.initializeSeatMap();
  }

  ngOnInit(): void {
    console.log('=== MovieDetailsComponent ngOnInit ===');
    
    const navigation = this.router.getCurrentNavigation();
    const stateMovie = navigation?.extras?.state?.['movie'] || history.state?.movie;
    console.log('Navigation state movie:', stateMovie);
    
    const storedMovie = localStorage.getItem('selectedMovie');
    const localMovie = storedMovie ? JSON.parse(storedMovie) : null;
    console.log('LocalStorage movie:', localMovie);
    
    const movieData = stateMovie || localMovie;
    console.log('Final movieData:', movieData);
    
    if (movieData) {
      console.log('Using movie data from state/localStorage');
      this.setMovieData(movieData);
      this.isLoadingMovie = false;
    } else {
      console.log('No movie data found, loading from API...');
      this.route.params.subscribe(params => {
        this.movieId = params['id'];
        if (this.movieId) {
          console.log('Loading movie from API:', this.movieId);
          this.loadMovieDetails(this.movieId);
        }
      });
    }
  }

  setMovieData(movie: any): void {
    const movieTitle = movie.title || movie.original_title || 'Film';
    
    this.selectedMovie = {
      title: movieTitle,
      language: movie.original_language === 'hu' ? 'Magyar nyelvű' : 'Angol nyelvű, magyar felirattal',
      duration: movie.runtime ? `${Math.floor(movie.runtime / 60)} óra ${movie.runtime % 60} perc` : '1 óra 45 perc',
      showDate: 'Ma, január 30., péntek',
      showTime: '17:00',
      location: 'Szabadság terem',
      endTime: '18:45',
      poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/300x400?text=Film',
      ageRating: '16',
      dayName: 'péntek',
      venue: 'Szabadság Mozi - Film és Színház, 5400 Mezőtúr, Petőfi út 5., Szabadság terem'
    };
    
    console.log('Selected movie set:', this.selectedMovie);
  }

  loadMovieDetails(movieId: string): void {
    this.isLoadingMovie = true;
    const apiKey = '3fd2be6f0c70a2a598f084ddfb75487c';
    
    this.http.get<any>(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=hu-HU`)
      .subscribe({
        next: (movie) => {
          console.log('Movie loaded from TMDB:', movie);
          this.setMovieData(movie);
          this.isLoadingMovie = false;
        },
        error: (err) => {
          console.error('Error loading movie from TMDB:', err);
          this.selectedMovie.title = 'Film';
          this.selectedMovie.poster = 'https://via.placeholder.com/300x400?text=Film';
          this.isLoadingMovie = false;
        }
      });
  }

  initializeSeatMap(): void {
    for (let row = 1; row <= 15; row++) {
      const seats: Seat[] = [];
      const seatsInRow = row <= 2 ? 10 : (row <= 8 ? 14 : 13);
      
      for (let seat = 1; seat <= seatsInRow; seat++) {
        const isOccupied = Math.random() < 0.3;
        seats.push({
          number: seat,
          status: isOccupied ? 'occupied' : 'available'
        });
      }
      
      this.seatMap.push({
        rowNumber: row,
        seats: seats
      });
    }
  }

  goToStep1(): void {
    this.currentStep = 1;
  }

  goToStep2(): void {
    if (this.bookingData.name && this.bookingData.email) {
      this.currentStep = 2;
    }
  }

  goToStep3(): void {
    if (this.getTotalQuantity() > 0) {
      this.currentStep = 3;
    }
  }

  goToStep4(): void {
    if (this.getSelectedSeats().length === this.getTotalQuantity()) {
      this.currentStep = 4;
    }
  }

  goToStep5(): void {
    this.submitBooking();
    this.currentStep = 5;
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  goToMovieList(): void {
    this.router.navigate(['/']);
  }

  selectOrderMethod(method: string): void {
    this.orderMethod = method;
  }

  increaseQuantity(ticketId: string): void {
    const ticket = this.ticketTypes.find(t => t.id === ticketId);
    if (ticket) {
      ticket.quantity++;
    }
  }

  decreaseQuantity(ticketId: string): void {
    const ticket = this.ticketTypes.find(t => t.id === ticketId);
    if (ticket && ticket.quantity > 0) {
      ticket.quantity--;
    }
  }

  getTotalQuantity(): number {
    return this.ticketTypes.reduce((sum, ticket) => sum + ticket.quantity, 0);
  }

  getTotalPrice(): number {
    return this.ticketTypes.reduce((sum, ticket) => sum + (ticket.price * ticket.quantity), 0);
  }

  selectSeat(rowIndex: number, seatIndex: number): void {
    const seat = this.seatMap[rowIndex].seats[seatIndex];
    
    if (seat.status === 'occupied') {
      return;
    }

    const selectedCount = this.getSelectedSeats().length;
    const requiredSeats = this.getTotalQuantity();

    if (seat.status === 'available') {
      if (selectedCount < requiredSeats) {
        seat.status = 'selected';
      }
    } else if (seat.status === 'selected') {
      seat.status = 'available';
    }
  }

  getSelectedSeats(): { row: number; seat: number }[] {
    const selected: { row: number; seat: number }[] = [];
    
    this.seatMap.forEach((row, rowIndex) => {
      row.seats.forEach((seat, seatIndex) => {
        if (seat.status === 'selected') {
          selected.push({
            row: row.rowNumber,
            seat: seat.number
          });
        }
      });
    });
    
    return selected;
  }

  getSelectedSeatsText(): string {
    const seats = this.getSelectedSeats();
    return seats.map(s => `Nézőtér. Sor: ${s.row}. Szék: ${s.seat}`).join(', ');
  }

  getSelectedTickets(): any[] {
    const selectedSeats = this.getSelectedSeats();
    const tickets: any[] = [];
    let seatIndex = 0;

    this.ticketTypes.forEach(ticket => {
      if (ticket.quantity > 0) {
        for (let i = 0; i < ticket.quantity; i++) {
          const seat = selectedSeats[seatIndex];
          tickets.push({
            quantity: i + 1,
            name: ticket.name,
            seats: `Nézőtér. Sor: ${seat.row}. Szék: ${seat.seat}`,
            price: ticket.price
          });
          seatIndex++;
        }
      }
    });

    return tickets;
  }

  private bookingNumber: number = 0;

  submitBooking(): void {
    this.bookingNumber = Math.floor(Math.random() * 90000) + 10000;
    
    const bookingDetails = {
      movie: this.selectedMovie,
      customer: this.bookingData,
      tickets: this.getSelectedTickets(),
      totalPrice: this.getTotalPrice(),
      seats: this.getSelectedSeats(),
      orderMethod: this.orderMethod,
      bookingNumber: this.bookingNumber
    };

    console.log('Booking submitted:', bookingDetails);
  }

  getBookingNumber(): number {
    return this.bookingNumber;
  }
}
