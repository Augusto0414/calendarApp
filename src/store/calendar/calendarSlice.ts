import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

interface User {
  _id: string;
  name: string;
}

interface Event {
  _id?: string;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgColor?: string;
  user: User;
}

export interface CalendarState {
  events: Event[];
  activeEvent: Event | null;
}

const initialState: CalendarState = {
  events: [
    {
      _id: new Date().getTime().toString(),
      title: "Meeting",
      notes: "Pastel de cumpleaños",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
      user: {
        _id: "123s",
        name: "Augusto",
      },
    },
  ],
  activeEvent: null,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setActiveEvent: (state, action: PayloadAction<Event>) => {
      state.activeEvent = action.payload;
    },
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
      state.activeEvent = null;
    },
    updateEvent: (state, action: PayloadAction<Event>) => {
      state.events = state.events.map((event) => (event._id === action.payload._id ? action.payload : event));
    },
    deleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter((event) => event._id !== state.activeEvent?._id);
        state.activeEvent = null;
      }
    },
  },
});

export const { setActiveEvent, addEvent, updateEvent, deleteEvent } = calendarSlice.actions;

export default calendarSlice.reducer;
