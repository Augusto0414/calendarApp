import React from 'react';

interface CalendarEventProps {
    event: {
        title: string;
        notes: string;
        start: Date;
        end: Date;
        bgColor?: string;
        user: {
            _id: string;
            name: string;
        };
    };
}

export const CalendarEvent: React.FC<CalendarEventProps> = ({ event }) => {
    const { title, user } = event;
    return (
        <>
            <strong>{title}</strong>
            <span> - {user.name}</span>
        </>
    );
};
