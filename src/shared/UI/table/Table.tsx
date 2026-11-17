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
  function checkSneakPeak(tableData: RowData[]) {
    if (
      sneakPeek > 0 &&
      tableData.length > 0 &&
      tableData[0].rowData.length > 0
    ) {
      const sneakPeakData = tableData[0].rowData.map((key) => ({
        cellLabel: key.cellLabel,
        cellValue: '...'
      }));
      return [
        ...tableData.slice(0, sneakPeek),
        { id: -1, rowData: sneakPeakData }
      ];
    }
    return tableData;
  }

  const checkedTableData = checkSneakPeak(tableData);
  const headers = getHeaders(checkedTableData);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='table'>
        {isHeadersVisible ? (
          <TableHead>
            <TableRow>
              {headers.length > 0
                ? headers.map((header, headerIdx) => (
                    <TableCell
                      key={`${headerIdx}-cell`}
                      id={`${headerIdx}-cell`}
                      align='center'
                    >
                      {header}&nbsp;
                    </TableCell>
                  ))
                : null}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {checkedTableData.length > 0 ? (
            checkedTableData.map((row) => (
              <TableRow
                key={`${row.id}-table-row`}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': !disableView
                    ? { background: '#F7E8FF', cursor: 'pointer' }
                    : null
                }}
              >
                {headers.map((header, headerIdx) => {
                  const cell = row.rowData.find(
                    (cell) => cell.cellLabel === header
                  );
                  return createCell(
                    cell,
                    row.id,
                    headerIdx,
                    handleClick,
                    emptyDataMessage
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow
              key={`Empty-table-row`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell key={`Empty-table-row-cell`} align={'center'}>
                Данные отсутствуют
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

function getHeaders(rowData: RowData[]): string[] {
  const headers = [];

  if (rowData.length > 0) {
    rowData.forEach((row) => {
      if (row.rowData.length > headers.length) {
        row.rowData
          .slice(headers.length)
          .forEach((cell) => headers.push(cell.cellLabel));
      }
    });
  }

  return headers;
}

function createCell(
  cell: CellData,
  rowId: number,
  cellId: number,
  handleClick: (id: number) => void,
  emptyDataMessage: string
): ReactNode {
  return cell ? (
    // проверка ячейки на наличие Node
    React.isValidElement(cell.cellValue) ? (
      <TableCell
        key={`${rowId}-table-row-${cellId}-cell`}
        align='center'
        onClick={() => (handleClick ? handleClick(rowId) : null)}
      >
        {cell.cellValue}
      </TableCell>
    ) : (
      // Отрисовка элемента, если там не Node
      <TableCell
        key={`${rowId}-table-row-${cellId}-cell`}
        align={typeof cell.cellValue === 'number' ? 'right' : 'center'}
        onClick={() => (handleClick ? handleClick(rowId) : null)}
      >
        {cell.cellValue.toString()}
      </TableCell>
    )
  ) : (
    // Отрисовка элемента, если для этого столбца нет данных
    <TableCell
      key={`${rowId}-table-row-${cellId}-cell`}
      align={'center'}
      onClick={() => (handleClick ? handleClick(rowId) : null)}
    >
      {emptyDataMessage}
    </TableCell>
  );
}
