import React from 'react';
import { Grid, Typography } from '@mui/material';
import { HelpOutlineOutlined as HelpIcon } from '@mui/icons-material';

interface InfoRowProps {
	label: string;
	value: string;
}

const InfoRow = ({ label, value }: InfoRowProps) => (
	<Grid item xs={12}>
		<Grid container spacing={1}>
			<Grid item xs={3}>
				<Typography variant='body2' noWrap>
					{label}
				</Typography>
			</Grid>
			{label === 'Donation Date' || label === 'Success Date' ? (
				<Grid item>
					<Grid container spacing={1}>
						<Grid item>
							<Typography variant='body2' noWrap>
								{value}
							</Typography>
						</Grid>
						<Grid item>
							<HelpIcon fontSize='small' sx={{ color: 'grey' }} />
						</Grid>
					</Grid>
				</Grid>
			) : (
				<Grid item>
					<Typography variant='body2' noWrap>
						{value}
					</Typography>
				</Grid>
			)}
		</Grid>
	</Grid>
);

export default InfoRow;
