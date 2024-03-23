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
	supporter: string;
	campaign: string;
	designation: string;
	donationDate: string;
	successDate: string;
	frequency: string;
}

const DonationInformation = () => {
	const [donationInfo, setDonationInfo] = useState<DonationInfo>({
		donationId: '',
		supporter: '',
		campaign: '',
		designation: '',
		donationDate: '',
		successDate: '',
		frequency: '',
	});
	const [openEditForm, setOpenEditForm] = useState(false);

	const [supporterName, setSupporterName] = useState('');
	const [campaignName, setCampaignName] = useState('');
	const [desig, setDesig] = useState('');
	const [freq, setFreq] = useState('');

	const handleEditClick = () => {
		setOpenEditForm(true);
	};

	const handleEditFormClose = () => {
		setOpenEditForm(false);
	};

	const handleEditFormSubmit = (updatedInfo: any) => {
		// Handle form submission logic here (e.g., update data on server)
		console.log('Updated donation information:', updatedInfo);
		setOpenEditForm(false);
	};

	const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'));

	useEffect(() => {
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
					donationId: hashDonationId(donation.donation_id),
					supporter: donation.supporter_name,
					campaign: donation.campaign,
					designation: donation.designation,
					donationDate: donation.donation_date,
					successDate: donation.success_date ? donation.success_date : '____',
					frequency: donation.frequency,
				});
			}
		}

		fetchDonationInfo();
	}, []);

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
					value={donationInfo.donationId}
					isMobile={isMobile}
				/>
				<InfoRow
					label='Supporter'
					value={donationInfo.supporter}
					isMobile={isMobile}
				/>
				<InfoRow
					label='Campaign'
					value={donationInfo.campaign}
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
				designation={desig}
				frequency={freq}
				setSupporterName={setSupporterName}
				setCampaignName={setCampaignName}
				setDesignation={setDesig}
				setFrequency={setFreq}
				onSubmit={handleEditFormSubmit}
				onClose={handleEditFormClose}
				open={openEditForm}
			/>
		</Grid>
	);
};

export default DonationInformation;
