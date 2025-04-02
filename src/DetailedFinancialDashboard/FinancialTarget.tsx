import React, { useState, ChangeEvent } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  LinearProgress,
  IconButton,
  CardHeader,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useLocation } from "react-router-dom";
import { financialTargetService } from "../Services/UserServices";

interface MetaFinanceira {
  id: number;
  descricao: string;
  valorObjetivo: number;
  valorAtual: number;
  porcentagem: number;
}

const FinancialTarget: React.FC = () => {
  const location = useLocation();
  const userId = location.state?.userId;

  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [metas, setMetas] = useState<MetaFinanceira[]>([]);
  const [novaMeta, setNovaMeta] = useState({
    descricao: "",
    valorObjetivo: "",
    valorAtual: "",
  });

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNovaMeta({ ...novaMeta, [name]: value });
  };

  const adicionarMeta = async () => {
    const valorObjetivoNum = parseFloat(novaMeta.valorObjetivo);
    const valorAtualNum = parseFloat(novaMeta.valorAtual);
    if (novaMeta.descricao && valorObjetivoNum > 0) {
      const novaMetas = [
        ...metas,
        {
          id: Date.now(),
          descricao: novaMeta.descricao,
          valorObjetivo: valorObjetivoNum,
          valorAtual: valorAtualNum,
          porcentagem: Math.min(100, Math.round((valorAtualNum / valorObjetivoNum) * 100)),
        },
      ];
      setMetas(novaMetas);
      setNovaMeta({ descricao: "", valorObjetivo: "", valorAtual: "" });
      setIsModalOpen(false);

      // Enviar os dados para o serviço
      await financialTargetService.createFinancialTarget({
        userId: userId,
        descriptionTarget: novaMeta.descricao,
        endValue: valorObjetivoNum,
        totalValue: valorAtualNum,
      });
    }
  };

  return (
    <Card sx={{ width: '100%', mb: 3, borderRadius: 1 }}>
    <CardHeader
      title={<Typography variant="h6" fontWeight="bold">Metas Financeiras</Typography>}
      action={
        <Box  textAlign="center" display="flex" alignItems="center">
          <Button
            startIcon={<AddIcon />}
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            sx={{ color: "black", textTransform: "none", fontSize: 14 }}
          >
            Adicionar meta financeira
          </Button>
          <IconButton onClick={toggleExpanded} size="small">
            {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>
      }
      sx={{ cursor: 'pointer', py: 1, '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' } }}
      onClick={toggleExpanded}
    />
      {isExpanded && (
        <CardContent>
          {metas.length === 0 ? (
            <Typography color="text.secondary">Nenhuma meta financeira cadastrada</Typography>
          ) : (
            metas.map((meta) => (
              <Box key={meta.id} p={2} bgcolor="white" borderRadius={2} mb={2} boxShadow={1}>
                <Typography fontWeight="medium">{meta.descricao}</Typography>
                <Typography fontWeight="medium">
                  R$ {meta.valorAtual.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} /
                  R$ {meta.valorObjetivo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={meta.porcentagem}
                  color={meta.porcentagem < 30 ? "warning" : meta.porcentagem < 70 ? "primary" : "success"}
                  sx={{ height: 8, borderRadius: 1 }}
                />
              </Box>
            ))
          )}
        </CardContent>
      )}

      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Adicionar meta financeira</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} pt={1}>
            <TextField
              fullWidth
              label="Descrição da meta"
              name="descricao"
              value={novaMeta.descricao}
              onChange={handleInputChange}
              placeholder="Ex: Comprar um carro"
            />
            <TextField
              fullWidth
              label="Valor objetivo (R$)"
              name="valorObjetivo"
              type="number"
              value={novaMeta.valorObjetivo}
              onChange={handleInputChange}
              placeholder="Ex: 50000"
            />
            <TextField
              fullWidth
              label="Valor atual (R$)"
              name="valorAtual"
              type="number"
              value={novaMeta.valorAtual}
              onChange={handleInputChange}
              placeholder="Ex: 15000"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} color="inherit">
            Cancelar
          </Button>
          <Button onClick={adicionarMeta} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default FinancialTarget;
