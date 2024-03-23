import React from 'react';
import {
	Drawer,
	Toolbar,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Box,
} from '@mui/material';

interface SidebarProps {
	drawerWidth: number;
}

export default function Sidebar({ drawerWidth }: SidebarProps) {
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerClose = () => {
		setMobileOpen(false);
	};

	const drawer = (
		<>
			<Toolbar />
			<List>
				{[
					'Donation',
					'Payment & Fees',
					'Personal Information',
					'Tribute',
					'Comment',
					'Source',
					'Custom Fields',
					'Emails',
					'Transactions',
					'Double the Donation',
				].map((text) => (
					<ListItem key={text} disablePadding>
						<ListItemButton
							sx={{
								borderRadius: '0px 5px 5px 0px',
								bgcolor: 'background.default',
								'&:hover': {
									bgcolor: '#B4D4FF',
								},
							}}
						>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</>
	);

	return (
		<Box
			component='nav'
			sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
			aria-label='mailbox folders'
		>
			<Drawer
				variant='temporary'
				open={mobileOpen}
				onClose={handleDrawerClose}
				ModalProps={{
					keepMounted: true,
				}}
				sx={{
					display: { xs: 'block', sm: 'none' },
					'& .MuiDrawer-paper': {
						boxSizing: 'border-box',
						width: drawerWidth,
						border: 'none',
					},
				}}
			>
				{drawer}
			</Drawer>
			<Drawer
				variant='permanent'
				sx={{
					display: { xs: 'none', sm: 'block' },
					'& .MuiDrawer-paper': {
						boxSizing: 'border-box',
						width: drawerWidth,
						border: 'none',
					},
				}}
				open
			>
				{drawer}
			</Drawer>
		</Box>
	);
}
