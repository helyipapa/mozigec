# Szabadság Mozi - Cinema Website

Ez a projekt egy teljes körű weboldal klónja a https://szabadsagmozi.hu/ oldalról, Angular frontend, Laravel backend és MySQL adatbázis használatával.

## Projekt Struktúra

```
szabadsagmozigeci/
├── frontend/          # Angular 21 alkalmazás
│   ├── src/
│   │   ├── app/
│   │   │   ├── home/           # Főoldal komponens
│   │   │   ├── services/       # API szolgáltatások
│   │   │   ├── app.ts          # Fő app komponens
│   │   │   ├── app.config.ts   # App konfiguráció
│   │   │   └── app.routes.ts   # Routing konfiguráció
│   │   └── styles.scss         # Globális stílusok
│   └── package.json
│
└── backend/           # Laravel 12 API
    ├── app/
    │   ├── Models/             # Eloquent modellek
    │   │   ├── Movie.php
    │   │   └── Showtime.php
    │   └── Http/
    │       └── Controllers/
    │           └── Api/
    │               └── MovieController.php
    ├── database/
    │   ├── migrations/         # Adatbázis migrációk
    │   └── seeders/            # Seed adatok
    │       └── MovieSeeder.php
    ├── routes/
    │   └── api.php            # API útvonalak
    └── .env                   # Környezeti változók
```

## Technológiák

### Frontend
- **Angular 21** - Modern frontend framework
- **SCSS** - Stílusok
- **RxJS** - Reaktív programozás
- **HttpClient** - API kommunikáció

### Backend
- **Laravel 12** - PHP framework
- **Eloquent ORM** - Adatbázis kezelés
- **RESTful API** - API architektúra

### Database
- **MySQL** - Relációs adatbázis
- Táblák:
  - `movies` - Filmek adatai
  - `showtimes` - Vetítési időpontok

## Adatbázis Struktúra

### Movies tábla
- id
- title (cím)
- description (leírás)
- poster_url (plakát URL)
- age_rating (korhatár)
- status (current/coming_soon)
- duration (időtartam percben)
- genre (műfaj)
- release_date (megjelenés dátuma)
- timestamps

### Showtimes tábla
- id
- movie_id (film ID - foreign key)
- showtime (vetítés időpontja)
- hall (terem)
- format (formátum: 2D, 3D, stb.)
- timestamps

## API Végpontok

```
GET    /api/movies       - Összes film lekérése
GET    /api/movies/{id}  - Egy film lekérése
POST   /api/movies       - Film létrehozása
PUT    /api/movies/{id}  - Film módosítása
DELETE /api/movies/{id}  - Film törlése
```

## Telepítés és Futtatás

### Előfeltételek
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL
- XAMPP (vagy hasonló)

### Backend Indítása

1. Navigálj a backend mappába:
```bash
cd backend
```

2. Telepítsd a függőségeket:
```bash
composer install
```

3. Állítsd be az adatbázist a `.env` fájlban:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=szabadsagmozi
DB_USERNAME=root
DB_PASSWORD=
```

4. Futtasd a migrációkat:
```bash
php artisan migrate
```

5. Töltsd fel a mintaadatokat:
```bash
php artisan db:seed --class=MovieSeeder
```

6. Indítsd el a szervert:
```bash
php artisan serve
```

A backend futni fog a `http://127.0.0.1:8000` címen.

### Frontend Indítása

1. Navigálj a frontend mappába:
```bash
cd frontend
```

2. Telepítsd a függőségeket:
```bash
npm install
```

3. Indítsd el a development szervert:
```bash
npm start
```

A frontend futni fog a `http://localhost:4200` címen.

## Használat

1. Nyisd meg a böngészőt és navigálj a `http://localhost:4200` címre
2. Az oldal automatikusan betölti a filmeket a Laravel API-ból
3. Láthatod a jelenlegi filmeket és a hamarosan érkezőket
4. A vetítési időpontokat is megjeleníti

## Funkciók

✅ Reszponzív design - működik mobil és desktop eszközökön  
✅ Filmek megjelenítése plakáttal és leírással  
✅ Korhatár ikonok megjelenítése  
✅ Vetítési időpontok megjelenítése  
✅ "Hamarosan" filmek külön szekciója  
✅ RESTful API Laravel-ben  
✅ MySQL adatbázis kezelés  
✅ CORS engedélyezve a frontend-backend kommunikációhoz  
✅ Tiszta és modern UI design  

## Dizájn Elemek

- **Színséma**: Kék gradiens header (#1e3c72 - #2a5298)
- **Típográfia**: Segoe UI font family
- **Layout**: CSS Grid és Flexbox
- **Interaktivitás**: Hover effektek, smooth transitions
- **Reszponzivitás**: Mobile-first approach

## API Példák

### Összes film lekérése
```javascript
GET http://127.0.0.1:8000/api/movies

Response:
[
  {
    "id": 1,
    "title": "Legénybúcsú",
    "description": "Alex és Simon...",
    "poster_url": "https://...",
    "age_rating": 12,
    "status": "current",
    "duration": 95,
    "genre": "Vígjáték",
    "showtimes": [
      {
        "id": 1,
        "showtime": "2026-01-30 17:00:00",
        "hall": "M",
        "format": "2D"
      }
    ]
  }
]
```

## Fejlesztés

A projekt folyamatosan fejleszthető:
- Jegyfoglalási rendszer hozzáadása
- Felhasználói bejelentkezés
- Admin felület
- Fizetési integráció (Barion)
- Email értesítések
- Keresési funkció
- Szűrők (műfaj, korhatár, stb.)

## Licenc

© 2026 Szabadság Mozi - Film és Színház. Minden jog fenntartva.

## Fejlesztő Jegyzetek

Ez a projekt egy teljes körű full-stack alkalmazás példája, amely bemutatja:
- Modern Angular alkalmazás fejlesztését
- Laravel API backend építését
- MySQL adatbázis tervezést
- REST API implementációt
- Frontend-Backend integrációt
- Reszponzív web design alapjait

A projekt oktatási célokat szolgál és bemutatja a modern webfejlesztés best practice-eit.
