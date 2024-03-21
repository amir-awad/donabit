import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
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
	supporter: string;
	campaign: string;
	designation: string;
	frequency: string;
	onSubmit: (updatedInfo: EditFormValues) => void;
	onClose: () => void;
	open?: boolean;
}

interface EditFormValues {
	supporter: string;
	campaign: string;
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
	supporter,
	campaign,
	designation,
	frequency,
	onSubmit,
	onClose,
	open,
}) => {
	const {
		formState: { errors },
	} = useForm({
		resolver: zodResolver(donationInfoSchema),
		defaultValues: { supporter, campaign, designation, frequency },
	});

	return (
		<Dialog open={open || false} onClose={onClose}>
			<DialogTitle>Edit Donation Information</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Please edit the donation information below.
				</DialogContentText>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							value={supporter}
							label='Supporter Name'
							error={!!errors.supporter}
							helperText={errors.supporter?.message}
							fullWidth
							required
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControl fullWidth>
							<InputLabel id='campaign-select-label'>Campaign</InputLabel>
							<Select
								labelId='campaign-select-label'
								value={campaign}
								error={!!errors.campaign}
								required
							>
								{['']
									.concat(/*  Add your campaign options here */)
									.map((option) => (
										<MenuItem key={option} value={option}>
											{option}
										</MenuItem>
									))}
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<TextField
							value={designation}
							label='Designation'
							error={!!errors.designation}
							helperText={errors.designation?.message}
							fullWidth
							required
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControl fullWidth>
							<InputLabel id='frequency-select-label'>Frequency</InputLabel>
							<Select
								labelId='frequency-select-label'
								value={frequency}
								error={!!errors.frequency}
								required
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
						onSubmit({ supporter, campaign, designation, frequency })
					}
				>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default EditForm;
