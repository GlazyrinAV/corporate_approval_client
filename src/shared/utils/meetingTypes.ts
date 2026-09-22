export const MEETING_TYPE: { [key: string]: string } = {
  FMP: 'Общее собрание участников',
  FMS: 'Общее собрание акционеров',
  BOD: 'Совет директоров'
};

export const findType = (type: string) => {
  return Object.values(MEETING_TYPE).find((value) => value === type);
};
