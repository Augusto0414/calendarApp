import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

type IsLoading = true | false;

export interface CalendarState {
  events: Event[];
  activeEvent: Event | null;
  isLoading: IsLoading;
}

const initialState: CalendarState = {
  isLoading: true,
  events: [],
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
    loadEvents: (state, action: PayloadAction<Event[]>) => {
      state.isLoading = false;
      action.payload.forEach((event) => {
        const exist = state.events.some((dbEvents) => dbEvents._id === event._id);
        if (!exist) {
          state.events.push(event);
        }
      });
    },
    onLogout: (state) => {
      state.events = [];
      state.activeEvent = null;
      state.isLoading = true;
    },
  },
});

export const { setActiveEvent, addEvent, updateEvent, onLogout, deleteEvent, loadEvents } = calendarSlice.actions;

export default calendarSlice.reducer;
