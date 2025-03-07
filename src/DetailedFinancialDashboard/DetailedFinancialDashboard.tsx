//import { ChevronDown, ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from "react-router-dom";
import TransactionalHistory from "./TransactionalHistory";

const DetailedFinancialDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;
  console.log(userId);

  return (
    <>
      <TransactionalHistory />
      <div
        style={{
          display: "flex",
          flex: "1",
          justifyContent: "center",
          gap: "16px",
          padding: "16px",
        }}
      >
        <button
          onClick={() =>
            navigate("/fixedBill", {
              state: { userId: userId },
            })
          }
        >
          Cadastrar uma conta fixa
        </button>
        <button
          onClick={() =>
            navigate("/transactionDescription", {
              state: { userId: userId },
            })
          }
        >
          Cadastrar um tipo de transação
        </button>
        <button
          onClick={() =>
            navigate("/fixedBillList", {
              state: { userId: userId },
            })
          }
        >
          Listar as contas fixas
        </button>
        <button
          onClick={() =>
            navigate("/transactionDescriptionList", {
              state: { userId: userId },
            })
          }
        >
          Listar tipos de transação
        </button>
        <button
          onClick={() =>
            navigate("/financialTransaction", {
              state: { userId: userId },
            })
          }
        >
          Cadastrar uma transação financeira
        </button>
      </div>
    </>
  );
};

export default DetailedFinancialDashboard;
