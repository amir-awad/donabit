import React, { useState, useEffect } from 'react';
import supabaseService from '@/services/supabaseService';
import hashDonationId from '@/utils/hashId';
import EditForm from './EditForm';
import {
	Grid,
	Typography,
	Divider,
	Button,
	useTheme,
	useMediaQuery,
} from '@mui/material';
import { ModeEditOutlineOutlined as ModeEditIcon } from '@mui/icons-material';

import InfoRow from './InfoRow';

interface DonationInfo {
	donationId: string;
	supporterName: string;
	campaignName: string;
	designation: string;
	donationDate: string;
	successDate: string;
	frequency: string;
}

interface EditFormValues {
	supporterName: string;
	campaignName: string;
	designation: string;
	frequency: string;
}

const DonationInformation = () => {
	const [donationInfo, setDonationInfo] = useState<DonationInfo>({
		donationId: '',
		supporterName: '',
		campaignName: '',
		designation: '',
		donationDate: '',
		successDate: '',
		frequency: '',
	});
	const [supporterName, setSupporterName] = useState('');
	const [campaignName, setCampaignName] = useState('');
	const [designation, setDesignation] = useState('');
	const [frequency, setFrequency] = useState('');
	const [openEditForm, setOpenEditForm] = useState(false);

	const handleEditClick = () => {
		donationInfo.donationId && setOpenEditForm(true);
	};

	const handleEditFormClose = () => {
		setOpenEditForm(false);
	};

	const handleEditFormSubmit = async (updatedInfo: EditFormValues) => {
		console.log('Updated donation information:', updatedInfo);

		const updatedDonationInfo = {
			supporter_name: updatedInfo.supporterName,
			campaign: updatedInfo.campaignName,
			designation: updatedInfo.designation,
			frequency: updatedInfo.frequency,
		};

		const { data, error } = await supabaseService
			.getSupabase()
			.from('donation')
			.update(updatedDonationInfo)
			.eq('donation_id', donationInfo.donationId);

		if (error) {
			console.error('Error updating donation info:', error.message);
			return;
		}

		console.log('Updated donation info:', data);

		setDonationInfo({
			...donationInfo,
			supporterName: updatedInfo.supporterName,
			campaignName: updatedInfo.campaignName,
			designation: updatedInfo.designation,
			frequency: updatedInfo.frequency,
		});

		setOpenEditForm(false);
	};

	const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'));

	async function fetchDonationInfo() {
		const { data, error } = await supabaseService
			.getSupabase()
			.from('donation')
			.select('*');

		if (error) {
			console.error('Error fetching donation info:', error.message);
			return;
		}

		if (data && data.length > 0) {
			const donation = data[data.length - 1];
			setDonationInfo({
				donationId: donation.donation_id,
				supporterName: donation.supporter_name,
				campaignName: donation.campaign,
				designation: donation.designation,
				donationDate: donation.donation_date,
				successDate: donation.success_date ? donation.success_date : '____',
				frequency: donation.frequency,
			});

			setSupporterName(donation.supporter_name);
			setCampaignName(donation.campaign);
			setDesignation(donation.designation);
			setFrequency(donation.frequency);
		}
	}

	useEffect(() => {
		fetchDonationInfo();
	}, [supporterName, campaignName, designation, frequency]);

	return (
		<Grid>
			<Grid container spacing={1} alignItems='center' sx={{ mb: 1 }}>
				<Grid item>
					<Typography variant='h6' noWrap sx={{ fontWeight: 'bold' }}>
						Donation Information
					</Typography>
				</Grid>
				<Button
					startIcon={<ModeEditIcon />}
					sx={{
						ml: 'auto',
						color: 'black',
						border: 1,
						borderColor: '#DDDDDD',
						fontWeight: 'bold',
					}}
					onClick={handleEditClick}
				>
					Edit
				</Button>
			</Grid>
			<Grid item xs={12} sx={{ mb: 1 }}>
				<Divider />
			</Grid>
			<Grid container spacing={2}>
				<InfoRow
					label='Donation ID'
					value={hashDonationId(donationInfo.donationId)}
					isMobile={isMobile}
				/>
				<InfoRow
					label='Supporter'
					value={donationInfo.supporterName}
					isMobile={isMobile}
				/>
				<InfoRow
					label='Campaign'
					value={donationInfo.campaignName}
					isMobile={isMobile}
				/>
				<InfoRow
					label='Designation'
					value={donationInfo.designation}
					isMobile={isMobile}
				/>
				<InfoRow
					label='Donation Date'
					value={donationInfo.donationDate}
					isMobile={isMobile}
				/>
				<InfoRow
					label='Success Date'
					value={donationInfo.successDate}
					isMobile={isMobile}
				/>
				<InfoRow
					label='Frequency'
					value={donationInfo.frequency}
					isMobile={isMobile}
				/>
			</Grid>

			<EditForm
				supporterName={supporterName}
				campaignName={campaignName}
				designation={designation}
				frequency={donationInfo.frequency}
				onSubmit={handleEditFormSubmit}
				onClose={handleEditFormClose}
				open={openEditForm}
			/>
		</Grid>
	);
};

export default DonationInformation;
