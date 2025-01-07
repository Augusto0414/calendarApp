import { parseISO } from "date-fns/parseISO";

interface Event {
  end: string | Date;
  notes: string | null;
  start: string | Date;
  title: string;
  user: {
    _id?: string;
    name: string;
  };
}

export const convertDate = (events: Event[] = []): Event[] => {
  return events.map((event) => {
    event.end = parseISO(event.end as string);
    event.start = parseISO(event.start as string);
    return event;
  });
};
