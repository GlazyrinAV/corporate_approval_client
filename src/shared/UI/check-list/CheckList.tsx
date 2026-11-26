import { useCallback, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

type ListValue = {
  id: number;
  checked: boolean;
  [key: string]: unknown;
};

type CheckListProps = {
  values: ListValue[];
  onChange?: (id: number) => void;
  fields?: string[];
};

export const CheckList = ({ values, onChange, fields }: CheckListProps) => {
  const [selectedIds, setSelectedIds] = useState<number[]>(
    values
      ?.filter((item) => item.checked)
      .map((item) => item.id) ?? []
  );

  const handleToggle = useCallback(
    (item: ListValue) => () => {
      setSelectedIds((prev) => {
        const index = prev.indexOf(item.id);
        const next = [...prev];

        if (index === -1) {
          next.push(item.id);
        } else {
          next.splice(index, 1);
        }

        return next;
      });
      onChange?.(item.id);
    },
    [onChange]
  );

  return (
    <List
      dense
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
    >
      {values?.map((item) => {
        const labelId = `checkbox-list-secondary-label-${item.id}`;

        return (
          <ListItem
            key={item.id}
            secondaryAction={
              <Checkbox
                edge='end'
                onChange={handleToggle(item)}
                checked={selectedIds.includes(item.id)}
                slotProps={{ input: { 'aria-labelledby': labelId } }}
              />
            }
            disablePadding
          >
            <ListItemButton sx={{ gap: '10px' }}>
              {fields?.length ? (
                fields.map((field) =>
                  item[field] !== undefined ? (
                    <ListItemText
                      key={`${item.id}-${field}`}
                      id={labelId}
                      primary={String(item[field])}
                    />
                  ) : null
                )
              ) : null}
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};
