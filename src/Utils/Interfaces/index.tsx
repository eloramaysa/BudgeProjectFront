export interface FixedBillDto {
  id: string;
  userId: string;
  description: string;
  expireDate: number;
  expireMonth?: number | null;
  value: number;
  notificationSent: boolean;
}

export interface FixedBillData {
  userId: string;
  description: string;
  expireDate: number;
  expireMonth?: number | null;
  value: number;
  notificationSent: boolean;
}

export interface ApiResponse {
  success: boolean;
  data?: any;
  message?: string;
}

export interface UserFormData {
  name: string;
  email: string;
  password: string;
  allowdSendEmail: boolean;
}

export interface LoginUserFormData {
  password: string;
  email: string;
}

export interface FinancialTransactionData {
  typeTransaction: number; // 1 para gastos, 2 para ganhos
  transactionalDescriptionId: string;
  fixedBillId: string | null;
  value: number;
  month: number;
  day: number;
  userId: string;
}

export interface TransactionalDescriptionData {
  userId: string;
  transactionalDescription: string;
}

export interface TransactionalDescriptionDto {
  id: string;
  userId: string;
  transactionalDescription: string;
}

export interface FinancialTargetData{
  userId: string;
  descriptionTarget: string;
  endValue: number;
  totalValue: number;
}

export interface FinancialTargetDto{
  id: string;
  userId: string;
  descriptionTarget: string;
  endValue: number;
  totalValue: number;
}