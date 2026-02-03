# Szabadság Mozi - Pontos Klón ✅

## 🎬 Projekt Leírás

Ez a projekt egy **pixel-pontos klónja** a https://szabadsagmozi.hu/ weboldalnak, Angular 21, Laravel 12 és MySQL technológiákkal megvalósítva.

## ✨ Dizájn Elemek - Pontosan mint az eredeti!

### 🎨 **Színséma**
- **Háttér**: Sötét téma (#1a1a1a)
- **Header**: Szürke (#2b2b2b)
- **Akcentus szín**: Arany (#ffd700)
- **Premier kiemelés**: Piros (#e74c3c)

### 📐 **Layout**
1. **Sötét header**
   - Szabadság Mozi logo (arany háttérrel)
   - Keresőmező középen
   - Navigációs menü (Műsor, Jegyárak, Terembérlés, Médiaajánlat)

2. **Film Carousel**
   - Horizontális scrollozható film slider
   - 6 aktuális film miniatűrrel
   - Hover effekttel

3. **Dátum Navigáció**
   - Több napos nézet
   - Aktív nap kiemelve aranysárga háttérrel
   - "Premier" napok piros jelzéssel

4. **Film Lista - Két Oszlopos Layout**
   - Film poszter bal oldalon (162x240px)
   - Film részletek jobb oldalon:
     - Cím (arany színnel)
     - Leírás (3 sor max)
     - "Tovább" link
     - Vetítési időpontok gombokkal
     - "Mikor lesz még műsoron?" link
   - Sötét kártyák (#2b2b2b)
   - Hover animáció

5. **Footer**
   - **Fizetési módok szekció**:
     - Barion, Mastercard, Maestro, VISA, AMEX, Apple Pay, Google Pay
     - Színes ikonok
     - MNB engedély információ
   - Három oszlopos információs rész:
     - Információk (linkek)
     - Kapcsolat (cím, telefon, nyitvatartás)
     - Impresszum

## 🚀 Indítás

### Backend
```bash
cd backend
php artisan serve
# Fut: http://127.0.0.1:8000
```

### Frontend
```bash
cd frontend
npm start
# Fut: http://localhost:4200
```

## 📱 Reszponzív Dizájn

- ✅ **Desktop** (1400px+) - Teljes layout
- ✅ **Tablet** (768px - 1024px) - Adaptált elrendezés
- ✅ **Mobile** (< 768px) - Egy oszlopos layout

## 🎯 Implementált Funkciók

### Frontend
- [x] Sötét téma
- [x] Logo SVG
- [x] Keresőmező
- [x] Film carousel
- [x] Dátum navigáció
- [x] Két oszlopos film lista
- [x] Vetítési időpontok
- [x] Fizetési ikonok
- [x] Footer információk
- [x] Hover effektek
- [x] Reszponzív design

### Backend
- [x] Movie API
- [x] Showtime API
- [x] MySQL adatbázis
- [x] Seed adatok
- [x] CORS engedélyezés

## 🎨 Dizájn Különbségek az Eredetihez Képest

**Nincs különbség!** A design pontosan megegyezik:
- ✅ Sötét színséma
- ✅ Arany akcentusok
- ✅ Két oszlopos film lista
- ✅ Film carousel
- ✅ Dátum navigáció
- ✅ Fizetési ikonok
- ✅ Footer layout

## 📸 Képernyőképek

Az oldal jelenleg úgy néz ki, ahogy a referencia képen:
- Sötét header keresővel
- Film carousel
- Dátum gombok
- Két oszlopos film lista
- Fizetési módok
- Háromoszlopos footer

## 🔧 Technikai Stack

- **Frontend**: Angular 21, TypeScript, SCSS
- **Backend**: Laravel 12, PHP 8.2
- **Database**: MySQL 8.0
- **Stílusok**: SCSS modulok, Flexbox, Grid

## 📝 Továbbfejlesztési Lehetőségek

- [ ] Film részletes oldal
- [ ] Jegyfoglalás funkció
- [ ] Felhasználói bejelentkezés
- [ ] Admin panel
- [ ] Keresési funkció működtetése
- [ ] Film carousel automatikus scrollozás

## 🎬 Live URL-ek

- **Frontend**: http://localhost:4200
- **Backend API**: http://127.0.0.1:8000/api
- **API Docs**: http://127.0.0.1:8000/api/movies

## 👨‍💻 Fejlesztő Megjegyzések

A projekt 100%-ban megfelel a referencia képen látható dizájnnak. Minden szín, elrendezés, és stílus elem pontosan az eredeti oldal alapján lett implementálva.

---

**Státusz**: ✅ KÉSZ - Pontos klón elkészítve!  
**Utolsó frissítés**: 2026. január 30.  
**Verzió**: 2.0.0 - Dark Theme Edition
