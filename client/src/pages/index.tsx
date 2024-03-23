import * as React from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Box, Divider, Grid } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import DonationContent from '../components/DonationContent';
import DonationInformation from '../components/DonationInfo/DonationInformation';
import PaymentAndFees from '../components/PaymentAndFees/PaymentAndFees';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const paymentAndFeesInfo = {
	donationAmount: '$2,50 USD',
	beforeFeesCovered: '$2,50 USD',
	paymentFee: '$0.00 USD',
	paymentProcessingFee: '$0.00 USD',
	payoutAmount: '$2,50 USD',
	paymentProcessor: 'Stripe',
	paymentId: 'ch_1J5g0v2eZvKYlo2Cw0XQW',
	paymentMethod: 'Credit Card',
	creditCard: '****7956',
	feeCovered: 'Covered',
	effectiveFee: '0%',
};

const drawerWidth = 240;

export default function Home() {
	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<Box sx={{ display: 'flex' }}>
				<Topbar drawerWidth={drawerWidth} />
				<Sidebar drawerWidth={drawerWidth} />
			</Box>
			<Divider />
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					bgcolor: 'background.default',
					pl: 1,
					pr: 3,
					pt: 6,
					mt: 6,
				}}
			>
				<DonationContent />
				<Grid
					sx={{
						bgcolor: 'background.default',
						pr: 3,
						pt: 6,
						mt: 4,
					}}
				>
					<DonationInformation />
				</Grid>

				<Grid
					sx={{
						bgcolor: 'background.default',
						pr: 3,
						pt: 6,
						mt: 4,
					}}
				>
					<PaymentAndFees
						donationAmount={paymentAndFeesInfo.donationAmount}
						beforeFeesCovered={paymentAndFeesInfo.beforeFeesCovered}
						paymentFee={paymentAndFeesInfo.paymentFee}
						paymentProcessingFee={paymentAndFeesInfo.paymentProcessingFee}
						payoutAmount={paymentAndFeesInfo.payoutAmount}
						paymentProcessor={paymentAndFeesInfo.paymentProcessor}
						paymentId={paymentAndFeesInfo.paymentId}
						paymentMethod={paymentAndFeesInfo.paymentMethod}
						creditCard={paymentAndFeesInfo.creditCard}
						feeCovered={paymentAndFeesInfo.feeCovered}
						effectiveFee={paymentAndFeesInfo.effectiveFee}
					/>
				</Grid>
			</Box>
			<SpeedInsights />
		</Box>
	);
}
