export interface UserProfile {
  state: string;
  ageGroup: string;
  firstTimeVoter: boolean;
  movedRecently: boolean;
  country?: string;
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
  const country = profile.country || 'India';

  if (country === 'United States') {
    // 1. Pre-Election/Age Check
    if (profile.ageGroup === 'under_18') {
      items.push({
        id: 'us-age-check',
        title: 'Check State Voting Eligibility Age',
        description: 'Depending on your US state, you can pre-register to vote at 16 or 17 so you are ready to vote on your 18th birthday.',
        deadline: 'Review state pre-registration rules',
        priority: 'medium',
        link: 'https://vote.gov/'
      });
    }

    // 2. Registration
    if (profile.firstTimeVoter && profile.ageGroup !== 'under_18') {
      items.push({
        id: 'us-reg-new',
        title: 'Register to Vote in the USA',
        description: 'First-time voters must complete voter registration with their local or state board of elections.',
        deadline: 'At least 15 to 30 days before Election Day',
        priority: 'high',
        link: 'https://vote.gov/'
      });
    } else if (profile.movedRecently) {
      items.push({
        id: 'us-reg-move',
        title: 'Update US Voter Registration (Change of Address)',
        description: 'Submit an updated voter registration to reflect your current residence in the US.',
        deadline: 'Prior to your state’s specific close of registration',
        priority: 'high',
        link: 'https://vote.gov/'
      });
    }

    // 3. Verification
    items.push({
      id: 'us-verify',
      title: 'Verify USA Voter Registration Status',
      description: 'Check that your local state records are up to date and correct.',
      deadline: 'Prior to early or mail-in voting',
      priority: 'high',
      link: 'https://www.usa.gov/confirm-voter-registration'
    });

    // 4. Polling Prep
    items.push({
      id: 'us-polling-prep',
      title: 'Polling Day Preparation (USA)',
      description: 'Find your official local US polling booth and check accepted forms of local identification (e.g., driver’s license).',
      deadline: '1-2 days before polling day',
      priority: 'medium',
      link: 'https://www.usa.gov/confirm-voter-registration'
    });

  } else {
    // Indian Edition
    if (profile.ageGroup === 'under_18') {
      items.push({
        id: 'age-check',
        title: 'Check Qualifying Dates (India)',
        description: 'You can apply in advance if you are turning 18. The ECI now allows 17+ citizens to apply in advance for voter registration.',
        deadline: 'Anytime before Jan 1, Apr 1, Jul 1, or Oct 1',
        priority: 'medium',
        link: 'https://voters.eci.gov.in/'
      });
    }

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

    items.push({
      id: 'verify-name',
      title: 'Verify Name on Electoral Roll (India)',
      description: 'Ensure your name appears on the latest voter list for your constituency.',
      deadline: 'Before election notification',
      priority: 'high',
      link: 'https://electoralsearch.eci.gov.in/'
    });

    items.push({
      id: 'polling-day',
      title: 'Polling Day Preparation (India)',
      description: 'Find your polling booth and ensure you have an approved valid ID (EPIC/Voter ID, Aadhaar, Passport, etc).',
      deadline: '1-2 days before polling',
      priority: 'medium',
      link: 'https://voters.eci.gov.in/'
    });
  }

  return items;
}
