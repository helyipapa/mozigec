# Stripe Fizetési Integráció Beállítása

## 🎯 Áttekintés

A Szabadság Mozi alkalmazás mostmár támogatja a **Stripe** bankkártyás online fizetést. A felhasználók választhatnak, hogy:
- **Online fizetéssel** (bankkártya) azonnal fizetnek
- **Helyszíni foglalással** a jegypénztárban fizetnek

## 📋 Előfeltételek

1. **Stripe fiók** létrehozása: https://stripe.com
2. **API kulcsok** beszerzése a Stripe Dashboard-ról

## 🔧 Backend Beállítás (Laravel)

### 1. Stripe API Kulcsok Beállítása

Szerkeszd a `backend/.env` fájlt:

```env
STRIPE_KEY=pk_test_YOUR_PUBLISHABLE_KEY
STRIPE_SECRET=sk_test_YOUR_SECRET_KEY
```

**Ahol találod a kulcsokat:**
1. Jelentkezz be: https://dashboard.stripe.com
2. Menj a **Developers** → **API keys** menübe
3. Másold ki a **Publishable key**-t és a **Secret key**-t

### 2. Telepített Csomagok

A backend már tartalmazza:
- `stripe/stripe-php` - Stripe PHP SDK

### 3. API Végpontok

Az alábbi végpontok érhetőek el:

- `POST /api/payment/create-intent` - Payment Intent létrehozása
  ```json
  {
    "amount": 5000,
    "currency": "huf",
    "description": "Mozijegy foglalás"
  }
  ```

- `POST /api/payment/confirm` - Fizetés státuszának ellenőrzése
  ```json
  {
    "payment_intent_id": "pi_xxx"
  }
  ```

- `POST /api/bookings` - Foglalás rögzítése (fizetési adatokkal)

## 🎨 Frontend Beállítás (Angular)

### 1. Stripe Publishable Key

Szerkeszd a `frontend/src/app/services/payment.service.ts` fájlt:

```typescript
private stripePublicKey = 'pk_test_YOUR_PUBLISHABLE_KEY';
```

**FONTOS:** Ugyanazt a publishable key-t használd, mint a backend-ben!

### 2. Telepített Csomagok

A frontend már tartalmazza:
- `@stripe/stripe-js` - Stripe JavaScript SDK

## 🧪 Teszt Módok

### Test Mode (Alapértelmezett)

Jelenleg **test mode**-ban működik az alkalmazás. Ez azt jelenti:
- Nincs valódi pénzmozgás
- Teszt kártyákkal lehet fizetni

### Teszt Kártyaszámok

Használd ezeket a kártyaszámokat teszteléshez:

| Kártyaszám | Eredmény |
|------------|----------|
| `4242 4242 4242 4242` | ✅ Sikeres fizetés |
| `4000 0000 0000 9995` | ❌ Elutasított (insufficient funds) |
| `4000 0000 0000 0002` | ❌ Elutasított (card declined) |

**Egyéb adatok** (mindegy mi, csak valid formátum):
- **Lejárat:** Bármely jövőbeli dátum (pl. `12/25`)
- **CVC:** Bármely 3 számjegy (pl. `123`)
- **Postai irányítószám:** Bármely 5 számjegy (pl. `12345`)

## 🚀 Production Mode

### Éles Környezetbe Állítás

1. **Stripe Dashboard → Aktiválás**
   - Töltsd ki a vállalkozási adatokat
   - Aktiváld a fiókot éles fizetésekhez

2. **Cseréld ki a kulcsokat**

Backend `.env`:
```env
STRIPE_KEY=pk_live_YOUR_LIVE_PUBLISHABLE_KEY
STRIPE_SECRET=sk_live_YOUR_LIVE_SECRET_KEY
```

Frontend `payment.service.ts`:
```typescript
private stripePublicKey = 'pk_live_YOUR_LIVE_PUBLISHABLE_KEY';
```

## 📊 Fizetési Folyamat

### 1. Foglalás módja választás
- Felhasználó választ: **Online fizetés** vagy **Helyszíni foglalás**

### 2. Online fizetés esetén (Step 5)
1. **Payment Intent** létrehozása (backend)
2. **Stripe kártya form** betöltése (frontend)
3. Felhasználó megadja a kártyaadatokat
4. **Fizetés végrehajtása** Stripe-on keresztül
5. Sikeres fizetés után → **Foglalás rögzítése** (backend)
6. **Email visszaigazolás** küldése

### 3. Helyszíni foglalás esetén
1. Ugrás Step 5-re
2. **Foglalás rögzítése** azonnal (backend)
3. **Email visszaigazolás** küldése (fizetés helyszínen)

## 📧 Email Visszaigazolás

Az email tartalmazza:
- ✅ **Online fizetés:** "Fizetés bankkártyával rendezve"
- ⚠️ **Helyszíni foglalás:** "Fizetés helyszínen a jegypénztárban"
- Foglalási szám
- Film adatok
- Foglalt ülések
- Összeg

## 🔍 Logolás és Hibakeresés

### Backend Logok

Laravel logokat találod itt: `backend/storage/logs/laravel.log`

```php
// Payment Intent létrehozás
Log::info('Payment Intent created', ['payment_intent_id' => $paymentIntent->id]);

// Foglalás rögzítés
Log::info('New booking received', [
    'booking_number' => $bookingNumber,
    'order_method' => 'online',
    'payment_intent' => $paymentIntentId
]);
```

### Frontend Konzol

Nyisd meg a browser console-t (F12):
```javascript
console.log('Payment Intent created:', paymentIntentId);
console.log('Payment successful!', result.paymentIntent);
console.log('Booking submitted:', bookingDetails);
```

## 🛡️ Biztonsági Megjegyzések

1. **Soha ne commitold** a valódi API kulcsokat a git repository-ba!
2. **Használj environment változókat** (.env fájl)
3. **Test mode** fejlesztéshez, **Live mode** csak élesben
4. A **Publishable Key** publikus lehet, de a **Secret Key** szigorúan titkos!

## 💰 Díjak

Stripe díjstruktúra (Európa):
- **2.9% + 0.25 EUR** tranzakciónként (online kártya)
- Nincs havi fix költség
- További info: https://stripe.com/pricing

## 📞 Támogatás

- **Stripe Dokumentáció:** https://stripe.com/docs
- **Stripe Dashboard:** https://dashboard.stripe.com
- **Support:** https://support.stripe.com

## ✅ Ellenőrzési Lista

- [ ] Stripe fiók létrehozva
- [ ] API kulcsok beszerzve
- [ ] Backend `.env` frissítve
- [ ] Frontend `payment.service.ts` frissítve
- [ ] Teszt kártyával sikeres fizetés
- [ ] Email visszaigazolás működik
- [ ] Logok ellenőrizve

---

**Készítve:** 2026. január 30.
**Verzió:** 1.0
