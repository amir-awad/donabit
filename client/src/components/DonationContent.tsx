// use client
import React from 'react';
import {
	Table,
	TableCell,
	TableRow,
	TableHead,
	TableBody,
	Grid,
	Box,
} from '@mui/material';

import CustomizedCell from './CustomizedCell';

import Image from 'next/image';
import mastercardIcon from '../../public/mastercard.svg';

export default function DonationContent() {
	return (
		<Table sx={{ maxWidth: 650 }}>
			<TableHead>
				<TableRow>
					<CustomizedCell content='Last Update' />
					<CustomizedCell content='Supporter' />
					<CustomizedCell content='Campaign' />
					<CustomizedCell content='Payment Method' />
				</TableRow>
			</TableHead>
			<TableBody>
				<TableRow>
					<CustomizedCell content='Feb 15, 4:54 AM' />
					<CustomizedCell content='Mohamed Elsayed' />
					<CustomizedCell content='My awesome campaign #6' />
					<TableCell
						sx={{
							borderRight: '1px solid rgba(0, 0, 0, 0.12)',
							borderBottom: 'rgba(1,1,1,1)',
						}}
					>
						<Grid container spacing={1}>
							<Grid item>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										width: 30,
										height: 24,
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
							</Grid>
							<Grid item>****7956</Grid>
						</Grid>
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
}
