/* eslint-disable no-unused-vars */
import { Controller } from 'react-hook-form';
import { Grid, Typography } from '@mui/material';

interface CustomizedControllerProps {
	name: string;
	label: string;
	control: any;
	// eslint-disable-next-line no-undef
	children: (field: any) => JSX.Element;
}

const CustomizedController = ({
	name,
	label,
	control,
	children,
}: CustomizedControllerProps) => (
	<Controller
		name={name}
		control={control}
		render={({ field }) => (
			<>
				<Grid container spacing={1}>
					<Grid item>
						<Typography
							variant='body2'
							noWrap
							sx={{ fontWeight: 'bold', fontSize: 16, mb: 1 }}
						>
							{label}
						</Typography>
					</Grid>
				</Grid>
				{children(field)}
			</>
		)}
	/>
);

export default CustomizedController;
