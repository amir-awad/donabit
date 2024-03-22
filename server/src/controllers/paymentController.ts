import express from 'express';
import supabaseService from '../services/supabaseService';
import { STATUS_CODES } from '../common-utils/constants';

const getPaymentDetails: express.RequestHandler = async (req, res) => {
  try {
    const { donationId } = req.params;
    const { data, error } = await supabaseService
      .getSupabase()
      .from('payment')
      .select('*')
      .eq('donation_id', donationId);
    if (error) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ error: 'Failed to fetch data', message: error.message });
    }
    res.status(STATUS_CODES.OK).json(data);
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch data' });
  }
};

const createPayment: express.RequestHandler = async (req, res) => {
  try {
    const { donationId } = req.params;
    const { data, error } = await supabaseService.getSupabase().from('payment').insert({
      donation_id: donationId,
      payment_amount: req.body.paymentAmount,
      payment_date: new Date(),
      platform_fee: req.body.platformFee,
      payment_processing_fee: req.body.paymentProcessingFee,
      payout_amount: req.body.payoutAmount,
      payment_processor: req.body.paymentProcessor,
      credit_card: req.body.creditCard,
      fee_covered: req.body.feeCovered,
      effective_fee: req.body.effectiveFee,
      payment_method: req.body.paymentMethod,
    });

    if (error) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ error: 'Failed to create payment', message: error.message });
    }
    res.status(STATUS_CODES.CREATED).json(data);
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create payment' });
  }
};

const updatePayment: express.RequestHandler = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { data, error } = await supabaseService
      .getSupabase()
      .from('payment')
      .update({
        payment_amount: req.body.paymentAmount,
        payment_date: new Date(),
        platform_fee: req.body.platformFee,
        payment_processing_fee: req.body.paymentProcessingFee,
        payout_amount: req.body.payoutAmount,
        payment_processor: req.body.paymentProcessor,
        credit_card: req.body.creditCard,
        fee_covered: req.body.feeCovered,
        effective_fee: req.body.effectiveFee,
        payment_method: req.body.paymentMethod,
      })
      .eq('payment_id', paymentId);

    if (error) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ error: 'Failed to update payment', message: error.message });
    }
    res.status(STATUS_CODES.OK).json(data);
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Failed to update payment' });
  }
};

const deletePayment: express.RequestHandler = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { data, error } = await supabaseService.getSupabase().from('payment').delete().eq('payment_id', paymentId);
    if (error) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ error: 'Failed to delete payment', message: error.message });
    }
    res.status(STATUS_CODES.OK).json(data);
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete payment' });
  }
};

export default { getPaymentDetails, createPayment, updatePayment, deletePayment };
