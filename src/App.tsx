import { Routes, Route } from "react-router-dom";
import Login from "./Login/index";
import MainLayout from "./MainLayout";
import "./App.css";
import Cadastro from "./Cadastro";
import DetailedFinancialDashboard from "./DetailedFinancialDashboard/index";
import RegisterFixedBill from "./RegisterFixedBill/index";
import RegisterFinancialTransaction from "./RegisterFinancialTransaction";
import FixedBillList from "./DetailedFinancialDashboard/FixedBillsList";
import RegisterTransactionalDescription from "./RegisterTransactionalDescription";
import TransactionalDescriptionList from "./DetailedFinancialDashboard/TransactionalDescriptionList";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/dashboard" element={<DetailedFinancialDashboard />} />
      <Route path="/fixedBill" element={<RegisterFixedBill />} />
      <Route
        path="/transactionDescription"
        element={<RegisterTransactionalDescription />}
      />
      <Route
        path="/financialTransaction"
        element={<RegisterFinancialTransaction />}
      />
      <Route path="/fixedBillList" element={<FixedBillList />} />
      <Route
        path="/transactionDescriptionList"
        element={<TransactionalDescriptionList />}
      />
    </Routes>
  );
};

export default App;
