import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import type { ReactNode } from 'react';
import React from 'react';

type CellData = {
  cellLabel: string;
  cellValue: string | number | boolean | Date | ReactNode;
};

export type RowData = {
  id: number;
  rowData: CellData[];
};

type BasicTableProps = {
  tableData: RowData[];
  handleClick?: (id: number) => void;
  sneakPeek?: number;
  disableView?: boolean;
  isHeadersVisible?: boolean;
  emptyDataMessage?: string;
};

export const BasicTable = ({
  handleClick,
  sneakPeek = 0,
  disableView = false,
  tableData,
  isHeadersVisible = true,
  emptyDataMessage = 'нет данных'
}: BasicTableProps) => {
  const checkedTableData = checkSneakPeak(tableData, sneakPeek);
  const headers = getHeaders(checkedTableData);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='table'>
        {isHeadersVisible && headers.length > 0 && (
          <TableHead>
            <TableRow>
              {headers.map((header, headerIdx) => (
                <TableCell
                  key={`${headerIdx}-cell`}
                  id={`${headerIdx}-cell`}
                  align='center'
                >
                  {header}&nbsp;
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {checkedTableData.length > 0 ? (
            checkedTableData.map((row) => (
              <TableRow
                key={`${row.id}-table-row`}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': !disableView
                    ? { background: '#F7E8FF', cursor: 'pointer' }
                    : undefined
                }}
              >
                {headers.map((header, headerIdx) => {
                  const cell = row.rowData.find(
                    (c) => c.cellLabel === header
                  );
                  return (
                    <TableCell
                      key={`${row.id}-table-row-${headerIdx}-cell`}
                      align={getCellAlign(cell)}
                      onClick={() => handleClick?.(row.id)}
                    >
                      {getCellContent(cell, emptyDataMessage)}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='center'>
                Данные отсутствуют
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

function checkSneakPeak(tableData: RowData[], sneakPeek: number): RowData[] {
  if (
    sneakPeek > 0 &&
    tableData.length > 0 &&
    tableData[0].rowData.length > 0
  ) {
    const sneakPeakData = tableData[0].rowData.map((cell) => ({
      cellLabel: cell.cellLabel,
      cellValue: '...' as const
    }));
    return [
      ...tableData.slice(0, sneakPeek),
      { id: -1, rowData: sneakPeakData }
    ];
  }
  return tableData;
}

function getHeaders(rowData: RowData[]): string[] {
  const headers: string[] = [];

  for (const row of rowData) {
    for (let i = headers.length; i < row.rowData.length; i++) {
      headers.push(row.rowData[i].cellLabel);
    }
  }

  return headers;
}

function getCellAlign(cell: CellData | undefined): 'left' | 'center' | 'right' {
  if (!cell) return 'center';
  return typeof cell.cellValue === 'number' ? 'right' : 'center';
}

function getCellContent(
  cell: CellData | undefined,
  emptyDataMessage: string
): ReactNode {
  if (!cell) return emptyDataMessage;
  if (React.isValidElement(cell.cellValue)) return cell.cellValue;
  return cell.cellValue.toString();
}
