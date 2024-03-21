import React from 'react';
import { Grid, Typography } from '@mui/material';

interface PaymentRightRowProps {
	title: string;
	value: string;
	icon?: React.ReactNode;
}

const PaymentRightRow = ({ title, value, icon }: PaymentRightRowProps) => {
	return (
		<Grid item xs={12}>
			<Grid container spacing={1}>
				<Grid item xs={4}>
					<Typography variant='body2' noWrap>
						{title}
					</Typography>
				</Grid>
				<Grid item xs={8}>
					{!icon ? (
						<Typography variant='body2' noWrap>
							{value}
						</Typography>
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
				</Grid>
			</Grid>
		</Grid>
	);
};

export default PaymentRightRow;
