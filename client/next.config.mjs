/** @type {import('next').NextConfig} */
const nextConfig = {
	rewrites: async () => [
		{
			source: '/',
			destination: '/',
		},
	],
};

export default nextConfig;
