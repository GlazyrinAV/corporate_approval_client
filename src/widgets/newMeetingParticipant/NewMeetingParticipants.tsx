import Checkbox from '@mui/material/Checkbox';
import type { TMeetingParticipant } from '../../features/meetingParticipant/types/currentMeetingParticipant';
import { useState } from 'react';
import { Switcher } from '../../shared/ui/switcher/Switcher';
import { BasicTable, type RowData } from '../../shared/ui/table/Table';

type NewMeetingParticipantsProps = {
  meetingParticipants: TNewMeetingParticipant[];
  onChangeChosen?: (meetingParticipant: TMeetingParticipant) => void;
  onChangePresent?: (meetingParticipant: TMeetingParticipant) => void;
};

type TNewMeetingParticipant = TMeetingParticipant & {
  checked: boolean;
};

export const NewMeetingParticipants = ({
  meetingParticipants,
  onChangeChosen,
  onChangePresent
}: NewMeetingParticipantsProps) => {
  const [checked, setChecked] = useState(
    meetingParticipants
      ? meetingParticipants.map((item) =>
          item.checked ? item.participant.id : null
        )
      : []
  );

  const [present, setPresent] = useState(
    meetingParticipants
      ? meetingParticipants.map((item) =>
          item.isPresent ? item.participant.id : null
        )
      : []
  );

  const handleToggle = (value: TMeetingParticipant) => () => {
    const currentIndex = checked.indexOf(value.participant.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value.participant.id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    onChangeChosen(value);
  };

  const handleSwitch = (value: TMeetingParticipant) => () => {
    const currentIndex = present.indexOf(value.participant.id);
    const newPresent = [...present];

    if (currentIndex === -1) {
      newPresent.push(value.participant.id);
      onChangePresent({
        ...value,
        isPresent: true
      });
    } else {
      newPresent.splice(currentIndex, 1);
      onChangePresent({
        ...value,
        isPresent: false
      });
    }

    setPresent(newPresent);
  };

  const getTableData = (): RowData[] => {
    const tableData: RowData[] = meetingParticipants.map((participant) => ({
      id: participant.participant.id,
      rowData: [
        {
          cellLabel: 'Присутствует на собрании',
          cellValue: (
            <Switcher
              value={present.includes(participant.participant.id)}
              onChange={handleSwitch(participant)}
            />
          )
        },
        {
          cellLabel: 'Имя участника',
          cellValue: participant.participant.name
        },
        {
          cellLabel: 'Доля участника',
          cellValue: participant.participant.share
        },
        {
          cellLabel: 'Участник собрания',
          cellValue: (
            <Checkbox
              edge='end'
              onChange={handleToggle(participant)}
              checked={checked.includes(participant.participant.id)}
              slotProps={{
                input: {
                  'aria-labelledby': `checkbox-list-secondary-label-${participant.participant.id}`
                }
              }}
            />
          )
        }
      ]
    }));
    return tableData;
  };

  return <BasicTable tableData={getTableData()} disableView />;
};
