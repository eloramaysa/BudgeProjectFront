import React from "react";
import { useNavigate } from "react-router-dom";

interface RegisterButtonsProps {
  userId: string;
}

const RegisterButtons: React.FC<RegisterButtonsProps> = ({ userId }) => {
  const navigate = useNavigate();
  return (
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
  );
};

export default RegisterButtons;
