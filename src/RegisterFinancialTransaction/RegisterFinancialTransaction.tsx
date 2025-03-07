import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  SelectChangeEvent,
  Paper,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import {
  fixedBillService,
  transactionalDescriptionService,
} from "../Services/UserServices";
import { Months } from "../Utils/Constant";
import {
  FixedBillDto,
  FinancialTransactionData,
  TransactionalDescriptionDto,
} from "../Utils/Interfaces";

const RegisterFinancialTransaction: React.FC = () => {
  const location = useLocation();
  const userId = location.state?.userId;
  const [bills, setBills] = useState<FixedBillDto[]>([]);
  const [transactionals, setTransactional] = useState<
  TransactionalDescriptionDto[]
  >([]);
  const [transaction, setTransaction] = useState<FinancialTransactionData>({
    typeTransaction: 1,
    transactionalDescriptionId: "",
    fixedBillId: null,
    value: 0,
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    userId: userId,
  });

  useEffect(() => {
    const fetchBills = async () => {
      const result = await fixedBillService.getFixedBillsByUser(userId);
      setBills(result.data);
    };

    const fetchTransactional = async () => {
      const result =
        await transactionalDescriptionService.getTransactionalByUser(userId);
      setTransactional(result.data);
    };

    fetchBills();
    fetchTransactional();
  }, [userId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTransaction((prev) => ({
      ...prev,
      [name]: name === "value" || name === "day" ? Number(value) : value,
    }));
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransaction((prev) => ({
      ...prev,
      typeTransaction: Number(e.target.value),
    }));
  };

  const handleMonthChange = (e: SelectChangeEvent<number>) => {
    setTransaction((prev) => ({
      ...prev,
      month: Number(e.target.value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/FinancialTransactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });

      if (response.ok) {
        alert("Transação financeira cadastrada com sucesso!");
        // Resetar o formulário
        setTransaction({
          typeTransaction: 1,
          transactionalDescriptionId: "",
          fixedBillId: null,
          value: 0,
          month: new Date().getMonth() + 1,
          day: new Date().getDate(),
          userId: userId,
        });
      } else {
        const errorData = await response.json();
        alert(
          `Erro ao cadastrar transação: ${
            errorData.message || "Erro desconhecido"
          }`
        );
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao enviar transação");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 400,
          width: "100%",
          padding: 3,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Registrar Transação Financeira
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <RadioGroup
            row
            name="typeTransaction"
            value={transaction.typeTransaction}
            onChange={handleTypeChange}
            sx={{ mb: 2 }}
          >
            <FormControlLabel value={1} control={<Radio />} label="Gastos" />
            <FormControlLabel value={2} control={<Radio />} label="Ganhos" />
          </RadioGroup>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Categoria da Transação</InputLabel>
            <Select
              value={transaction.transactionalDescriptionId}
              label="Categoria da Transação"
              onChange={(e) =>
                setTransaction((prev) => ({
                  ...prev,
                  transactionalDescriptionId: e.target.value as string,
                }))
              }
            >
              {transactionals.length > 0 ? (
                transactionals.map((transactional) => (
                  <MenuItem key={transactional.id} value={transactional.id}>
                    {transactional.transactionalDescription}
                  </MenuItem>
                ))
              ) : (
                <MenuItem>{"Nenhuma transação cadastrada"}</MenuItem>
              )}
            </Select>
          </FormControl>
          {transaction.typeTransaction === 1 && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Conta fixa</InputLabel>
              <Select
                value={transaction.transactionalDescriptionId}
                label="Conta fixa"
                onChange={(e) =>
                  setTransaction((prev) => ({
                    ...prev,
                    transactionalDescriptionId: e.target.value as string,
                  }))
                }
              >
                {bills.length > 0 ? (
                  bills.map((bill) => (
                    <MenuItem key={bill.id} value={bill.id}>
                      {bill.description}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>{"Nenhuma conta fixa cadastrada"}</MenuItem>
                )}
              </Select>
            </FormControl>
          )}
          <TextField
            fullWidth
            label="Valor"
            name="value"
            type="number"
            value={transaction.value}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            variant="outlined"
          />

          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="Dia"
              name="day"
              type="number"
              value={transaction.day}
              onChange={handleInputChange}
              inputProps={{
                min: 1,
                max: 31,
              }}
              variant="outlined"
            />

            <FormControl fullWidth>
              <InputLabel>Mês</InputLabel>
              <Select
                value={transaction.month}
                label="Mês"
                onChange={handleMonthChange}
              >
                {Months.map((month) => (
                  <MenuItem key={month.value} value={month.value}>
                    {month.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Cadastrar Transação
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterFinancialTransaction;
