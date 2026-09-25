import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

type CheckListProps = {
  values: TValue[];
  onChange?: (id: number) => void;
  fileds?: string[];
};

type TValue = {
  id: number;
  checked: boolean;
  [key: string]: string | number | boolean | Date | object;
};

export const CheckList = ({ values, onChange, fileds }: CheckListProps) => {
  const [checked, setChecked] = useState(
    values ? values.map((item) => (item.checked ? item.id : null)) : []
  );

  const handleToggle = (value: TValue) => () => {
    const currentIndex = checked.indexOf(value.id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value.id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    onChange(value.id);
  };

  return (
    <List
      dense
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
    >
      {values?.length > 0
        ? values.map((item) => {
            const labelId = `checkbox-list-secondary-label-${item.id}`;
            return (
              <ListItem
                key={`item-${item.id}`}
                secondaryAction={
                  <Checkbox
                    edge='end'
                    onChange={handleToggle(item)}
                    checked={checked.includes(item.id)}
                    slotProps={{ input: { 'aria-labelledby': labelId } }}
                  />
                }
                disablePadding
              >
                <ListItemButton>
                  {fileds?.length > 0
                    ? fileds.map((filed) =>
                        item[filed] ? (
                          <ListItemText
                            key={`ItemButton-${item[filed]}-${item.id}`}
                            id={labelId}
                            primary={`${item[filed]}`}
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
