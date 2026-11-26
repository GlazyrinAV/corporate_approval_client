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
      role='list'
      aria-label='Список выбора'
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
    >
      {values?.map((item) => {
        const labelId = `checkbox-list-secondary-label-${item.id}`;
        const checkboxId = `checkbox-${item.id}`;

        return (
          <ListItem
            key={item.id}
            secondaryAction={
              <Checkbox
                id={checkboxId}
                edge='end'
                onChange={handleToggle(item)}
                checked={selectedIds.includes(item.id)}
                aria-labelledby={labelId}
                aria-checked={selectedIds.includes(item.id)}
                role='checkbox'
              />
            }
            disablePadding
            role='listitem'
          >
            <ListItemButton
              onClick={handleToggle(item)}
              aria-labelledby={labelId}
              sx={{ gap: '10px' }}
            >
              {fields?.length ? (
                fields.map((field, fieldIndex) =>
                  item[field] !== undefined ? (
                    <ListItemText
                      key={`${item.id}-${field}`}
                      id={fieldIndex === 0 ? labelId : undefined}
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
