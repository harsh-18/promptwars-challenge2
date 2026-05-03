import { useState } from 'react';
import { useAuth } from './AuthContext';

/**
 * Custom React Hook to encapsulate the dual-country context.
 * Provides selected country state and its associated updater function.
 * 
 * @returns {Object} An object containing the current country selection and the updater.
 */
export function useElectionContext() {
  const { user } = useAuth();
  const [selectedCountry, setSelectedCountry] = useState<'India' | 'United States'>(
    (user?.country as 'India' | 'United States') || 'India'
  );

  return { selectedCountry, setSelectedCountry };
}
