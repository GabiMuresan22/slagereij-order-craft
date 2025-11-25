import { describe, it, expect } from 'vitest';
import { businessHours } from '@/hooks/useBusinessHours';

// Helper function to generate time slots based on opening hours
const generateTimeSlots = (startHour: number, startMin: number, endHour: number, endMin: number): string[] => {
  const slots: string[] = [];
  let currentHour = startHour;
  let currentMin = startMin;
  
  while (currentHour < endHour || (currentHour === endHour && currentMin < endMin)) {
    slots.push(`${String(currentHour).padStart(2, '0')}:${String(currentMin).padStart(2, '0')}`);
    currentMin += 30;
    if (currentMin >= 60) {
      currentMin = 0;
      currentHour += 1;
    }
  }
  
  return slots;
};

// Generate time slots for a specific day based on business hours
const getTimeSlotsForDay = (dayOfWeek: number): string[] => {
  const hours = businessHours[dayOfWeek];
  if (!hours) return [];
  
  const [startHour, startMin] = hours.open.split(':').map(Number);
  const [endHour, endMin] = hours.close.split(':').map(Number);
  
  return generateTimeSlots(startHour, startMin, endHour, endMin);
};

describe('Order Page - Pick Up Time Slots', () => {
  it('should generate correct time slots for Monday (13:00 - 18:00)', () => {
    const slots = getTimeSlotsForDay(1); // Monday
    expect(slots).toEqual([
      '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
    ]);
  });

  it('should generate correct time slots for Tuesday (08:00 - 18:00)', () => {
    const slots = getTimeSlotsForDay(2); // Tuesday
    expect(slots.length).toBe(20); // 10 hours with 30-minute intervals
    expect(slots[0]).toBe('08:00');
    expect(slots[slots.length - 1]).toBe('17:30');
  });

  it('should generate correct time slots for Wednesday (08:00 - 13:00)', () => {
    const slots = getTimeSlotsForDay(3); // Wednesday
    expect(slots).toEqual([
      '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30'
    ]);
  });

  it('should generate correct time slots for Thursday (08:00 - 18:00)', () => {
    const slots = getTimeSlotsForDay(4); // Thursday
    expect(slots.length).toBe(20);
    expect(slots[0]).toBe('08:00');
    expect(slots[slots.length - 1]).toBe('17:30');
  });

  it('should generate correct time slots for Friday (08:00 - 18:00)', () => {
    const slots = getTimeSlotsForDay(5); // Friday
    expect(slots.length).toBe(20);
    expect(slots[0]).toBe('08:00');
    expect(slots[slots.length - 1]).toBe('17:30');
  });

  it('should generate correct time slots for Saturday (08:00 - 18:00)', () => {
    const slots = getTimeSlotsForDay(6); // Saturday
    expect(slots.length).toBe(20);
    expect(slots[0]).toBe('08:00');
    expect(slots[slots.length - 1]).toBe('17:30');
  });

  it('should generate correct time slots for Sunday (08:00 - 13:00)', () => {
    const slots = getTimeSlotsForDay(0); // Sunday
    expect(slots).toEqual([
      '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30'
    ]);
  });

  it('should generate 30-minute intervals', () => {
    const slots = generateTimeSlots(9, 0, 11, 0);
    expect(slots).toEqual(['09:00', '09:30', '10:00', '10:30']);
  });

  it('should handle edge case with no minutes', () => {
    const slots = generateTimeSlots(10, 0, 12, 0);
    expect(slots).toEqual(['10:00', '10:30', '11:00', '11:30']);
  });

  it('should format single-digit hours correctly', () => {
    const slots = generateTimeSlots(8, 0, 9, 0);
    expect(slots).toEqual(['08:00', '08:30']);
  });
});
