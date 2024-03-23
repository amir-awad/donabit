import React, { useState } from 'react';
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

const DonationInformation: React.FC<DonationInfo> = ({
	donationId,
	supporter,
	campaign,
	designation,
	donationDate,
	successDate,
	frequency,
}) => {
	const [openEditForm, setOpenEditForm] = useState(false);

	const [supporterName, setSupporterName] = useState(supporter);
	const [campaignName, setCampaignName] = useState(campaign);
	const [desig, setDesig] = useState(designation);
	const [freq, setFreq] = useState(frequency);

	const handleEditClick = () => {
		setOpenEditForm(true);
	};

	const handleEditFormClose = () => {
		setOpenEditForm(false);
		setSupporterName(supporter);
		setCampaignName(campaign);
		setDesig(designation);
		setFreq(frequency);
	};

	const handleEditFormSubmit = (updatedInfo: any) => {
		// Handle form submission logic here (e.g., update data on server)
		console.log('Updated donation information:', updatedInfo);
		setOpenEditForm(false);
	};

	const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'));

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
				<InfoRow label='Donation ID' value={donationId} isMobile={isMobile} />
				<InfoRow label='Supporter' value={supporter} isMobile={isMobile} />
				<InfoRow label='Campaign' value={campaign} isMobile={isMobile} />
				<InfoRow label='Designation' value={designation} isMobile={isMobile} />
				<InfoRow
					label='Donation Date'
					value={donationDate}
					isMobile={isMobile}
				/>
				<InfoRow label='Success Date' value={successDate} isMobile={isMobile} />
				<InfoRow label='Frequency' value={frequency} isMobile={isMobile} />
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
