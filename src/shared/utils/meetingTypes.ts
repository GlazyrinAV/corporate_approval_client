/** Meeting type keys (API values). */
export type MeetingTypeKey = 'FMP' | 'FMS' | 'BOD';

/** Meeting type display values (UI labels). */
export type MeetingTypeValue =
  | 'Общее собрание участников'
  | 'Общее собрание акционеров'
  | 'Совет директоров';

/** Meeting type for forms — allows empty string as initial value. */
export type MeetingTypeFormValue = MeetingTypeValue | '';

/** Lookup map: key → display value. */
export const MEETING_TYPE = {
  FMP: 'Общее собрание участников',
  FMS: 'Общее собрание акционеров',
  BOD: 'Совет директоров'
} satisfies { [key: string]: string };

/**
 * Reverse lookup: finds the key by its display value.
 */
export const findMeetingTypeValue = (
  type: string
): MeetingTypeKey | undefined => {
  return (Object.keys(MEETING_TYPE) as MeetingTypeKey[]).find(
    (key) => MEETING_TYPE[key] === type
  );
};

/**
 * Looks up a display value by key, or reverse-looks up key by value.
 */
export const findType = (type: string): string | undefined => {
  if (type in MEETING_TYPE) return MEETING_TYPE[type as MeetingTypeKey];
  return findMeetingTypeValue(type);
};