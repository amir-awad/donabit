import React from 'react';

import {
	AppBar,
	Toolbar,
	Typography,
	Grid,
	Chip,
	Button,
	Divider,
} from '@mui/material';

import { Done as DoneIcon, TurnLeft } from '@mui/icons-material';

interface TopbarProps {
	drawerWidth: number;
}

export default function Topbar({ drawerWidth }: TopbarProps) {
	return (
		<AppBar
			position='fixed'
			sx={{
				bgcolor: 'background.default',
				width: `calc(100% - ${drawerWidth}px)`,
				ml: `${drawerWidth}px`,
				boxShadow: 'none',
				pr: 3,
			}}
		>
			<Toolbar>
				<Grid container alignItems='center' sx={{ mb: 1 }}>
					<Grid item xs={12}>
						<Typography variant='h6' noWrap color='text.primary'>
							Donation
						</Typography>
					</Grid>
					<Grid item>
						<Typography
							variant='h5'
							noWrap
							sx={{ color: 'black', fontWeight: 'bold' }}
						>
							$2,50 USD
						</Typography>
					</Grid>
					<Grid item xs={4} sx={{ ml: 3 }}>
						<Chip
							deleteIcon={<DoneIcon />}
							onDelete={() => {}}
							label='Succeeded'
							variant='outlined'
							sx={{ bgcolor: 'lightgreen', color: '#416D19', fontSize: 16 }}
						/>
					</Grid>
				</Grid>

				<Button
					startIcon={<TurnLeft />}
					sx={{
						mt: 'auto',
						ml: 'auto',
						color: 'black',
						border: 1,
						borderColor: '#DDDDDD',
						fontWeight: 'bold',
						width: '110px',
					}}
				>
					Refund
				</Button>
			</Toolbar>
			<Grid item xs={12}>
				<Divider sx={{ mt: 1 }} />
			</Grid>
		</AppBar>
	);
}
