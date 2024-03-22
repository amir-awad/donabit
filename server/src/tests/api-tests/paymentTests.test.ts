import request from 'supertest';
import app from '../../start';
import { STATUS_CODES } from '../../common-utils/constants';
import supabaseService from '../../services/supabaseService';

import { describe, it, beforeEach, afterEach } from '@jest/globals';

import { generateDonation } from '../models-generators/generateDonation';
import { generatePayment } from '../models-generators/generatePayment';

describe('POST /payments', () => {
  beforeEach(async () => {
    await supabaseService.getSupabase().from('donation').delete().neq('supporter_name', '$$invalid name$$');
  });
  it('should return 201 when creating payments', async () => {
    const donation = generateDonation();
    await request(app).post('/donations').send(donation);
    const donations = await request(app).get('/donations');
    const lastDonation = donations.body[donations.body.length - 1];
    const payment = generatePayment();
    payment.donation_id = lastDonation.donation_id;
    const response = await request(app).post(`/payments/${lastDonation.donation_id}`).send(payment);
    expect(response.status).toBe(STATUS_CODES.CREATED);
  });

  it('should return 400 when creating payments with invalid data', async () => {
    const donation = generateDonation();
    await request(app).post('/donations').send(donation);
    const donations = await request(app).get('/donations');
    const lastDonation = donations.body[donations.body.length - 1];
    const payment = generatePayment();
    payment.paymentMethod = 'Some invalid payment method';
    const response = await request(app).post(`/payments/${lastDonation.donation_id}`).send(payment);
    expect(response.status).toBe(STATUS_CODES.BAD_REQUEST);
  });

  afterEach(async () => {
    await supabaseService.getSupabase().from('donation').delete().neq('supporter_name', '$$invalid name$$');
  });
});
