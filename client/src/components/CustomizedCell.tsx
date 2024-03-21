import React from 'react';

import { TableCell } from '@mui/material';

interface CustomizedCellProps {
	content: string;
}

export default function CustomizedCell({ content }: CustomizedCellProps) {
	return (
		<TableCell
			sx={{
				borderRight: '1px solid rgba(0, 0, 0, 0.12)',
				borderBottom: 'rgba(1,1,1,1)',
			}}
		>
			{content}
		</TableCell>
	);
}
