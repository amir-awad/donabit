import React from 'react';
import {
	Drawer,
	Toolbar,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
} from '@mui/material';

interface SidebarProps {
	drawerWidth: number;
}

export default function Sidebar({ drawerWidth }: SidebarProps) {
	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					boxSizing: 'border-box',
					border: 'none',
				},
			}}
			variant='permanent'
			anchor='left'
		>
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
				].map((text, index) => (
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
		</Drawer>
	);
}
