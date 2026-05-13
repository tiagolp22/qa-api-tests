import { test, expect } from '@playwright/test';

test.describe('Sante de l API', () => {

  test('@smoke le serveur repond et est disponible', async ({ request }) => {
    const response = await request.get('/ping');
    expect(response.status()).toBe(201);
  });

});
