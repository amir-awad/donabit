import request from 'supertest';
import app from '../../start';
import { STATUS_CODES } from '../../common-utils/constants';
import supabaseService from '../../services/supabaseService';

import { describe, it, beforeEach, afterEach } from '@jest/globals';

import { generateDonation } from '../models-generators/generateDonation';

describe('POST /donations', () => {
  beforeEach(async () => {
    await supabaseService.getSupabase().from('donation').delete().neq('supporter_name', '$$invalid name$$');
  });

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

  afterEach(async () => {
    await supabaseService.getSupabase().from('donation').delete().neq('supporter_name', '$$invalid name$$');
  });
});

describe('GET /donations', () => {
  beforeEach(async () => {
    await supabaseService.getSupabase().from('donation').delete().neq('supporter_name', '$$invalid name$$');
  });

  it('should return 200 when fetching all donations', async () => {
    const donations = await request(app).get('/donations');
    expect(donations.status).toBe(STATUS_CODES.OK);
  });

  it('should return all donations', async () => {
    const mockDonation = generateDonation();
    await request(app).post('/donations').send(mockDonation);
    const donations = await request(app).get('/donations');
    const lastDonation = donations.body[donations.body.length - 1];
    expect(lastDonation.supporter_name).toBe(mockDonation.supporterName);
    expect(lastDonation.campaign).toBe(mockDonation.campaignName);
    expect(lastDonation.designation).toBe(mockDonation.designation);
    expect(lastDonation.frequency).toBe(mockDonation.frequency);
  });

  afterEach(async () => {
    await supabaseService.getSupabase().from('donation').delete().neq('supporter_name', '$$invalid name$$');
  });
});

describe('GET /donations/:id/information', () => {
  beforeEach(async () => {
    await supabaseService.getSupabase().from('donation').delete().neq('supporter_name', '$$invalid name$$');
  });
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

  afterEach(async () => {
    await supabaseService.getSupabase().from('donation').delete().neq('supporter_name', '$$invalid name$$');
  });
});

describe('GET /donations/:id/details', () => {
  beforeEach(async () => {
    await supabaseService.getSupabase().from('donation').delete().neq('supporter_name', '$$invalid name$$');
  });
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

  afterEach(async () => {
    await supabaseService.getSupabase().from('donation').delete().neq('supporter_name', '$$invalid name$$');
  });
});

describe('PUT /donations/:id', () => {
  beforeEach(async () => {
    await supabaseService.getSupabase().from('donation').delete().neq('supporter_name', '$$invalid name$$');
  });
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

  afterEach(async () => {
    await supabaseService.getSupabase().from('donation').delete().neq('supporter_name', '$$invalid name$$');
  });
});

describe('DELETE /donations/:id', () => {
  beforeEach(async () => {
    await supabaseService.getSupabase().from('donation').delete().neq('supporter_name', '$$invalid name$$');
  });
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

  afterEach(async () => {
    await supabaseService.getSupabase().from('donation').delete().neq('supporter_name', '$$invalid name$$');
  });
});
