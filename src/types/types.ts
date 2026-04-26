export interface ApiResponse<T> {
  success: boolean;
  statusCode: string;
  message: string;
  data: T;
  errors: unknown | null;
  timestamp: string;
}

export const InvoiceStatus = {
  Draft: 0,
  Pending: 1,
  Paid: 2,
} as const;

export type InvoiceStatus = (typeof InvoiceStatus)[keyof typeof InvoiceStatus];

export const invoiceStatusLabel: Record<InvoiceStatus, string> = {
  [InvoiceStatus.Draft]: "Draft",
  [InvoiceStatus.Pending]: "Pending",
  [InvoiceStatus.Paid]: "Paid",
};

export interface Invoice {
  id: string;
  invoiceCode: string;
  createdAt: string;
  paymentDueDate: string;
  paymentTermsDays: string;
  total: string;
  status: InvoiceStatus;
  senderAddress: Address | null;
  clientAddress: ClientAddress | null;
  description: string | null;
  invoiceItems: InvoiceItem[];
}

export interface Address {
  streetAddress: string | null;
  city: string | null;
  postalCode: string | null;
  country: string | null;
}

export interface ClientAddress {
  name: string | null;
  email: string | null;
  streetAddress: string | null;
  city: string | null;
  postalCode: string | null;
  country: string | null;
}

export interface InvoiceItem {
  id: string;
  name: string | null;
  quantity: string;
  price: string;
  total: string;
}

// Component Props
export interface PrimaryButtonProps {
  text: string | React.ReactNode;
  onClick: () => void;
  bgColor: string;
  color: string;
  hoverColor: string;
  icon?: React.ReactNode;
  iconColor?: string;
  iconBg?: string;
  lightModeTextColor?: string;
  darkModeTextColor?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export interface CreateInvoiceFormValues {
  billFromStreet: string;
  billFromCity: string;
  billFromPostCode: string;
  billFromCountry: string;
  clientName: string;
  clientEmail: string;
  billToStreet: string;
  billToCity: string;
  billToPostCode: string;
  billToCountry: string;
  invoiceDate: Date | null;
  paymentTerms: string | null;
  projectDescription: string;
  items: {
    name: string;
    quantity: string;
    price: string;
  }[];
}

export interface InvoiceStatusBadgeProps {
  status: InvoiceStatus;
}

export interface InvoiceCardProps {
  invoice: Invoice;
  onClick?: () => void;
}

export interface InvoicesHeaderProps {
  invoiceCount: number;
  selectedStatuses: InvoiceStatus[];
  onStatusChange: (statuses: InvoiceStatus[]) => void;
  onNewInvoice: () => void;
}

export interface InvoiceListProps {
  invoices: Invoice[];
  selectedStatuses: InvoiceStatus[];
  onInvoiceClick?: (invoice: Invoice) => void;
}

export interface InvoiceDetailViewProps {
  onEdit: () => void;
  onDelete: () => Promise<void> | void;
  onMarkAsPaid: () => void;
}

export interface CreateInvoiceFormProps {
  opened: boolean;
  onClose: () => void;
  onSaveDraft: (values: CreateInvoiceFormValues) => void;
  onSubmit: (values: CreateInvoiceFormValues) => void;
  title: string;
  initialValues?: CreateInvoiceFormValues;
  discardLabel: string;
  saveDraftLabel: string;
  submitLabel: string;
  showSaveDraft: boolean;
}
