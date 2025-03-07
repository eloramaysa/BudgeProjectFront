import React, { useState, FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Stack,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { transactionalDescriptionService } from "../Services/UserServices";
import { TransactionalDescriptionData } from "../Utils/Interfaces";

const RegisterTransactionalDescription = () => {
  const location = useLocation();
  const userId = location.state?.userId;
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TransactionalDescriptionData>({
    transactionalDescription: "",
    userId: userId,
  });

  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:  value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await transactionalDescriptionService.createTransactional(
        formData
      );

      if (result.success) {
        setSuccess("Tipo transação cadastrada com sucesso!");
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
          Cadastro de Tipo de transação
        </Typography>

        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Transação"
            name="transactionalDescription"
            value={formData.transactionalDescription}
            onChange={handleInputChange}
            required
            variant="outlined"
            InputProps={{
              placeholder: "Digite o tipo de transação",
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
            {loading ? "Cadastrando..." : "Cadastrar Tipo de Transação"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default RegisterTransactionalDescription;
