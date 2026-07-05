export type PaymentMethod = "bni" | "dana" | "shopeepay";

export type PaymentTransaction = {
  id: string;
  amount: number;
  isMonthly: boolean;
  donorName: string;
  transactionDate: string;
  dueDate: string;
  status: "pending" | "success" | "failed";
  method?: PaymentMethod;
  virtualAccount?: string;
  accountName?: string;
};
