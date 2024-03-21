import * as React from 'react';
import { Grid, Typography, Divider, Button, Box } from '@mui/material';
import {
	ModeEditOutlineOutlined as ModeEditIcon,
	HelpOutlineOutlined as HelpIcon,
	Done as DoneIcon,
	OpenInNewOutlined as OpenInNewIcon,
} from '@mui/icons-material';

import Image from 'next/image';
import mastercardIcon from '../../public/mastercard.svg';

interface PaymentAndFeesInfo {
	donationAmount: string;
	beforeFeesCovered: string;
	paymentFee: string;
	paymentProcessingFee: string;
	payoutAmount: string;
	paymentProcessor: string;
	paymentId: string;
	paymentMethod: string;
	creditCard: string;
	feeCovered: string;
	effectiveFee: string;
}

const PaymentAndFees: React.FC<PaymentAndFeesInfo> = ({
	donationAmount,
	beforeFeesCovered,
	paymentFee,
	paymentProcessingFee,
	payoutAmount,
	paymentProcessor,
	paymentId,
	paymentMethod,
	creditCard,
	feeCovered,
	effectiveFee,
}) => {
	return (
		<Grid container spacing={1}>
			<Grid container spacing={1} alignItems='center'>
				<Grid item>
					<Typography variant='h6' noWrap sx={{ fontWeight: 'bold', ml: 1 }}>
						Payment & Fees
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
				>
					Edit
				</Button>
			</Grid>
			<Grid item xs={12}>
				<Divider />
			</Grid>
			<Grid item xs={6}>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<Grid container spacing={1}>
							<Grid item xs={8}>
								<Typography variant='body2' noWrap>
									Donation Amount
								</Typography>
							</Grid>
							<Grid item>
								<Typography variant='body2' noWrap>
									{donationAmount}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={1}>
							<Grid item xs={8}>
								<Typography variant='body2' noWrap>
									Before Fees Covered
								</Typography>
							</Grid>
							<Grid item>
								<Typography variant='body2' noWrap>
									{beforeFeesCovered}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={1}>
							<Grid item xs={8}>
								<Typography variant='body2' noWrap>
									Payment Fee
								</Typography>
							</Grid>
							<Grid item>
								<Typography variant='body2' noWrap>
									{paymentFee}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={1}>
							<Grid item xs={8}>
								<Typography variant='body2' noWrap>
									Payment Processing Fee
								</Typography>
							</Grid>
							<Grid item>
								<Typography variant='body2' noWrap>
									{paymentProcessingFee}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={1}>
							<Grid item xs={8}>
								<Typography variant='body2' noWrap>
									Payout Amount
								</Typography>
							</Grid>
							<Grid item>
								<Grid container spacing={1}>
									<Grid item>
										<Typography variant='body2' noWrap>
											{payoutAmount}
										</Typography>
									</Grid>
									<Grid item>
										<HelpIcon fontSize='small' />
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={6}>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<Grid container spacing={1}>
							<Grid item xs={4}>
								<Typography variant='body2' noWrap>
									Payment Processor
								</Typography>
							</Grid>
							<Grid item xs={8}>
								<Typography variant='body2' noWrap>
									{paymentProcessor}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={1}>
							<Grid item xs={4}>
								<Typography variant='body2' noWrap>
									Payment ID
								</Typography>
							</Grid>
							<Grid item xs={8}>
								<Grid container spacing={1}>
									<Grid item>
										<OpenInNewIcon />
									</Grid>
									<Grid item>
										<Typography variant='body2' noWrap>
											{paymentId}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={1}>
							<Grid item xs={4}>
								<Typography variant='body2' noWrap>
									Payment Method
								</Typography>
							</Grid>
							<Grid item xs={8}>
								<Typography variant='body2' noWrap>
									{paymentMethod}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={1}>
							<Grid item xs={4}>
								<Typography variant='body2' noWrap>
									Credit Card
								</Typography>
							</Grid>
							<Grid item xs={8}>
								<Grid container spacing={1}>
									<Grid item>
										<Image
											src={mastercardIcon}
											alt='Mastercard'
											width={24}
											height={24}
										/>
									</Grid>
									<Grid item>
										<Typography variant='body2' noWrap>
											{creditCard}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={1}>
							<Grid item xs={4}>
								<Typography variant='body2' noWrap>
									Fee Covered
								</Typography>
							</Grid>
							<Grid item xs={8}>
								<Grid container spacing={1}>
									<Grid item>
										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center',
												width: 24,
												height: 24,
												borderRadius: '50%',
												backgroundColor: 'green',
											}}
										>
											<DoneIcon fontSize='small' sx={{ color: 'white' }} />
										</Box>
									</Grid>
									<Grid item>
										<Typography variant='body2' noWrap>
											{feeCovered}
										</Typography>
									</Grid>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12}>
						<Grid container spacing={1}>
							<Grid item xs={4}>
								<Typography variant='body2' noWrap>
									Effective Fee
								</Typography>
							</Grid>
							<Grid item xs={8}>
								<Typography variant='body2' noWrap>
									{effectiveFee}
								</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default PaymentAndFees;
