import * as React from 'react';
import { Grid, Typography, Divider, Button, Box } from '@mui/material';
import {
	ModeEditOutlineOutlined as ModeEditIcon,
	HelpOutlineOutlined as HelpIcon,
	Done as DoneIcon,
	OpenInNewOutlined as OpenInNewIcon,
} from '@mui/icons-material';

import Image from 'next/image';
import mastercardIcon from '../../../public/mastercard.svg';

import PaymentLeftRow from './PaymentLeftRow';
import PaymentRightRow from './PaymentRightRow';

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
				<Grid container spacing={2}>
					<PaymentLeftRow title='Donation Amount' value={donationAmount} />
					<PaymentLeftRow
						title='Before Fees Covered'
						value={beforeFeesCovered}
					/>
					<PaymentLeftRow title='Payment Fee' value={paymentFee} />
					<PaymentLeftRow
						title='Payment Processing Fee'
						value={paymentProcessingFee}
					/>
					<PaymentLeftRow
						title='Payout Amount'
						value={payoutAmount}
						icon={<HelpIcon fontSize='small' sx={{ color: 'grey' }} />}
					/>
				</Grid>
			</Grid>
			<Grid item xs={6}>
				<Grid container spacing={2}>
					<PaymentRightRow title='Payment Processor' value={paymentProcessor} />
					<PaymentRightRow
						title='Payment ID'
						value={paymentId}
						icon={<OpenInNewIcon />}
					/>
					<PaymentRightRow title='Payment Method' value={paymentMethod} />
					<PaymentRightRow
						title='Credit Card'
						value={creditCard}
						icon={
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									width: 24,
									height: 20,
									backgroundColor: 'black',
									borderRadius: '20%',
								}}
							>
								<Image
									src={mastercardIcon}
									alt='Mastercard'
									width={24}
									height={24}
								/>
							</Box>
						}
					/>
					<PaymentRightRow
						title='Fee Covered'
						value={feeCovered}
						icon={
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
						}
					/>
					<PaymentRightRow title='Effective Fee' value={effectiveFee} />
				</Grid>
			</Grid>
		</Grid>
	);
};

export default PaymentAndFees;
