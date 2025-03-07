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
  Card,
  CardContent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { fixedBillService } from "../Services/UserServices";
import { FixedBillDto } from "../Utils/Interfaces";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  "&.MuiTableCell-head": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const FixedBillsList: React.FC = () => {
  const [bills, setBills] = useState<FixedBillDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const userId = location.state?.userId;

  useEffect(() => {
    const fetchBills = async () => {
      if (!userId) {
        setError("ID do usuário não fornecido");
        setLoading(false);
        return;
      }

      try {
        const result = await fixedBillService.getFixedBillsByUser(userId);
        if (result.success && result.data) {
          setBills(result.data);
        } else {
          setError(result.message || "Erro ao carregar as contas fixas");
        }
      } catch (err) {
        setError("Erro ao carregar as contas fixas");
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
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

  const totalValue = bills.reduce((sum, bill) => sum + bill.value, 0);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Contas Fixas
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" color="primary">
            Total das Contas Fixas: {formatCurrency(totalValue)}
          </Typography>
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Descrição</StyledTableCell>
              <StyledTableCell align="center">Dia Vencimento</StyledTableCell>
              <StyledTableCell align="center">Mês Vencimento</StyledTableCell>
              <StyledTableCell align="right">Valor</StyledTableCell>
              <StyledTableCell align="center">
                Status Notificação
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bills.map((bill) => (
              <TableRow key={bill.id} hover>
                <TableCell>{bill.description}</TableCell>
                <TableCell align="center">{bill.expireDate}</TableCell>
                <TableCell align="center">
                  {bill.expireMonth ? bill.expireMonth : "-"}
                </TableCell>
                <TableCell align="right">
                  {formatCurrency(bill.value)}
                </TableCell>
                <TableCell align="center">
                  {bill.notificationSent ? "✅ Enviada" : "⏳ Pendente"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FixedBillsList;
