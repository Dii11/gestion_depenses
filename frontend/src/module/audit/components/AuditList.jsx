import React, { useEffect,useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Typography,
    
    Card, 
    CardContent,
    TablePagination
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAudits } from '../features/auditSlice';

function AuditList() {
    const dispatch = useDispatch();
    const { audits, loading, error } = useSelector((state) => state.audits);
    const [page, setPage] = useState(0); 
    const [rowsPerPage, setRowsPerPage] = useState(5); 
    useEffect(() => {
        dispatch(fetchAudits());
    }, [dispatch]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Réinitialiser la page à 0 lorsque le nombre de lignes par page change
    };

    // Calcul des statistiques
    const statistiques = audits.reduce(
        (acc, audit) => {
            if (audit.type_action === 'ajout') {
                acc.insertions++;
            } else if (audit.type_action === 'modification') {
                acc.modifications++;
            } else if (audit.type_action === 'suppression') {
                acc.suppressions++;
            }
            return acc;
        },
        { insertions: 0, modifications: 0, suppressions: 0 }
    );

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">Erreur : {error}</Typography>;
    }

        // Paginez les données
        const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - audits.length) : 0;

    const displayedAudits = audits.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <div className='ensemble_audit'>
           <Typography variant='h5' color='success'>Audit des dépenses</Typography> 
           <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="Audit Table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Type d'action</TableCell>
                            <TableCell align="right">Date d'opération</TableCell>
                            <TableCell align="right">N° dépense</TableCell>
                            <TableCell align="right">Nom</TableCell>
                            <TableCell align="right">Ancienne dépense</TableCell>
                            <TableCell align="right">Nouvelle dépense</TableCell>
                            <TableCell align="right">Utilisateur</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayedAudits.map((audit) => (
                            <TableRow
                                key={audit.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {audit.type_action}
                                </TableCell>
                                <TableCell align="right">{audit.date_operation}</TableCell>
                                <TableCell align="right">{audit.n_depense}</TableCell>
                                <TableCell align="right">{audit.nom}</TableCell>
                                <TableCell align="right">{audit.ancien_depense}</TableCell>
                                <TableCell align="right">{audit.nouv_depense}</TableCell>
                                <TableCell align="right">{audit.utilisateur}</TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: (53) * emptyRows,
                                }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={audits.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <div className='affiche_stat'>
                <div >
                    <Card>
                        <CardContent>
                            <Typography variant="h6" color='success'>Ajouts</Typography>
                            <Typography variant="h4">{statistiques.insertions}</Typography>
                        </CardContent>
                    </Card>
                </div>
                <div >
                    <Card>
                        <CardContent>
                            <Typography variant="h6" color='secondary'>Modifications</Typography>
                            <Typography variant="h4">{statistiques.modifications}</Typography>
                        </CardContent>
                    </Card>
                </div>
                <div >
                    <Card>
                        <CardContent>
                            <Typography variant="h6" color='warning'>Suppressions</Typography>
                            <Typography variant="h4">{statistiques.suppressions}</Typography>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default AuditList;