import { createHmac } from 'crypto';
import dotenv from 'dotenv';

dotenv.config();
const HASH_SECRET = process.env.NEXT_PUBLIC_HASH_SECRET as string;

const hashDonationId = (donationId: string) => {
	const hash = createHmac('sha256', HASH_SECRET)
		.update(donationId)
		.digest('hex');

	// Truncate to first 8 characters for user-friendliness
	return hash.slice(0, 8);
};

export default hashDonationId;
