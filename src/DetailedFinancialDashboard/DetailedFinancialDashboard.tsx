//import { ChevronDown, ChevronRight } from 'lucide-react';
import { useLocation } from "react-router-dom";
import TransactionalHistory from "./TransactionalHistory";
import FinancialTarget from "./FinancialTarget";
import RegisterButtons from "./RegisterButtons";
const DetailedFinancialDashboard = () => {
  const location = useLocation();
  const userId = location.state?.userId;

  return (
    <>
      <FinancialTarget />
      <TransactionalHistory userId={userId} />
      <RegisterButtons userId={userId} />
    </>
  );
};

export default DetailedFinancialDashboard;
