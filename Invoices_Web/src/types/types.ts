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
    [InvoiceStatus.Draft]: 'Draft',
    [InvoiceStatus.Pending]: 'Pending',
    [InvoiceStatus.Paid]: 'Paid',
};

export interface Invoice {
    id: string;
    invoiceCode: string;
    createdAt: string;
    paymentDueDate: string;
    paymentTermsDays: string;
    total: string;
    status: InvoiceStatus;

    senderAddress: Address;
    clientAddress: ClientAddress;

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