import express from 'express';
import supabaseService from '../services/supabaseService';
import { STATUS_CODES } from '../common-utils/constants';

const getAllDonations: express.RequestHandler = async (req, res) => {
  try {
    const { data, error } = await supabaseService.getSupabase().from('donation').select('*');
    if (error) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ error: 'Failed to fetch data', message: error.message });
    }
    res.status(STATUS_CODES.OK).json(data);
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch data' });
  }
};

const createDonation: express.RequestHandler = async (req, res) => {
  try {
    const { data, error } = await supabaseService.getSupabase().from('donation').insert({
      supporter_name: req.body.supporterName,
      campaign: req.body.campaignName,
      designation: req.body.designation,
      donation_date: new Date(),
      last_update: new Date(),
      frequency: req.body.frequency,
    });
    if (error) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ error: 'Failed to create donation', message: error.message });
    }
    res.status(STATUS_CODES.CREATED).json(data);
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create donation' });
  }
};

const getDonationInformation: express.RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabaseService.getSupabase().from('donation').select('*').eq('donation_id', id)
      .select(`last_update, supporter_name, campaign
        , payment: donation_id (payment_method)`);
    if (error) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ error: 'Failed to fetch data', message: error.message });
    }
    if (data.length === 0) {
      return res.status(STATUS_CODES.NOT_FOUND).json({ error: 'Donation not found' });
    }
    res.status(STATUS_CODES.OK).json(data);
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch data' });
  }
};

const getDonationDetails: express.RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabaseService
      .getSupabase()
      .from('donation')
      .select(`donation_id, supporter_name, campaign, designation, frequency, success_date, donation_date`)
      .eq('donation_id', id);
    if (error) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ error: 'Failed to fetch data', message: error.message });
    }
    if (data.length === 0) {
      return res.status(STATUS_CODES.NOT_FOUND).json({ error: 'Donation not found' });
    }
    res.status(STATUS_CODES.OK).json(data);
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Failed to fetch data' });
  }
};

const updateDonation: express.RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabaseService
      .getSupabase()
      .from('donation')
      .update({
        supporter_name: req.body.supporterName,
        campaign: req.body.campaignName,
        designation: req.body.designation,
        frequency: req.body.frequency,
        last_update: new Date(),
      })
      .eq('donation_id', id);
    if (error) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ error: 'Failed to update donation', message: error.message });
    }
    res.status(STATUS_CODES.OK).json(data);
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Failed to update donation' });
  }
};

const deleteDonation: express.RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabaseService.getSupabase().from('donation').delete().eq('donation_id', id);
    if (error) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ error: 'Failed to delete donation', message: error.message });
    }
    res.status(STATUS_CODES.OK).json(data);
  } catch (error) {
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: 'Failed to delete donation' });
  }
};

export default {
  getAllDonations,
  createDonation,
  getDonationInformation,
  getDonationDetails,
  updateDonation,
  deleteDonation,
};
