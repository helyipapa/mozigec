<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Foglalás visszaigazolás</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }
        .container {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 3px solid #ffd700;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #000;
            margin: 0;
            font-size: 28px;
        }
        .header p {
            color: #666;
            margin: 5px 0 0 0;
        }
        .booking-number {
            background: #000;
            color: #ffd700;
            padding: 15px;
            text-align: center;
            border-radius: 8px;
            font-size: 24px;
            font-weight: bold;
            margin: 20px 0;
        }
        .section {
            margin: 20px 0;
        }
        .section h2 {
            color: #000;
            font-size: 18px;
            border-bottom: 2px solid #ffd700;
            padding-bottom: 8px;
            margin-bottom: 15px;
        }
        .info-row {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
        }
        .info-label {
            font-weight: bold;
            color: #000;
        }
        .info-value {
            color: #666;
        }
        .seats-list {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 6px;
            margin: 10px 0;
        }
        .warning {
            background: #fff3cd;
            border-left: 4px solid #ffd700;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .warning strong {
            color: #856404;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #eee;
            color: #666;
            font-size: 14px;
        }
        .total {
            background: #000;
            color: white;
            padding: 15px;
            text-align: center;
            border-radius: 8px;
            margin: 20px 0;
        }
        .total-amount {
            color: #ffd700;
            font-size: 28px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>SZABADSÁG MOZI</h1>
            <p>Film és Színház, Mezőtúr</p>
        </div>

        <p>Kedves <strong>{{ $bookingData['customer']['name'] }}</strong>!</p>
        
        <p>Örömmel értesítjük, hogy foglalásodat rögzítettük rendszerünkben.</p>

        <div class="booking-number">
            Foglalási szám: {{ $bookingData['bookingNumber'] }}
        </div>

        <div class="section">
            <h2>📋 Foglalás adatai</h2>
            <div class="info-row">
                <span class="info-label">Névre:</span>
                <span class="info-value">{{ $bookingData['customer']['name'] }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Email:</span>
                <span class="info-value">{{ $bookingData['customer']['email'] }}</span>
            </div>
        </div>

        <div class="section">
            <h2>🎬 Film információk</h2>
            <div class="info-row">
                <span class="info-label">Film címe:</span>
                <span class="info-value">{{ $bookingData['movie']['title'] }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Dátum és időpont:</span>
                <span class="info-value">{{ $bookingData['movie']['showDate'] }}, {{ $bookingData['movie']['showTime'] }}</span>
            </div>
            <div class="info-row">
                <span class="info-label">Helyszín:</span>
                <span class="info-value">{{ $bookingData['movie']['venue'] }}</span>
            </div>
        </div>

        <div class="section">
            <h2>🪑 Foglalt helyek</h2>
            <p class="info-label">Összesen: {{ count($bookingData['seats']) }} db hely</p>
            <div class="seats-list">
                @foreach($bookingData['seats'] as $seat)
                    <div>Nézőtér. Sor: {{ $seat['row'] }}. Szék: {{ $seat['seat'] }}</div>
                @endforeach
            </div>
        </div>

        @if(!empty($bookingData['tickets']))
        <div class="section">
            <h2>🎫 Jegyek</h2>
            @foreach($bookingData['tickets'] as $ticket)
            <div class="info-row">
                <span class="info-label">{{ $ticket['name'] }}</span>
                <span class="info-value">{{ $ticket['price'] }} Ft</span>
            </div>
            @endforeach
        </div>
        @endif

        <div class="total">
            <div>Fizetendő összeg:</div>
            <div class="total-amount">{{ $bookingData['totalPrice'] }} Ft</div>
            @if(!empty($bookingData['orderMethod']))
                <div style="font-size: 14px; margin-top: 10px; color: #ffd700;">
                    @if($bookingData['orderMethod'] === 'online')
                        ✅ Fizetés bankkártyával rendezve
                    @else
                        ⚠️ Fizetés helyszínen a jegypénztárban
                    @endif
                </div>
            @endif
        </div>

        <div class="warning">
            <strong>FONTOS INFORMÁCIÓK:</strong>
            <ul>
                @if(!empty($bookingData['orderMethod']) && $bookingData['orderMethod'] === 'online')
                    <li>A jegyeket az előadás megkezdése előtt 30 perccel a jegypénztárban veheted át.</li>
                    <li>A fizetés bankkártyával már megtörtént.</li>
                @else
                    <li>A foglalást előadás előtt 30 perccel kérjük, kifizesd a jegypénztárban.</li>
                    <li>Ha ez nem történik meg, a foglalás automatikusan törlődik, és helyeidet másnak adjuk el.</li>
                @endif
                <li>Foglalási szám: <strong>{{ $bookingData['bookingNumber'] }}</strong></li>
            </ul>
        </div>

        <div class="footer">
            <p><strong>Szabadság Mozi - Film és Színház</strong></p>
            <p>5400 Mezőtúr, Petőfi út 5.</p>
            <p>Telefon: +36 (XX) XXX-XXXX | Email: info@szabadsagmozi.hu</p>
            <p style="margin-top: 15px; font-size: 12px;">
                Köszönjük, hogy minket választottál!<br>
                Jó szórakozást kívánunk! 🎬
            </p>
        </div>
    </div>
</body>
</html>
