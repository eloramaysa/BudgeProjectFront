import React, { useState, useEffect } from "react";

// Enums
enum TypeTransactionEnum {
  Expense = 1, // Gastos
  Income = 2   // Receitas
}

// DTO Types
interface FinancialTransactionsDto {
  id: string;
  userId: string;
  transactionalDescriptionId: string;
  transactionalDescription: string;
  fixedBillId?: string;
  fixedBill?: string;
  typeTransaction: TypeTransactionEnum;
  value: number;
  day: number;
  month: number;
  year: number;
}

// Types for Financial Data Structure
type Transaction = {
  [key: string]: {
    value: number;
    day: number;
  };
};

type MonthData = {
  income: Transaction;
  expenses: Transaction;
};

type YearMonths = {
  [key: string]: MonthData;
};

type YearData = {
  total: {
    income: number;
    expenses: number;
  };
  months: YearMonths;
};

type FinancialData = {
  [key: string]: YearData;
};

interface TransactionalHistoryProps {
  userId: string;
}

const TransactionalHistory: React.FC<TransactionalHistoryProps> = ({ userId }) => {
  // State Management
  const [financialData, setFinancialData] = useState<FinancialData>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Expanded State
  const [expandedYears, setExpandedYears] = useState<Set<number>>(
    new Set([new Date().getFullYear()])
  );
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(
    new Set([`${new Date().getFullYear()}-${new Date().getMonth() + 1}`])
  );

  // Month Names
  const monthNames: string[] = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  // Fetch Transactions
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch Transactions
        const transactionsResponse = await fetch(
          `https://localhost:44361/api/FinancialTransactions/filter?userId=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
          }
        );

        if (!transactionsResponse.ok) {
          throw new Error('Falha ao buscar transações financeiras');
        }

        const transactionsData = await transactionsResponse.json();

        // Ensure transactionsData is an array
        const transactions: FinancialTransactionsDto[] = Array.isArray(transactionsData) 
          ? transactionsData 
          : transactionsData.data || [];

        // Process Transactions
        const processedData = processTransactionsData(transactions);

        setFinancialData(processedData);
        setIsLoading(false);
      } catch (err) {
        console.error('Erro ao buscar dados financeiros:', err);
        setError(err instanceof Error ? err.message : 'Erro ao carregar transações financeiras');
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  // Process raw transactions into financial data structure
  const processTransactionsData = (
    transactions: FinancialTransactionsDto[]
  ): FinancialData => {
    const processedData: FinancialData = {};

    transactions.forEach(transaction => {
      const year = transaction.year;
      const month = transaction.month;
      const day = transaction.day;
      
      // Determine description - combine transactional description and fixed bill if exists
      const description = transaction.fixedBill 
        ? `${transaction.transactionalDescription} (${transaction.fixedBill})`
        : transaction.transactionalDescription;

      const value = Number(transaction.value);

      // Initialize year if not exists
      if (!processedData[year]) {
        processedData[year] = {
          total: { income: 0, expenses: 0 },
          months: {}
        };
      }

      // Initialize month if not exists
      if (!processedData[year].months[month]) {
        processedData[year].months[month] = {
          income: {},
          expenses: {}
        };
      }

      // Categorize transaction
      const transactionData = processedData[year].months[month];

      if (transaction.typeTransaction === TypeTransactionEnum.Income) {
        transactionData.income[description] = {
          value: (transactionData.income[description]?.value || 0) + value,
          day: day
        };
        processedData[year].total.income += value;
      } else {
        transactionData.expenses[description] = {
          value: (transactionData.expenses[description]?.value || 0) + value,
          day: day
        };
        processedData[year].total.expenses += value;
      }
    });

    return processedData;
  };

  // Toggle Year Expansion
  const toggleYear = (year: number): void => {
    const newExpanded = new Set(expandedYears);
    if (newExpanded.has(year)) {
      newExpanded.delete(year);
    } else {
      newExpanded.add(year);
    }
    setExpandedYears(newExpanded);
  };

  // Toggle Month Expansion
  const toggleMonth = (yearMonth: string): void => {
    const newExpanded = new Set(expandedMonths);
    if (newExpanded.has(yearMonth)) {
      newExpanded.delete(yearMonth);
    } else {
      newExpanded.add(yearMonth);
    }
    setExpandedMonths(newExpanded);
  };

  // Calculate Month Totals
  const calculateMonthTotals = (transactions: MonthData): { income: number; expenses: number } => {
    return {
      income: Object.values(transactions.income).reduce((a, b) => a + b.value, 0),
      expenses: Object.values(transactions.expenses).reduce((a, b) => a + b.value, 0),
    };
  };

  // Format Day with leading zero if needed
  const formatDay = (day: number): string => {
    return day < 10 ? `0${day}` : `${day}`;
  };

  // Render Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Render Error State
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Erro: </strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  // Render Main Component
  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Dashboard Financeiro Detalhado
          </h1>
        </div>
      </header>

      <main className=" max-w-7xl mx-auto py-6 px-4">
        <div className="bg-white shadow">
          {Object.entries(financialData)
            .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
            .map(([year, yearData]) => (
              <div key={year} className="border-b last:border-b-0">
                {/* Year Header */}
                <div
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleYear(Number(year))}
                >
                  <div className="text-center flex-1">
                    <span className="font-semibold text-lg">{year}</span>
                  </div>
                  <div className="flex space-x-6 justify-end w-1/2">
                    <div className="text-green-600 w-28 text-right">
                      +R$ {yearData.total.income.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div className="text-red-600 w-28 text-right">
                      -R$ {yearData.total.expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div
                      className={`font-semibold w-28 text-right ${
                        yearData.total.income - yearData.total.expenses >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      R${" "}
                      {(
                        yearData.total.income - yearData.total.expenses
                      ).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                </div>

                {/* Months */}
                {expandedYears.has(Number(year)) && (
                  <div className="bg-gray-50">
                    {Object.entries(yearData.months)
                      .sort(
                        ([monthA], [monthB]) => Number(monthB) - Number(monthA)
                      )
                      .map(([month, monthData]) => {
                        const monthTotals = calculateMonthTotals(monthData);
                        const yearMonth = `${year}-${month}`;

                        return (
                          <div key={month} className="border-t">
                            {/* Month Header */}
                            <div
                              className="flex items-center justify-between px-6 py-3 hover:bg-gray-100 cursor-pointer"
                              onClick={() => toggleMonth(yearMonth)}
                            >
                              <div className="flex-1 text-center">
                                <span className="font-medium">
                                  {monthNames[Number(month) - 1]}
                                </span>
                              </div>
                              <div className="flex space-x-6 justify-end w-1/2">
                                <div className="text-green-600 w-28 text-right">
                                  +R$ {monthTotals.income.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                                <div className="text-red-600 w-28 text-right">
                                  -R$ {monthTotals.expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                                <div
                                  className={`font-semibold w-28 text-right ${
                                    monthTotals.income - monthTotals.expenses >= 0
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  R${" "}
                                  {(
                                    monthTotals.income - monthTotals.expenses
                                  ).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </div>
                              </div>
                            </div>

                            {/* Detailed Transactions */}
                            {expandedMonths.has(yearMonth) && (
                              <div className="px-6 py-3">
                                <div className="grid grid-cols-2 gap-4">
                                  {/* Income Details */}
                                  <div className="flex flex-col items-center">
                                    <h4 className="font-medium text-gray-700 mb-2 w-full text-center">
                                      Entradas
                                    </h4>
                                    <div className="w-full">
                                      {Object.entries(monthData.income)
                                        .sort(([, a], [, b]) => a.day - b.day)
                                        .map(([source, data], index, arr) => (
                                          <div key={source}>
                                            <div className="grid grid-cols-12 py-2 items-center">
                                              <div className="col-span-2 text-gray-600 text-sm font-medium">
                                                Dia {formatDay(data.day)}
                                              </div>
                                              <div className="col-span-7 text-gray-800">
                                                {source}
                                              </div>
                                              <div className="col-span-3 text-green-600 text-right">
                                                R$ {data.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                              </div>
                                            </div>
                                            {index < arr.length - 1 && <hr className="border-gray-200" />}
                                          </div>
                                        ))}
                                      {Object.keys(monthData.income).length === 0 && (
                                        <div className="text-center text-gray-500 italic py-2">
                                          Nenhuma entrada registrada
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Expense Details */}
                                  <div className="flex flex-col items-center">
                                    <h4 className="font-medium text-gray-700 mb-2 w-full text-center">
                                      Saídas
                                    </h4>
                                    <div className="w-full">
                                      {Object.entries(monthData.expenses)
                                        .sort(([, a], [, b]) => a.day - b.day)
                                        .map(([category, data], index, arr) => (
                                          <div key={category}>
                                            <div className="grid grid-cols-12 py-2 items-center">
                                              <div className="col-span-2 text-gray-600 text-sm font-medium">
                                                Dia {formatDay(data.day)}
                                              </div>
                                              <div className="col-span-7 text-gray-800">
                                                {category}
                                              </div>
                                              <div className="col-span-3 text-red-600 text-right">
                                                R$ {data.value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                              </div>
                                            </div>
                                            {index < arr.length - 1 && <hr className="border-gray-200" />}
                                          </div>
                                        ))}
                                      {Object.keys(monthData.expenses).length === 0 && (
                                        <div className="text-center text-gray-500 italic py-2">
                                          Nenhuma saída registrada
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default TransactionalHistory;