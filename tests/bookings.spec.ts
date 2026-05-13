import { test, expect } from '@playwright/test';
import { credentials, newBooking, updatedBooking } from './data/bookings';

let token: string;
let bookingId: number;

test.describe.serial('Reservations — CRUD complet', () => {

  test.beforeAll(async ({ request }) => {
    const response = await request.post('/auth', { data: credentials });
    const body = await response.json();
    token = body.token;
  });

  test('@smoke la liste des reservations retourne un tableau non vide', async ({ request }) => {
    const response = await request.get('/booking');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
  });

  test('@smoke filtre par nom retourne un tableau de resultats', async ({ request }) => {
    const response = await request.get('/booking?firstname=Jim&lastname=Brown');

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBe(true);
  });

  test('@regression creer une reservation retourne l ID et les donnees saisies', async ({ request }) => {
    const response = await request.post('/booking', {
      data: newBooking,
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('bookingid');
    expect(typeof body.bookingid).toBe('number');
    expect(body.booking.firstname).toBe(newBooking.firstname);
    expect(body.booking.lastname).toBe(newBooking.lastname);
    expect(body.booking.totalprice).toBe(newBooking.totalprice);
    expect(body.booking.depositpaid).toBe(newBooking.depositpaid);

    bookingId = body.bookingid;
  });

  test('@regression recuperer une reservation par ID retourne les bonnes donnees', async ({ request }) => {
    const response = await request.get(`/booking/${bookingId}`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.firstname).toBe(newBooking.firstname);
    expect(body.lastname).toBe(newBooking.lastname);
    expect(body.totalprice).toBe(newBooking.totalprice);
    expect(body.bookingdates.checkin).toBe(newBooking.bookingdates.checkin);
    expect(body.bookingdates.checkout).toBe(newBooking.bookingdates.checkout);
  });

  test('@regression modifier une reservation met a jour toutes les donnees', async ({ request }) => {
    const response = await request.put(`/booking/${bookingId}`, {
      data: updatedBooking,
      headers: {
        Cookie: `token=${token}`,
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.firstname).toBe(updatedBooking.firstname);
    expect(body.lastname).toBe(updatedBooking.lastname);
    expect(body.totalprice).toBe(updatedBooking.totalprice);
  });

  test('@regression supprimer une reservation retourne 201', async ({ request }) => {
    const response = await request.delete(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    expect(response.status()).toBe(201);
  });

  test('@regression reservation supprimee renvoie 404', async ({ request }) => {
    const response = await request.get(`/booking/${bookingId}`);
    expect(response.status()).toBe(404);
  });

});
