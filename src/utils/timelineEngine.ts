export interface UserProfile {
  state: string;
  ageGroup: string;
  firstTimeVoter: boolean;
  movedRecently: boolean;
}

export interface TimelineItem {
  id: string;
  title: string;
  description: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  form?: string;
  link?: string;
}

export function generateTimeline(profile: UserProfile): TimelineItem[] {
  const items: TimelineItem[] = [];

  // General age check
  if (profile.ageGroup === 'under_18') {
    items.push({
      id: 'age-check',
      title: 'Check Qualifying Dates',
      description: 'You can apply in advance if you are turning 18. The ECI now allows 17+ citizens to apply in advance for voter registration.',
      deadline: 'Anytime before Jan 1, Apr 1, Jul 1, or Oct 1',
      priority: 'medium',
      link: 'https://voters.eci.gov.in/'
    });
  }

  // Voter Registration / Shifting
  if (profile.firstTimeVoter && profile.ageGroup !== 'under_18') {
    items.push({
      id: 'form-6',
      title: 'Register as a New Voter (Form 6)',
      description: 'Since you are a first-time voter, you must fill out Form 6 to be included in the electoral roll.',
      deadline: 'At least 15 days before your state election date',
      priority: 'high',
      form: 'Form 6',
      link: 'https://voters.eci.gov.in/'
    });
  } else if (profile.movedRecently) {
    items.push({
      id: 'form-8',
      title: 'Shift Your Constituency (Form 8)',
      description: 'Because you moved recently, you need to submit Form 8 to shift your residence within or outside your current constituency.',
      deadline: 'At least 15 days before your state election date',
      priority: 'high',
      form: 'Form 8',
      link: 'https://voters.eci.gov.in/'
    });
  }

  // General Verification
  items.push({
    id: 'verify-name',
    title: 'Verify Name on Electoral Roll',
    description: 'Ensure your name appears on the latest voter list for your constituency.',
    deadline: 'Before election notification',
    priority: 'high',
    link: 'https://electoralsearch.eci.gov.in/'
  });

  // Polling Day prep
  items.push({
    id: 'polling-day',
    title: 'Polling Day Preparation',
    description: 'Find your polling booth and ensure you have an approved valid ID (EPIC/Voter ID, Aadhaar, Passport, etc).',
    deadline: '1-2 days before polling',
    priority: 'medium'
  });

  return items;
}
