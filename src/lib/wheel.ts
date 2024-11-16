export type Project = {
	id: number;  
	name: string;
	description: string;
	technologies: string[];
	status: string;
	features?: string[];
	repositoryUrls?: string[];
	websiteUrl?: string;
	logoUrl?: string;
};
export const projects: Project[] = [
	{
		id: 1,
		name: 'Cleverize',
		description: 'AI-powered learning tool for programmers',
		technologies: ['Next.js', 'Nest.js', 'MongoDB', 'TailwindCSS'],
		status: 'Finished',
		features: [
			'AI learning roadmap generation',
			'AI lessons generation',
			'Authentication',
			'Credits payment system'
		],
		repositoryUrls: [
			'https://github.com/0x4C656F/cleverize-backend',
			'https://github.com/0x4C656F/cleverize-frontend'
		],
		websiteUrl: '', 
		logoUrl: '/images/cleverize.webp'
	},
	{
		id: 2,
		name: 'Kins West Trading',
		description: 'Visit card for a furniture shipping company',
		technologies: ['SvelteKit', 'TailwindCSS'],
		status: 'Finished',
		websiteUrl: 'https://www.kins-west.co.uk/'
	},
	{
		id: 3,
		name: 'Fundament Trezvosti',
		description: 'A website selling courses on how to beat alcohol and drug addictions.',
		technologies: ['Next.js', 'TailwindCSS', 'MonoPay', 'Nodemailer'],
		status: 'Finished',
		features: ['Payment system', 'Success emails'],
		logoUrl: '/images/fundament-trezvosti.png',
		websiteUrl: 'https://www.fundament-trezvosti.com/'
	},
	{
		id: 4,
		name: 'No name',
		description: 'A website for a restaurant',
		technologies: ['SvelteKit', 'Supabase', 'TailwindCSS'],
		status: 'In progress',
		features: ['Table reservation system']
	},
	{
		id: 5,
		name: 'Bunny-ts',
		description: 'A Nest.js-like Bun framework',
		technologies: ['TypeScript', 'reflect-metadata'],
		status: 'On hold',
		features: [
			'Dependency Injection system',
			'Middlewares',
			'Guards',
			'Modules/Controllers/Services',
			'Working CLI'
		],
		repositoryUrls: [
			'https://github.com/orgs/bunny-ts',
			'https://www.npmjs.com/package/@bunny-ts/core'
		]
	}
];

export function calculateRotationForIndex(index: number, totalItems: number = 4): number {
	return (360 / totalItems) * index;
}
