import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private stripePromise: Promise<Stripe | null>;
  private stripe: Stripe | null = null;
  
  // Test public key - használd a saját Stripe test key-edet
  private stripePublicKey = 'pk_test_51QnuFIH2bWNqR4sxH4n0h9T4fS5Z6uXQ4qGD4S5R0W8T3z9Y2f1V7k8P9mN3qX5r6T7k8P9m';

  constructor(private http: HttpClient) {
    this.stripePromise = loadStripe(this.stripePublicKey);
  }

  async getStripe(): Promise<Stripe | null> {
    if (!this.stripe) {
      this.stripe = await this.stripePromise;
    }
    return this.stripe;
  }

  createPaymentIntent(amount: number, currency: string = 'huf', description?: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/payment/create-intent`, {
      amount,
      currency,
      description
    });
  }

  confirmPayment(paymentIntentId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/payment/confirm`, {
      payment_intent_id: paymentIntentId
    });
  }

  async confirmCardPayment(clientSecret: string, cardElement: StripeCardElement): Promise<any> {
    const stripe = await this.getStripe();
    if (!stripe) {
      throw new Error('Stripe nem töltődött be');
    }

    return await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement
      }
    });
  }
}
