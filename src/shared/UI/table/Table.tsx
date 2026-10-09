import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type CellData = {
  cellLabel: string;
  cellValue: string | number | boolean | Date | object;
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
};

export const BasicTable = ({
  handleClick,
  sneakPeek = 0,
  disableView = false,
  tableData
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

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='table'>
        <TableHead>
          <TableRow>
            {checkedTableData.length > 0
              ? checkedTableData[0].rowData.map((cell, HeaderIdx) => (
                  <TableCell
                    key={`${HeaderIdx}-cell`}
                    id={`${HeaderIdx}-cell`}
                    align='center'
                  >
                    {cell.cellLabel}&nbsp;
                  </TableCell>
                ))
              : null}
          </TableRow>
        </TableHead>
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
                {row.rowData.map((cell, cellIdx) => (
                  <TableCell
                    key={`${row.id}-table-row-${cellIdx}-cell`}
                    align={cellIdx === 0 ? 'center' : 'right'}
                    onClick={() => (handleClick ? handleClick(row.id) : null)}
                  >
                    {cell.cellValue.toString()}
                  </TableCell>
                ))}
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
