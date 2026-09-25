import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import type { TMeetingParticipant } from '../../features/meetingParticipant/types/currentMeetingParticipant';
import { useState } from 'react';
import { Switcher } from '../../shared/ui/switcher/Switcher';

type NewMeetingParticipantsProps = {
  meetingParticipants: TNewMeetingParticipant[];
  onChangeChosen?: (meetingParticipant: TMeetingParticipant) => void;
  onChangePresent?: (meetingParticipant: TMeetingParticipant) => void;
  fileds?: string[];
};

type TNewMeetingParticipant = TMeetingParticipant & {
  checked: boolean;
};

export const NewMeetingParticipants = ({
  meetingParticipants,
  onChangeChosen,
  onChangePresent,
  fileds
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

  return (
    <List
      dense
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
    >
      {meetingParticipants?.length > 0
        ? meetingParticipants.map((meetingParticipant) => {
            const participant = meetingParticipant.participant;
            const labelId = `checkbox-list-secondary-label-${participant.id}`;
            return (
              <ListItem
                key={`item-${participant.id}`}
                secondaryAction={
                  <Checkbox
                    edge='end'
                    onChange={handleToggle(meetingParticipant)}
                    checked={checked.includes(participant.id)}
                    slotProps={{ input: { 'aria-labelledby': labelId } }}
                  />
                }
                disablePadding
              >
                <Switcher
                  value={present.includes(participant.id)}
                  onChange={handleSwitch(meetingParticipant)}
                />
                <ListItemButton>
                  {fileds?.length > 0
                    ? fileds.map((filed) =>
                        participant[filed] ? (
                          <ListItemText
                            key={`ItemButton-${participant[filed]}-${participant.id}`}
                            id={labelId}
                            primary={`${participant[filed]}`}
                          ></ListItemText>
                        ) : null
                      )
                    : null}
                </ListItemButton>
              </ListItem>
            );
          })
        : null}
    </List>
  );
};
