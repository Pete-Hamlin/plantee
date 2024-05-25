import { Handlers } from "$fresh/server.ts";

const ICS_TEMPLATE = (VEVENTS) => `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:Plantee v1.0
${VEVENTS}
END:VCALENDAR
`;

const VEVENT_TEMPLATE = (UUID, DTSTART, DTEND) => `
BEGIN:VEVENT
UID:plantee-day1-${UUID}
DTSTAMP:${DTSTART}
ORGANIZER;CN=John Doe:MAILTO:john.doe@example.com
DTSTART:${DTSTART}
DTEND:${DTEND}
SUMMARY:Bastille Day Party
GEO:48.85299;2.36885
END:VEVENT
`

const tz_string = (date) => String(date.getFullYear()) + String(date.getMonth() + 1).padStart(2, '0') + String(date.getDate()).padStart(2, '0') + 'T' + String(date.getHours()).padStart(2, '0') + String(date.getMinutes()).padStart(2, '0') + String(date.getSeconds()).padStart(2, '0') + 'Z';

export const handler: Handlers = {
  GET(_req) {
    const uuid = crypto.randomUUID();
    const date = new Date();
    // console.log(date)
    const dtstart = tz_string(date)
    // console.log(dtstart)
    date.setHours(date.getHours() + 2)
    const dtend = tz_string(date)
    // console.log(dtend)

    const vevents = VEVENT_TEMPLATE(uuid, dtstart, dtend)

    const ics_text = ICS_TEMPLATE(vevents)

    return new Response(ics_text, {
      headers: { "Content-Type": "text/calendar" },
    });
  },
};