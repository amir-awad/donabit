/* eslint-disable no-unused-vars */
import React from 'react';
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
	FormControl,
	Button,
	Grid,
	Typography,
} from '@mui/material';

import { ClearOutlined as ClearIcon } from '@mui/icons-material';

import CustomizedController from './CustomizedController';

interface EditFormProperties {
	supporterName: string;
	campaignName: string;
	designation: string;
	frequency: string;
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

const CampaignNameOptions = [
	'My awesome campaign #6',
	'My awesome campaign #5',
	'My awesome campaign #4',
	'My awesome campaign #3',
];
const DesignationOptions = ['General', 'Specific', 'Other'];
const donationFrequencyOptions = ['One time', 'Monthly', 'Quarterly', 'Yearly'];

const donationInfoSchema = z.object({
	supporterName: z
		.string()
		.trim()
		.min(3, 'Supporter name must be at least 3 characters'),
	campaignName: z.string().min(1, 'Campaign name is required'),
	designation: z.string().min(1, 'Designation is required'),
	frequency: z.string().min(1, 'Frequency is required'),
});

const EditForm: React.FC<EditFormProperties> = ({
	supporterName,
	campaignName,
	designation,
	frequency,
	onSubmit,
	onClose,
	open,
}) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(donationInfoSchema),
		defaultValues: {
			supporterName,
			campaignName,
			designation,
			frequency,
		},
	});

	return (
		<Dialog open={open || false} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<DialogTitle>
					<Grid container spacing={1}>
						<Grid item>
							<Typography
								variant='h6'
								sx={{ fontWeight: 'bold', ml: 2, fontSize: 20 }}
							>
								Donation Information
							</Typography>
						</Grid>
						<Grid item sx={{ ml: 'auto' }}>
							<Button
								onClick={onClose}
								startIcon={
									<ClearIcon sx={{ color: 'grey', width: 20, height: 20 }} />
								}
								sx={{ color: 'black', fontWeight: 'bold' }}
							/>
						</Grid>
					</Grid>
				</DialogTitle>
				<DialogContent>
					<Grid container spacing={2} sx={{ p: 2, maxWidth: 400 }}>
						<Grid item xs={12}>
							<CustomizedController
								name='supporterName'
								label='Supporter Name'
								control={control}
							>
								{(field) => (
									<TextField
										value={field.value}
										fullWidth
										required
										error={!!errors.supporterName}
										helperText={errors.supporterName?.message}
										onChange={(e) => {
											field.onChange(e);
										}}
									/>
								)}
							</CustomizedController>
						</Grid>
						<Grid item xs={12}>
							<CustomizedController
								name='campaignName'
								label='Campaign Name'
								control={control}
							>
								{(field) => (
									<FormControl fullWidth>
										<Select
											{...field}
											required
											onChange={(e) => {
												field.onChange(e);
											}}
										>
											{CampaignNameOptions.map((option) => (
												<MenuItem key={option} value={option}>
													{option}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								)}
							</CustomizedController>
						</Grid>
						<Grid item xs={12}>
							<CustomizedController
								name='designation'
								label='Designation'
								control={control}
							>
								{(field) => (
									<FormControl fullWidth>
										<Select
											{...field}
											required
											onChange={(e) => {
												field.onChange(e);
											}}
										>
											{DesignationOptions.map((option) => (
												<MenuItem key={option} value={option}>
													{option}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								)}
							</CustomizedController>
						</Grid>
						<Grid item xs={12}>
							<CustomizedController
								name='frequency'
								label='Frequency'
								control={control}
							>
								{(field) => (
									<FormControl fullWidth>
										<Select
											{...field}
											required
											onChange={(e) => {
												field.onChange(e);
											}}
										>
											{donationFrequencyOptions.map((option) => (
												<MenuItem key={option} value={option}>
													{option}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								)}
							</CustomizedController>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button variant='contained' type='submit' sx={{ m: 3, width: 100 }}>
						Save
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};

export default EditForm;
