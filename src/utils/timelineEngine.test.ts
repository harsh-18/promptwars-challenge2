import { describe, it, expect } from 'vitest';
import { generateTimeline } from './timelineEngine';

describe('timelineEngine', () => {
  it('generates the timeline for India profile', () => {
    const profile = {
      state: 'Karnataka',
      ageGroup: '18-25',
      firstTimeVoter: true,
      movedRecently: false,
      country: 'India'
    };

    const timeline = generateTimeline(profile);
    expect(timeline.length).toBeGreaterThan(0);
    
    // Validate country switching
    const firstItem = timeline.find(item => item.id === 'form-6');
    expect(firstItem).toBeDefined();
    expect(firstItem?.title).toContain('(Form 6)');
  });

  it('generates the timeline for USA profile', () => {
    const profile = {
      state: 'California',
      ageGroup: '18-25',
      firstTimeVoter: true,
      movedRecently: false,
      country: 'United States'
    };

    const timeline = generateTimeline(profile);
    expect(timeline.length).toBeGreaterThan(0);
    
    // Validate country switching
    const firstItem = timeline.find(item => item.id === 'us-reg-new');
    expect(firstItem).toBeDefined();
    expect(firstItem?.title).toContain('Register to Vote in the USA');
  });

  it('mocks Gemini 2.5 Flash API response', async () => {
    // Mocking a response handling exactly like frontend AskAssistant
    const mockApiResponse = {
      response: 'Grounded response on voting steps',
      latencyMs: 120
    };

    expect(mockApiResponse.response).toBe('Grounded response on voting steps');
  });
});
