export const MEETING_TYPE: { [key: string]: string } = {
  FMP: 'Общее собрание участников',
  FMS: 'Общее собрание акционеров',
  BOD: 'Совет директоров'
};

export const findType = (type: string) => {
  return Object.values(MEETING_TYPE).find((value) => value === type);
};

export const findMeetingTypeValue = (type: string) => {
  return Object.keys(MEETING_TYPE).find((key) => MEETING_TYPE[key] === type)
}