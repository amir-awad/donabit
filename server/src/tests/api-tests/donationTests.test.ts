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

describe('GET /donations/:id/information', () => {
  it('should return 200 when fetching donation information', async () => {
    const donation = generateDonation();
    await request(app).post('/donations').send(donation);
    const response = await request(app).get('/donations');
    const lastDonation = response.body[response.body.length - 1];
    expect(lastDonation.supporter_name).toBe(donation.supporterName);
    expect(lastDonation.campaign).toBe(donation.campaignName);
    expect(lastDonation.designation).toBe(donation.designation);
    expect(lastDonation.frequency).toBe(donation.frequency);
  });

  it('should return 500 when fetching donation information with invalid ID', async () => {
    const information = await request(app).get('/donations/invalid-id/information');
    expect(information.status).toBe(STATUS_CODES.INTERNAL_SERVER_ERROR);
  });

  it('should return 404 when fetching donation information with non-existing ID', async () => {
    const information = await request(app).get('/donations/00000000-0000-0000-0000-000000000000/information');
    expect(information.status).toBe(STATUS_CODES.NOT_FOUND);
  });
});

describe('GET /donations/:id/details', () => {
  it('should return 200 when fetching donation details', async () => {
    const donation = generateDonation();
    await request(app).post('/donations').send(donation);
    const response = await request(app).get('/donations');
    const lastDonation = response.body[response.body.length - 1];
    expect(lastDonation.supporter_name).toBe(donation.supporterName);
    expect(lastDonation.campaign).toBe(donation.campaignName);
    expect(lastDonation.designation).toBe(donation.designation);
    expect(lastDonation.frequency).toBe(donation.frequency);
  });

  it('should return 500 when fetching donation details with invalid ID', async () => {
    const details = await request(app).get('/donations/invalid-id/details');
    expect(details.status).toBe(STATUS_CODES.INTERNAL_SERVER_ERROR);
  });

  it('should return 404 when fetching donation details with non-existing ID', async () => {
    const details = await request(app).get('/donations/00000000-0000-0000-0000-000000000000/details');
    expect(details.status).toBe(STATUS_CODES.NOT_FOUND);
  });
});

describe('PUT /donations/:id', () => {
  it('should return 200 when updating donation', async () => {
    const donation = generateDonation();
    await request(app).post('/donations').send(donation);
    const response = await request(app).get('/donations');
    const lastDonation = response.body[response.body.length - 1];
    lastDonation.supporter_name = 'New name';
    const updatedDonation = await request(app).put(`/donations/${lastDonation.donation_id}`).send(lastDonation);
    expect(updatedDonation.status).toBe(STATUS_CODES.OK);
  });

  it('should return 400 when updating donation with invalid data', async () => {
    const donation = generateDonation();
    await request(app).post('/donations').send(donation);
    const response = await request(app).get('/donations');
    const lastDonation = response.body[response.body.length - 1];
    lastDonation.campaign = 'Updated campaign';
    donation.campaignName = 'New campaign';
    const updatedDonation = await request(app).put(`/donations/${lastDonation.donation_id}`).send(donation);
    expect(updatedDonation.status).toBe(STATUS_CODES.BAD_REQUEST);
  });

  it('should return 500 when updating donation with invalid ID', async () => {
    const donation = generateDonation();
    await request(app).post('/donations').send(donation);
    const response = await request(app).get('/donations');
    const lastDonation = response.body[response.body.length - 1];
    lastDonation.donation_id = 'invalid-id';
    const updatedDonation = await request(app).put(`/donations/${lastDonation.donation_id}`).send(lastDonation);
    expect(updatedDonation.status).toBe(STATUS_CODES.INTERNAL_SERVER_ERROR);
  });
});

describe('DELETE /donations/:id', () => {
  it('should return 200 when deleting donation', async () => {
    const donation = generateDonation();
    await request(app).post('/donations').send(donation);
    const response = await request(app).get('/donations');
    const oldLength = response.body.length;
    const lastDonation = response.body[response.body.length - 1];
    const deletedDonation = await request(app).delete(`/donations/${lastDonation.donation_id}`);
    const newResponse = await request(app).get('/donations');
    const newLength = newResponse.body.length;
    expect(deletedDonation.status).toBe(STATUS_CODES.OK);
    expect(newLength).toBe(oldLength - 1);
  });

  it('should return 500 when deleting donation with invalid ID', async () => {
    const donation = generateDonation();
    await request(app).post('/donations').send(donation);
    const response = await request(app).get('/donations');
    const lastDonation = response.body[response.body.length - 1];
    lastDonation.donation_id = 'invalid-id';
    const deletedDonation = await request(app).delete(`/donations/${lastDonation.donation_id}`);
    expect(deletedDonation.status).toBe(STATUS_CODES.INTERNAL_SERVER_ERROR);
  });
});
