import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type BasicTableProps = {
  headers: { colName: string; colValue: string }[];
  rawData: { [key: string]: string | number | boolean | Date | object }[];
  handleClick?: (id: number) => void;
  sneakPeek?: boolean;
  disableView?: boolean;
};

export const BasicTable = ({
  headers,
  rawData,
  handleClick,
  sneakPeek = false,
  disableView = false
}: BasicTableProps) => {
  function refineRawData(
    rawData: { [key: string]: string | number | boolean | Date | object }[]
  ): { [key: string]: string | number | boolean | Date }[] {
    const rows = [];
    rawData.forEach((item) => {
      const newItem = {};

      headers.forEach((header) => {
        if (item[header.colName]) {
          newItem[header.colName] = item[header.colName];
        } else {
          newItem[header.colName] = 'данные отсутствуют';
        }
      });

      rows.push(newItem);
    });
    if (sneakPeek) {
      const key = Object.keys(headers)[0];
      rows.push({ [key]: '...' });
    }
    return rows;
  }

  const data = refineRawData(rawData);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='table'>
        <TableHead>
          <TableRow>
            {headers.map((header, HeaderIdx) => (
              <TableCell
                key={`${HeaderIdx}-cell`}
                id={`${HeaderIdx}-cell`}
                align='center'
              >
                {header.colValue}&nbsp;
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data.map((row, RowIdx) => (
              <TableRow
                key={`${RowIdx}-table-row`}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': !disableView
                    ? { background: '#F7E8FF', cursor: 'pointer' }
                    : null
                }}
              >
                {Object.values(row).map((cellValue, cellIdx) => (
                  <TableCell
                    key={`${RowIdx}-table-row-${cellIdx}-cell`}
                    align={cellIdx === 0 ? 'center' : 'right'}
                    onClick={() =>
                      handleClick
                        ? handleClick(Number(rawData[RowIdx]['id']))
                        : null
                    }
                  >
                    {cellValue.toString()}
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
