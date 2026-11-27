import Checkbox from '@mui/material/Checkbox';
import { useMemo, useState, useCallback } from 'react';
import { Switcher } from '../../shared/ui/switcher/Switcher';
import { BasicTable, type RowData } from '../../shared/ui/table/Table';
import type { TMeetingParticipant } from '../../features/meetingParticipant/types/currentMeetingParticipant';

type TNewMeetingParticipant = TMeetingParticipant & {
  checked: boolean;
};

type NewMeetingParticipantsProps = {
  meetingParticipants: TNewMeetingParticipant[];
  onChangeChosen?: (meetingParticipant: TMeetingParticipant) => void;
  onChangePresent?: (meetingParticipant: TMeetingParticipant) => void;
};

const CELL_LABELS = {
  PRESENT: 'Присутствует на собрании',
  PARTICIPANT_NAME: 'Имя участника',
  PARTICIPANT_SHARE: 'Доля участника',
  MEETING_MEMBER: 'Участник собрания'
} as const;

export const NewMeetingParticipants = ({
  meetingParticipants,
  onChangeChosen,
  onChangePresent
}: NewMeetingParticipantsProps) => {
  const [checked, setChecked] = useState<number[]>(
    meetingParticipants
      .map((item) => (item.checked ? item.participant.id : null))
      .filter((id): id is number => id !== null)
  );

  const [present, setPresent] = useState<number[]>(
    meetingParticipants
      .map((item) => (item.isPresent ? item.participant.id : null))
      .filter((id): id is number => id !== null)
  );

  const handleToggle = useCallback(
    (value: TMeetingParticipant) => () => {
      setChecked((prev) => {
        const currentIndex = prev.indexOf(value.participant.id);
        const next = [...prev];
        if (currentIndex === -1) {
          next.push(value.participant.id);
        } else {
          next.splice(currentIndex, 1);
        }
        return next;
      });
      onChangeChosen?.(value);
    },
    [onChangeChosen]
  );

  const handleSwitch = useCallback(
    (value: TMeetingParticipant) => () => {
      setPresent((prev) => {
        const currentIndex = prev.indexOf(value.participant.id);
        const next = [...prev];
        if (currentIndex === -1) {
          next.push(value.participant.id);
        } else {
          next.splice(currentIndex, 1);
        }
        return next;
      });

      const isNowPresent = !present.includes(value.participant.id);
      onChangePresent?.({
        ...value,
        isPresent: isNowPresent
      });
    },
    [onChangePresent, present]
  );

  const tableData = useMemo<RowData[]>(() => {
    return meetingParticipants.map((participant) => ({
      id: participant.participant.id,
      rowData: [
        {
          cellLabel: CELL_LABELS.PRESENT,
          cellValue: (
            <Switcher
              value={present.includes(participant.participant.id)}
              onChange={handleSwitch(participant)}
            />
          )
        },
        {
          cellLabel: CELL_LABELS.PARTICIPANT_NAME,
          cellValue: participant.participant.name
        },
        {
          cellLabel: CELL_LABELS.PARTICIPANT_SHARE,
          cellValue: participant.participant.share
        },
        {
          cellLabel: CELL_LABELS.MEETING_MEMBER,
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
  }, [meetingParticipants, present, checked, handleSwitch, handleToggle]);

  return <BasicTable tableData={tableData} disableView />;
};
