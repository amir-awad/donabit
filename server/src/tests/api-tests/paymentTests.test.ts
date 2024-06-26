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

describe('GET /payments/:donationId', () => {
  beforeEach(async () => {
    await supabaseService.getSupabase().from('donation').delete().neq('supporter_name', '$$invalid name$$');
  });
  it('should return 200 when fetching all payments for a donation', async () => {
    const donation = generateDonation();
    await request(app).post('/donations').send(donation);
    const donations = await request(app).get('/donations');
    const lastDonation = donations.body[donations.body.length - 1];
    expect(lastDonation).toBeDefined();
    const response = await request(app).get(`/payments/${lastDonation.donation_id}`);
    expect(response.status).toBe(STATUS_CODES.OK);
  });

  it('should return all payments for a donation', async () => {
    const donation = generateDonation();
    await request(app).post('/donations').send(donation);
    const donations = await request(app).get('/donations');
    const lastDonation = donations.body[donations.body.length - 1];
    const payment = generatePayment();
    await request(app).post(`/payments/${lastDonation.donation_id}`).send(payment);
    const response = await request(app).get(`/payments/${lastDonation.donation_id}`);
    const lastPayment = response.body[response.body.length - 1];
    expect(lastPayment).toBeDefined();
    expect(lastPayment.payment_amount).toBe(payment.paymentAmount);
    expect(lastPayment.payment_method).toBe(payment.paymentMethod);
    expect(lastPayment.payment_processor).toBe(payment.paymentProcessor);
  });

  afterEach(async () => {
    await supabaseService.getSupabase().from('donation').delete().neq('supporter_name', '$$invalid name$$');
  });
});

describe('PUT /payments/:paymentId', () => {
  beforeEach(async () => {
    await supabaseService.getSupabase().from('donation').delete().neq('supporter_name', '$$invalid name$$');
  });

  it('should return 200 when updating payments', async () => {
    const donation = generateDonation();
    await request(app).post('/donations').send(donation);
    const donations = await request(app).get('/donations');
    const lastDonation = donations.body[donations.body.length - 1];
    const payment = generatePayment();
    await request(app).post(`/payments/${lastDonation.donation_id}`).send(payment);
    const payments = await request(app).get(`/payments/${lastDonation.donation_id}`);
    const lastPayment = payments.body[payments.body.length - 1];
    const newPayment = generatePayment();
    const updateResponse = await request(app).put(`/payments/${lastPayment.payment_id}`).send(newPayment);
    expect(updateResponse.status).toBe(STATUS_CODES.OK);
  });

  it('should return 400 when updating payments with invalid data', async () => {
    const donation = generateDonation();
    await request(app).post('/donations').send(donation);
    const donations = await request(app).get('/donations');
    const lastDonation = donations.body[donations.body.length - 1];
    const payment = generatePayment();
    await request(app).post(`/payments/${lastDonation.donation_id}`).send(payment);
    const payments = await request(app).get(`/payments/${lastDonation.donation_id}`);
    const lastPayment = payments.body[payments.body.length - 1];
    const newPayment = generatePayment();
    newPayment.paymentMethod = 'Some invalid payment method';
    const updateResponse = await request(app).put(`/payments/${lastPayment.payment_id}`).send(newPayment);
    expect(updateResponse.status).toBe(STATUS_CODES.BAD_REQUEST);
  });

  afterEach(async () => {
    await supabaseService.getSupabase().from('donation').delete().neq('supporter_name', '$$invalid name$$');
  });
});
