import { test, expect } from '@playwright/test';
import { credentials } from './data/bookings';

test.describe('Authentification', () => {

  test('@smoke identifiants valides retournent un token non vide', async ({ request }) => {
    const response = await request.post('/auth', {
      data: credentials,
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');
    expect(body.token.length).toBeGreaterThan(0);
  });

  test('@regression identifiants invalides retournent Bad credentials', async ({ request }) => {
    const response = await request.post('/auth', {
      data: { username: 'faux', password: 'incorrect' },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.reason).toBe('Bad credentials');
  });

});
