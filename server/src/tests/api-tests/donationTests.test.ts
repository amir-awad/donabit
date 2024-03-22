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
