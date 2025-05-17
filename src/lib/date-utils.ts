// TODO: Move to @workspace/lib/date
import { format } from "date-fns";
import { fromZonedTime } from "date-fns-tz";

type Period = {
  from: string | Date | undefined;
  to: string | Date | undefined;
};

export function formatDateRange(period?: Period) {
  if (!period?.from || !period?.to) {
    return "Select Date Range";
  }

  if (!period?.to) {
    return `${format(period.from, "LLL dd")} - ${format(period.from, "LLL dd, y")}`;
  }

  if (period.to) {
    return `${format(period.from, "LLL dd")} - ${format(period.to, "LLL dd, y")}`;
  }

  return `${format(period.from, "LLL dd, y")}`;
}

export const getBrowserTimeZone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export const convertToUTC = (
  date: string | undefined,
  timeZone: string = getBrowserTimeZone()
): string | undefined => {
  if (!date) return undefined;
  return fromZonedTime(date, timeZone).toISOString();
};

export function formatFullDate(date: string | Date): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'EEEE, MMMM d, yyyy');
}

export function formatTime(time: string): string {
    if (/^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/i.test(time)) {
        return time;
    }

    try {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours!, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12; 
        return `${formattedHour}:${minutes} ${ampm}`;
    } catch {
        return time; 
    }
}

