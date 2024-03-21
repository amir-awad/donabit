import React, { useState } from 'react';
import EditForm from './EditForm';
import { Grid, Typography, Divider, Button } from '@mui/material';
import {
	ModeEditOutlineOutlined as ModeEditIcon,
	HelpOutlineOutlined as HelpIcon,
} from '@mui/icons-material';

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
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<Grid container spacing={1}>
						<Grid item xs={4}>
							<Typography variant='body2' noWrap>
								Donation ID
							</Typography>
						</Grid>
						<Grid item xs={8}>
							<Typography variant='body2' noWrap>
								{donationId}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={1}>
						<Grid item xs={4}>
							<Typography variant='body2' noWrap>
								Supporter
							</Typography>
						</Grid>
						<Grid item xs={8}>
							<Typography variant='body2' noWrap>
								{supporter}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={1}>
						<Grid item xs={4}>
							<Typography variant='body2' noWrap>
								Campaign
							</Typography>
						</Grid>
						<Grid item xs={8}>
							<Typography variant='body2' noWrap>
								{campaign}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={1}>
						<Grid item xs={4}>
							<Typography variant='body2' noWrap>
								Designation
							</Typography>
						</Grid>
						<Grid item xs={8}>
							<Typography variant='body2' noWrap>
								{designation}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={1}>
						<Grid item xs={4}>
							<Typography variant='body2' noWrap>
								Donation Date
							</Typography>
						</Grid>
						<Grid item xs={8}>
							<Grid container spacing={1}>
								<Grid item>
									<Typography variant='body2' noWrap>
										{donationDate}
									</Typography>
								</Grid>
								<Grid item>
									<HelpIcon fontSize='small' />
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={1}>
						<Grid item xs={4}>
							<Typography variant='body2' noWrap>
								Success Date
							</Typography>
						</Grid>
						<Grid item xs={8}>
							<Grid container spacing={1}>
								<Grid item>
									<Typography variant='body2' noWrap>
										{successDate}
									</Typography>
								</Grid>
								<Grid item>
									<HelpIcon fontSize='small' />
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Grid container spacing={1}>
						<Grid item xs={4}>
							<Typography variant='body2' noWrap>
								Frequency
							</Typography>
						</Grid>
						<Grid item xs={8}>
							<Typography variant='body2' noWrap>
								{frequency}
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			<EditForm
				supporter={supporter}
				campaign={campaign}
				designation={designation}
				frequency={frequency}
				onSubmit={handleEditFormSubmit}
				onClose={handleEditFormClose}
				open={openEditForm}
			/>
		</Grid>
	);
};

export default DonationInformation;
