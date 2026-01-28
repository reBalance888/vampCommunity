import { Grant } from '@/types'

export const grants: Grant[] = [
  {
    id: '1',
    slug: 'vamp-grant-1',
    title: 'Vamp Grant #1: Community App',
    description: 'Vibecode the Vamp Community web app — Product Hunt for vibecoding. $5K USDC prize.',
    longDescription: `Applications for Vamp Grant #1 are now open. Winner will receive $5K in USDC.

This grant is to vibecode the Vamp Community web app, the place where people can:

• Learn from the best curation of vibecoding resources and experts
• Submit vibecoded projects for grants
• Submit or sponsor additional grant programs
• Discover vibecoded projects
• Get discovered as a vibecoder

Think Product Hunt but specifically for vibecoding.

This grant will be awarded to the best submission that meets the goals outlined above and embodies the vision of learn, build, earn.

Rules:

1. You have 48 hours to vibecode your submission and reply to this thread with your entry.

2. Your entry (via reply to this post) should contain the following:
   • Short pitch on you and your vision for the Vamp app
   • Link to the app — must be accessible publicly
   • Link to the GitHub repo

3. Do NOT submit an app that has a connect wallet feature, collects any personal data, or requires anyone to download any tool to use.`,
    amount: 5000,
    currency: 'USDC',
    status: 'active',
    deadline: '2026-01-29T00:00:00Z',
    requirements: [
      'Short pitch on you and your vision for the Vamp app',
      'Link to the app — must be accessible publicly',
      'Link to the GitHub repo',
      'No wallet connect feature',
      'No personal data collection',
      'No download requirements',
    ],
    submitUrl: 'https://x.com/KSimback/status/2016190180026102039',
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
