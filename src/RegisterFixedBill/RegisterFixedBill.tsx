import React, { useState, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Stack,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Alert,
  SelectChangeEvent,
} from "@mui/material";
import { fixedBillService } from "../Services/UserServices";
import { FixedBillData } from "../Utils/Interfaces";
import { Months } from "../Utils/Constant";

const RegisterFixedBill = () => {
  const location = useLocation();
  const userId = location.state?.userId;
  const navigate = useNavigate();

  const initialFormState: FixedBillData = {
    description: "",
    expireDate: 1,
    expireMonth: null,
    value: 0,
    userId: userId,
    notificationSent: false,
  };

  const [formData, setFormData] = useState<FixedBillData>(initialFormState);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "expireDate" || name === "value" ? Number(value) : value,
    }));
  };

  const handleMonthChange = (e: SelectChangeEvent<number | string>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      expireMonth: value === "" ? null : Number(value),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await fixedBillService.createBill(formData);

      if (result.success) {
        setSuccess("Conta Fixa cadastrada com sucesso!");
        setTimeout(() => {
          navigate("/dashboard", {
            state: { userId: result.data.userId },
          });
        }, 2000);
      } else {
        setError(result.message || "Erro ao cadastrar conta");
      }
    } catch (error) {
      setError("Erro inesperado ao processar a requisição");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 3,
      }}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Paper
        elevation={3}
        sx={{
          padding: 3,
          backgroundColor: "#fff",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: "#1976d2",
            mb: 3,
          }}
        >
          Cadastro de Conta Fixa
        </Typography>

        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Descrição da Conta"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            variant="outlined"
            InputProps={{
              placeholder: "Digite a descrição da conta",
            }}
            onFocus={(e) => e.target.select()}
            sx={{ backgroundColor: "#f8f9fa" }}
          />

          <TextField
            fullWidth
            label="Dia de Vencimento"
            name="expireDate"
            type="number"
            value={formData.expireDate}
            onChange={handleInputChange}
            required
            InputProps={{
              placeholder: "Digite o dia",
            }}
            onFocus={(e) => e.target.select()}
            inputProps={{
              min: 1,
              max: 31,
            }}
            sx={{ backgroundColor: "#f8f9fa" }}
          />

          <FormControl fullWidth sx={{ backgroundColor: "#f8f9fa" }}>
            <InputLabel id="month-select-label">Mês de Vencimento</InputLabel>
            <Select
              labelId="month-select-label"
              id="month-select"
              name="expireMonth"
              value={formData.expireMonth ?? ""}
              onChange={handleMonthChange}
              label="Mês de Vencimento"
            >
              <MenuItem value="" disabled>
                <em>Selecione o mês</em>
              </MenuItem>
              {Months.map((month) => (
                <MenuItem key={month.value} value={month.value}>
                  {month.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Valor da Conta"
            name="value"
            type="number"
            value={formData.value}
            onChange={handleInputChange}
            required
            InputProps={{
              placeholder: "Digite o valor",
            }}
            onFocus={(e) => e.target.select()}
            sx={{ backgroundColor: "#f8f9fa" }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            fullWidth
            sx={{
              mt: 2,
              py: 1.5,
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 500,
              borderRadius: 1,
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            }}
          >
            {loading ? "Cadastrando..." : "Cadastrar Conta Fixa"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default RegisterFixedBill;
