// Types
type Transaction = {
  [key: string]: number;
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

type MonthTotals = {
  income: number;
  expenses: number;
};

// Component
import { useState } from "react";

const TransactionalHistory = () => {
  // Sample data
  const financialData: FinancialData = {
    "2024": {
      total: { income: 60000, expenses: 45000 },
      months: {
        "1": {
          income: {
            Salário: 4000,
            Freelance: 1000,
            Investimentos: 500,
          },
          expenses: {
            Aluguel: 1500,
            Alimentação: 800,
            Transporte: 400,
            Utilidades: 300,
          },
        },
        "2": {
          income: {
            Salário: 4000,
            Freelance: 800,
            Investimentos: 600,
          },
          expenses: {
            Aluguel: 1500,
            Alimentação: 750,
            Transporte: 350,
            Utilidades: 320,
          },
        },
      },
    },
    "2023": {
      total: { income: 55000, expenses: 42000 },
      months: {
        "12": {
          income: {
            Salário: 3800,
            Freelance: 900,
            Investimentos: 400,
          },
          expenses: {
            Aluguel: 1500,
            Alimentação: 780,
            Transporte: 380,
            Utilidades: 290,
          },
        },
      },
    },
  };

  const [expandedYears, setExpandedYears] = useState<Set<number>>(
    new Set([2024])
  );
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(
    new Set(["2024-1"])
  );

  const toggleYear = (year: number): void => {
    const newExpanded = new Set(expandedYears);
    if (newExpanded.has(year)) {
      newExpanded.delete(year);
    } else {
      newExpanded.add(year);
    }
    setExpandedYears(newExpanded);
  };

  const toggleMonth = (yearMonth: string): void => {
    const newExpanded = new Set(expandedMonths);
    if (newExpanded.has(yearMonth)) {
      newExpanded.delete(yearMonth);
    } else {
      newExpanded.add(yearMonth);
    }
    setExpandedMonths(newExpanded);
  };

  const monthNames: string[] = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const calculateMonthTotals = (transactions: MonthData): MonthTotals => {
    return {
      income: Object.values(transactions.income).reduce((a, b) => a + b, 0),
      expenses: Object.values(transactions.expenses).reduce((a, b) => a + b, 0),
    };
  };

  return (
    <div>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Financeiro Detalhado
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          {Object.entries(financialData)
            .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
            .map(([year, yearData]) => (
              <div key={year} className="border-b last:border-b-0">
                {/* Year Header */}
                <div
                  className="flex items-center px-6 py-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleYear(Number(year))}
                >
                  {expandedYears.has(Number(year)) ? (
                    <button className="h-5 w-5 text-gray-500" />
                  ) : (
                    <button className="h-5 w-5 text-gray-500" />
                  )}
                  <div className="flex-1 ml-2">
                    <span className="font-semibold text-lg">{year}</span>
                  </div>
                  <div className="flex space-x-6">
                    <div className="text-green-600">
                      +R$ {yearData.total.income.toLocaleString()}
                    </div>
                    <div className="text-red-600">
                      -R$ {yearData.total.expenses.toLocaleString()}
                    </div>
                    <div
                      className={`font-semibold ${
                        yearData.total.income - yearData.total.expenses >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      R${" "}
                      {(
                        yearData.total.income - yearData.total.expenses
                      ).toLocaleString()}
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
                              className="flex items-center px-6 py-3 hover:bg-gray-100 cursor-pointer pl-12"
                              onClick={() => toggleMonth(yearMonth)}
                            >
                              {expandedMonths.has(yearMonth) ? (
                                <button className="h-5 w-5 text-gray-500" />
                              ) : (
                                <button className="h-5 w-5 text-gray-500" />
                              )}
                              <div className="flex-1 ml-2">
                                <span className="font-medium">
                                  {monthNames[Number(month) - 1]}
                                </span>
                              </div>
                              <div className="flex space-x-6">
                                <div className="text-green-600">
                                  +R$ {monthTotals.income.toLocaleString()}
                                </div>
                                <div className="text-red-600">
                                  -R$ {monthTotals.expenses.toLocaleString()}
                                </div>
                                <div
                                  className={`font-semibold ${
                                    monthTotals.income - monthTotals.expenses >=
                                    0
                                      ? "text-green-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  R${" "}
                                  {(
                                    monthTotals.income - monthTotals.expenses
                                  ).toLocaleString()}
                                </div>
                              </div>
                            </div>

                            {/* Detailed Transactions */}
                            {expandedMonths.has(yearMonth) && (
                              <div className="px-6 py-3 pl-20">
                                <div className="grid grid-cols-2 gap-6">
                                  {/* Income Details */}
                                  <div>
                                    <h4 className="font-medium text-sm text-gray-500 mb-2">
                                      Entradas
                                    </h4>
                                    <div className="space-y-2">
                                      {Object.entries(monthData.income).map(
                                        ([source, amount]) => (
                                          <div
                                            key={source}
                                            className="flex justify-between"
                                          >
                                            <span className="text-gray-700">
                                              {source}
                                            </span>
                                            <span className="text-green-600">
                                              R$ {amount.toLocaleString()}
                                            </span>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>

                                  {/* Expense Details */}
                                  <div>
                                    <h4 className="font-medium text-sm text-gray-500 mb-2">
                                      Saídas
                                    </h4>
                                    <div className="space-y-2">
                                      {Object.entries(monthData.expenses).map(
                                        ([category, amount]) => (
                                          <div
                                            key={category}
                                            className="flex justify-between"
                                          >
                                            <span className="text-gray-700">
                                              {category}
                                            </span>
                                            <span className="text-red-600">
                                              R$ {amount.toLocaleString()}
                                            </span>
                                          </div>
                                        )
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
