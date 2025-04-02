export interface FinancialTransaction {}

import {
  FixedBillData,
  ApiResponse,
  UserFormData,
  LoginUserFormData,
  TransactionalDescriptionData,
  FinancialTargetData, 
} from "../Utils/Interfaces";

export const userService = {
  async createUser(userData: UserFormData): Promise<ApiResponse> {
    try {
      const response = await fetch("https://localhost:44361/api/Users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          data: data,
        };
      } else {
        return {
          success: false,
          message: data.message || "Erro ao cadastrar usuário",
        };
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      return {
        success: false,
        message: "Erro de conexão com o servidor",
      };
    }
  },
  async loginUser(loginUser: LoginUserFormData): Promise<ApiResponse> {
    console.log(loginUser);
    try {
      const response = await fetch("https://localhost:44361/api/Users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(loginUser),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        return {
          success: true,
          data: data,
        };
      } else {
        return {
          success: false,
          message: data.message || "Erro ao cadastrar usuário",
        };
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      return {
        success: false,
        message: "Erro de conexão com o servidor",
      };
    }
  },
};

export const fixedBillService = {
  async createBill(FixedBillData: FixedBillData): Promise<ApiResponse> {
    try {
      const response = await fetch("https://localhost:44361/api/Fixedbills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(FixedBillData),
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          data: data,
        };
      } else {
        return {
          success: false,
          message: data.message || "Erro ao cadastrar conta fixa",
        };
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      return {
        success: false,
        message: "Erro de conexão com o servidor",
      };
    }
  },

  async getFixedBillsByUser(userId: string): Promise<ApiResponse> {
    try {
      const response = await fetch(
        `https://localhost:44361/api/Fixedbills/user/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          data: data,
        };
      } else {
        return {
          success: false,
          message: data.message || "Erro ao buscar contas fixas",
        };
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      return {
        success: false,
        message: "Erro de conexão com o servidor",
      };
    }
  },
};

export const registerFinancialTransaction = {
  async createFinancialTransaction(financialTransaction: FinancialTransaction) {
    try {
      const response = await fetch(
        "https://localhost:44361/api/Financialtransactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(financialTransaction),
        }
      );

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          data: data,
        };
      } else {
        return {
          success: false,
          message: data.message || "Erro ao cadastrar transação",
        };
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      return {
        success: false,
        message: "Erro de conexão com o servidor",
      };
    }
  },
};

export const transactionalDescriptionService = {
async createTransactional(transactionalDescriptionData: TransactionalDescriptionData): Promise<ApiResponse> {
    try {
      const response = await fetch("https://localhost:44361/api/TransactionalDescriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(transactionalDescriptionData),
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          data: data,
        };
      } else {
        return {
          success: false,
          message: data.message || "Erro ao cadastrar tipo de transação",
        };
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      return {
        success: false,
        message: "Erro de conexão com o servidor",
      };
    }
  },

  async getTransactionalByUser(userId: string): Promise<ApiResponse> {
    try {
      const response = await fetch(
        `https://localhost:44361/api/TransactionalDescriptions/user/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          data: data,
        };
      } else {
        return {
          success: false,
          message: data.message || "Erro ao buscar os tipos de transações",
        };
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      return {
        success: false,
        message: "Erro de conexão com o servidor",
      };
    }
  },
}

export const financialTargetService = {
  async createFinancialTarget(financialTargetData: FinancialTargetData): Promise<ApiResponse> {
    try {
      const response = await fetch("https://localhost:44361/api/BudgetTarget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(financialTargetData),
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          data: data,
        };
      } else {
        return {
          success: false,
          message: data.message || "Erro ao cadastrar tipo de transação",
        };
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      return {
        success: false,
        message: "Erro de conexão com o servidor",
      };
    }
  },

  async getFinancialTarget(userId: string): Promise<ApiResponse> {
    try {
      const response = await fetch(
        `https://localhost:44361/api/BudgetTarget/user/${userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          data: data,
        };
      } else {
        return {
          success: false,
          message: data.message || "Erro ao buscar contas fixas",
        };
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      return {
        success: false,
        message: "Erro de conexão com o servidor",
      };
    }
  },
}