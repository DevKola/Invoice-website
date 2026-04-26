import type { CreateInvoiceFormValues, InvoiceStatus } from "../types/types";
import type { CreateInvoicePayload } from "../services/invoices.service";

export function parsePaymentTermsDays(paymentTerms: string): number {
  // e.g. "net-30" → 30, "net-1" → 1
  const match = paymentTerms.match(/(\d+)$/);
  return match ? parseInt(match[1], 10) : 30;
}

export function computePaymentDueDate(
  invoiceDate: Date | null,
  termsDays: number,
): string {
  const base = invoiceDate ?? new Date();
  const due = new Date(base);
  due.setDate(due.getDate() + termsDays);
  return due.toISOString();
}

export function mapFormValuesToPayload(
  values: CreateInvoiceFormValues,
  status: InvoiceStatus,
): CreateInvoicePayload {
  const terms = values.paymentTerms ?? "net-30";
  const termsDays = parsePaymentTermsDays(terms);
  return {
    paymentDueDate: computePaymentDueDate(values.invoiceDate, termsDays),
    paymentTermsDays: termsDays,
    status,
    description: values.projectDescription || null,
    senderAddress: {
      streetAddress: values.billFromStreet || null,
      city: values.billFromCity || null,
      postalCode: values.billFromPostCode || null,
      country: values.billFromCountry || null,
    },
    clientAddress: {
      name: values.clientName || null,
      email: values.clientEmail || null,
      streetAddress: values.billToStreet || null,
      city: values.billToCity || null,
      postalCode: values.billToPostCode || null,
      country: values.billToCountry || null,
    },
    invoiceItems: values.items.map((item) => ({
      name: item.name || null,
      quantity: item.quantity,
      price: item.price,
    })),
  };
}
