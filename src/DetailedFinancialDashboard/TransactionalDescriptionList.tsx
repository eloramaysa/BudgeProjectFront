import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { transactionalDescriptionService } from "../Services/UserServices";
import { TransactionalDescriptionDto } from "../Utils/Interfaces";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

const TransactionalDescriptionList: React.FC = () => {
  const [transactional, setTransactional] = useState<
    TransactionalDescriptionDto[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const userId = location.state?.userId;

  useEffect(() => {
    const fetchTransactional = async () => {
      if (!userId) {
        setError("ID do usuário não fornecido");
        setLoading(false);
        return;
      }
      const result =
        await transactionalDescriptionService.getTransactionalByUser(userId);
      setTransactional(result.data);
      setLoading(false);
    };

    fetchTransactional();
  }, [userId]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h5" gutterBottom>
        Tipos de transação
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Descrição</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactional.map((bill) => (
              <TableRow key={bill.id} hover>
                <TableCell>{bill.transactionalDescription}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TransactionalDescriptionList;
