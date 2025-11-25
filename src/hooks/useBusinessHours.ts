import { useState, useEffect } from 'react';

export interface BusinessHours {
  [key: number]: { open: string; close: string } | null;
}

export const businessHours: BusinessHours = {
  0: { open: '08:00', close: '13:00' }, // Sunday
  1: { open: '13:00', close: '18:00' }, // Monday
  2: { open: '08:00', close: '18:00' }, // Tuesday
  3: { open: '08:00', close: '13:00' }, // Wednesday
  4: { open: '08:00', close: '18:00' }, // Thursday
  5: { open: '08:00', close: '18:00' }, // Friday
  6: { open: '08:00', close: '18:00' }, // Saturday
};

export const useBusinessHours = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkIfOpen = () => {
      const now = new Date();
      const day = now.getDay();
      const currentTime = now.toLocaleTimeString('en-GB', { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: 'Europe/Brussels'
      });

      const hours = businessHours[day];
      
      if (!hours) {
        setIsOpen(false);
        return;
      }

      const isCurrentlyOpen = currentTime >= hours.open && currentTime < hours.close;
      setIsOpen(isCurrentlyOpen);
    };

    // Check immediately
    checkIfOpen();

    // Check every minute
    const interval = setInterval(checkIfOpen, 60000);

    return () => clearInterval(interval);
  }, []);

  return { isOpen };
};
