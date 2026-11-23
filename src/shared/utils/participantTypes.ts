/** Participant type keys (API values). */
export type ParticipantTypeKey = 'OWNER' | 'MEMBER_OF_BOARD';

/** Participant type display values (UI labels). */
export type ParticipantTypeValue = 'Собственник' | 'Член совета директоров';

/** Participant type for forms — allows empty string as initial value. */
export type ParticipantTypeFormValue = ParticipantTypeValue | '';

/** Lookup map: key → display value. */
export const PARTICIPANT_TYPE = {
  OWNER: 'Собственник',
  MEMBER_OF_BOARD: 'Член совета директоров'
} satisfies { [key: string]: string };

/**
 * Looks up a display value by key, or reverse-looks up key by value.
 */
export const findType = (type: string): string | undefined => {
  if (type in PARTICIPANT_TYPE)
    return PARTICIPANT_TYPE[type as ParticipantTypeKey];
  return findParticipantTypeLabel(type);
};

/**
 * Reverse lookup: finds the key by its display value.
 */
export const findParticipantTypeLabel = (
  type: string
): ParticipantTypeKey | undefined => {
  return (
    Object.keys(PARTICIPANT_TYPE) as ParticipantTypeKey[]
  ).find((key) => PARTICIPANT_TYPE[key] === type);
};
