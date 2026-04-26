import { useMemo } from "react";
import type { CreateInvoiceFormValues, Invoice } from "../../types/types";
import CreateInvoiceForm from "./CreateInvoiceForm";

interface EditInvoiceFormProps {
  opened: boolean;
  invoice: Invoice | null;
  onClose: () => void;
  onSubmit?: (values: CreateInvoiceFormValues) => void;
}

function getPaymentTermsValue(paymentTermsDays: Invoice["paymentTermsDays"]): string {
  const normalizedValue = String(paymentTermsDays ?? "30");

  return normalizedValue.startsWith("net-") ? normalizedValue : `net-${normalizedValue}`;
}

function mapInvoiceToFormValues(invoice: Invoice): CreateInvoiceFormValues {
  return {
    billFromStreet: invoice.senderAddress?.streetAddress ?? "",
    billFromCity: invoice.senderAddress?.city ?? "",
    billFromPostCode: invoice.senderAddress?.postalCode ?? "",
    billFromCountry: invoice.senderAddress?.country ?? "",
    clientName: invoice.clientAddress?.name ?? "",
    clientEmail: invoice.clientAddress?.email ?? "",
    billToStreet: invoice.clientAddress?.streetAddress ?? "",
    billToCity: invoice.clientAddress?.city ?? "",
    billToPostCode: invoice.clientAddress?.postalCode ?? "",
    billToCountry: invoice.clientAddress?.country ?? "",
    invoiceDate: invoice.createdAt ? new Date(invoice.createdAt) : null,
    paymentTerms: getPaymentTermsValue(invoice.paymentTermsDays),
    projectDescription: invoice.description ?? "",
    items: invoice.invoiceItems.length
      ? invoice.invoiceItems.map((item) => ({
          name: item.name ?? "",
          quantity: item.quantity,
          price: item.price,
        }))
      : [
          {
            name: "",
            quantity: "1",
            price: "0.00",
          },
        ],
  };
}

function EditInvoiceForm({ opened, invoice, onClose, onSubmit }: EditInvoiceFormProps) {
  const initialValues = useMemo(() => {
    if (!invoice) {
      return undefined;
    }

    return mapInvoiceToFormValues(invoice);
  }, [invoice]);

  if (!invoice) {
    return null;
  }

  return (
    <CreateInvoiceForm
      opened={opened}
      onClose={onClose}
      onSaveDraft={() => {}}
      onSubmit={onSubmit ?? (() => {})}
      title={`Edit #${invoice.invoiceCode}`}
      initialValues={initialValues}
      discardLabel="Cancel"
      saveDraftLabel=""
      submitLabel="Save Changes"
      showSaveDraft={false}
    />
  );
}

export default EditInvoiceForm;