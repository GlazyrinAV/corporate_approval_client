export const PARTICIPANT_TYPE: { [key: string]: string } = {
  OWNER: 'Собственник',
  MEMBER_OF_BOARD: 'Член совета директоров'
};

export const findType = (type: string) => {
  return Object.values(PARTICIPANT_TYPE).find((value) => value === type);
};

export const findParticipantTypeLabel = (type: string) => {
  return Object.keys(PARTICIPANT_TYPE).find(
    (key) => PARTICIPANT_TYPE[key] === type
  );
};
