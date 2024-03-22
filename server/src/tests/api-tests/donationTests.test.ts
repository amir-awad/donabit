import request from 'supertest';
import app from '../../index';
import { STATUS_CODES } from '../../common-utils/constants';

import { describe, it } from '@jest/globals';

import { generateDonation } from '../models-generators/generateDonation';

describe('POST /donations', () => {
  it('should return 201 when creating donations', async () => {
    const donation = generateDonation();
    const response = await request(app).post('/donations').send(donation);
    expect(response.status).toBe(STATUS_CODES.CREATED);
  });

  it('should return 400 when creating donations with invalid data', async () => {
    const donation = generateDonation();
    donation.campaignName = '';
    const response = await request(app).post('/donations').send(donation);
    expect(response.status).toBe(STATUS_CODES.BAD_REQUEST);
  });
});

describe('GET /donations', () => {
  it('should return 200 when fetching all donations', async () => {
    const response = await request(app).get('/donations');
    expect(response.status).toBe(STATUS_CODES.OK);
  });

  it('should return all donations', async () => {
    const donations = await request(app).get('/donations');
    const oldLength = donations.body.length;
    const donation = generateDonation();
    await request(app).post('/donations').send(donation);
    const newDonations = await request(app).get('/donations');
    const newLength = newDonations.body.length;
    expect(newLength).toBe(oldLength + 1);
  });
});
