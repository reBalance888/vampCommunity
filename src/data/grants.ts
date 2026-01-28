import { Grant } from '@/types'

export const grants: Grant[] = [
  {
    id: '1',
    slug: 'vamp-grant-1',
    title: 'Vamp Grant #1: Community App',
    description: 'Build the Vamp Community web app - Product Hunt for vibecoding',
    longDescription: `This grant is to vibecode the Vamp Community web app, the place where people can:

• Learn from the best curation of vibecoding resources and experts
• Submit vibecoded projects for grants
• Submit or sponsor additional grant programs
• Discover vibecoded projects
• Get discovered as a vibecoder

Think Product Hunt but specifically for vibecoding.`,
    amount: 5000,
    currency: 'USDC',
    status: 'active',
    deadline: '2025-01-22T00:00:00Z',
    requirements: [
      'Public demo link',
      'GitHub repository',
      'Short pitch on Twitter',
      'No wallet connect feature',
      'No personal data collection',
      'No download requirements',
    ],
    submitUrl: 'https://twitter.com/KSimback',
    sponsor: {
      name: 'Kevin Simback',
      twitter: 'KSimback',
      avatar: 'https://unavatar.io/twitter/KSimback',
    },
  },
  {
    id: '2',
    slug: 'vamp-grant-2',
    title: 'Vamp Grant #2: Crypto',
    description: 'Vamp a VC-funded crypto project using vibecoding tools',
    longDescription: `Find a VC funded project and go vibecode the best version of that project's vision.

The intent of this grant is to test the hypothesis - that with current vibecoding tools, what previously required millions in funding can now be done quickly with 1 or 2 people.

Important: Smart contracts MUST be on TESTNET only.`,
    amount: 5000,
    currency: 'USDC',
    status: 'upcoming',
    requirements: [
      'Choose a VC-funded project to vamp',
      'Public demo link',
      'GitHub repository',
      'Smart contracts on TESTNET only',
    ],
    sponsor: {
      name: 'Kevin Simback',
      twitter: 'KSimback',
      avatar: 'https://unavatar.io/twitter/KSimback',
    },
  },
]
