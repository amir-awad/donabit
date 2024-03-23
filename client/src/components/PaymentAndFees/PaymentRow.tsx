import React from 'react';
import { Grid, Typography } from '@mui/material';

interface PaymentLeftRowProps {
	title: string;
	value: string;
	icon?: React.ReactNode;
}

const PaymentLeftRow = ({ title, value, icon }: PaymentLeftRowProps) => {
	return (
		<Grid item xs={12}>
			<Grid container spacing={1}>
				<Grid item xs={title === 'Payment ID' ? 3 : 6}>
					<Typography variant='body2' noWrap>
						{title}
					</Typography>
				</Grid>
				<Grid item>
					{!icon ? (
						<Typography variant='body2' noWrap>
							{value}
						</Typography>
					) : (
						<>
							{title === 'Payout Amount' ? (
								<Grid container spacing={1}>
									<Grid item>
										<Typography variant='body2' noWrap>
											{value}
										</Typography>
									</Grid>
									<Grid item>{icon}</Grid>
								</Grid>
							) : (
								<Grid container spacing={1}>
									<Grid item>{icon}</Grid>
									<Grid item>
										<Typography variant='body2' noWrap>
											{value}
										</Typography>
									</Grid>
								</Grid>
							)}
						</>
					)}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default PaymentLeftRow;
