import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	MenuItem,
	Select,
	InputLabel,
	FormControl,
	Button,
	Grid,
} from '@mui/material';

interface EditFormProperties {
	supporterName: string;
	campaignName: string;
	designation: string;
	frequency: string;
	setSupporterName: (name: string) => void;
	setCampaignName: (name: string) => void;
	setDesignation: (desig: string) => void;
	setFrequency: (freq: string) => void;
	onSubmit: (updatedInfo: EditFormValues) => void;
	onClose: () => void;
	open?: boolean;
}

interface EditFormValues {
	supporterName: string;
	campaignName: string;
	designation: string;
	frequency: string;
}

const donationFrequencyOptions = ['One time', 'Monthly', 'Quarterly', 'Yearly'];

const donationInfoSchema = z.object({
	supporter: z.string().trim().min(1, 'Supporter name is required'),
	campaign: z.string().trim().min(1, 'Campaign name is required'),
	designation: z.string().trim().min(1, 'Designation is required'),
	frequency: z.string().trim().min(1, 'Frequency is required'),
});

const EditForm: React.FC<EditFormProperties> = ({
	supporterName,
	campaignName,
	designation,
	frequency,
	setSupporterName,
	setCampaignName,
	setDesignation,
	setFrequency,
	onSubmit,
	onClose,
	open,
}) => {
	const {
		formState: { errors },
	} = useForm({
		resolver: zodResolver(donationInfoSchema),
		defaultValues: { supporterName, campaignName, designation, frequency },
	});

	return (
		<Dialog open={open || false} onClose={onClose}>
			<DialogTitle sx={{ ml: 2, fontWeight: 'bold' }}>
				Donation Information
			</DialogTitle>
			<DialogContent>
				<Grid container spacing={2} sx={{ p: 2, maxWidth: 400 }}>
					<Grid item xs={12}>
						<TextField
							value={supporterName}
							label='Supporter Name'
							error={!!errors.supporterName}
							helperText={errors.supporterName?.message}
							fullWidth
							required
							onChange={(e) => setSupporterName(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControl fullWidth>
							<InputLabel id='campaign-select-label'>Campaign</InputLabel>
							<Select
								labelId='campaign-select-label'
								value={campaignName}
								error={!!errors.campaignName}
								required
								onChange={(e) => setCampaignName(e.target.value)}
							>
								{[
									'My awesome campaign #1',
									'My awesome campaign #2',
									'My awesome campaign #3',
									'My awesome campaign #4',
									'My awesome campaign #5',
									'My awesome campaign #6',
								].map((option) => (
									<MenuItem key={option} value={option}>
										{option}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<FormControl fullWidth>
							<InputLabel id='designation-select-label'>Designation</InputLabel>
							<Select
								labelId='designation-select-label'
								value={designation}
								error={!!errors.designation}
								required
								onChange={(e) => setDesignation(e.target.value)}
							>
								{[
									'General Fund',
									'Building Fund',
									'Education Fund',
									'Health Fund',
									'Food Fund',
									'____',
								].map((option) => (
									<MenuItem key={option} value={option}>
										{option}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<FormControl fullWidth>
							<InputLabel id='frequency-select-label'>Frequency</InputLabel>
							<Select
								labelId='frequency-select-label'
								value={frequency}
								error={!!errors.frequency}
								required
								onChange={(e) => setFrequency(e.target.value)}
							>
								{donationFrequencyOptions.map((option) => (
									<MenuItem key={option} value={option}>
										{option}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				<Button
					variant='contained'
					onClick={() =>
						onSubmit({ supporterName, campaignName, designation, frequency })
					}
				>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default EditForm;
