import request from 'supertest';
import app from '../index';

import { describe, it } from '@jest/globals';

describe('Donation endpoints', () => {
  it('creates a new donation', async () => {
    const newDonation = {
      supporterName: 'Test User',
      campaignName: 'My awesome campaign #6',
      designation: 'General',
      frequency: 'One time',
    };

    const response = await request(app).post('/donations').send(newDonation);

    expect(response.status).toBe(201);
  });
});
