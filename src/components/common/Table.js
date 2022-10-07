import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';

const MUITable = () => {
    const { userInfo } = useSelector((state) => state.user);

    return (
        <TableContainer component={Paper} sx={{ maxWidth: '50rem', margin: 'auto' }}>
            <Table aria-label='simple-table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell align='right'>Id</TableCell>
                        <TableCell align='right'>User</TableCell>
                        <TableCell align='right'>Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userInfo && userInfo.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component='th' scope='row'>
                                <Avatar sx={{ borderRadius: 'unset' }} alt={row.name} src={row.avatar} />
                            </TableCell>
                            <TableCell align='right'>{row.id}</TableCell>
                            <TableCell align='right'>{row.name}</TableCell>
                            <TableCell align='right'>{row.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default memo(MUITable);
