import { Stack } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import type { InvoiceListProps } from "../../types/types";
import InvoiceCard from "./InvoiceCard";
import InvoiceCardMobile from "./InvoiceCardMobile";
import InvoiceEmptyState from "./InvoiceEmptyState";

function InvoiceList({ invoices, selectedStatuses, onInvoiceClick }: InvoiceListProps) {
  const isMobile = useMediaQuery("(max-width: 640px)");

  const filtered =
    selectedStatuses.length === 0
      ? invoices
      : invoices.filter((inv) => selectedStatuses.includes(inv.status));

  if (filtered.length === 0) {
    return <InvoiceEmptyState />;
  }

  return (
    <Stack gap={16}>
      {filtered.map((invoice) => (
        isMobile ? (
          <InvoiceCardMobile
            key={invoice.id}
            invoice={invoice}
            onClick={onInvoiceClick ? () => onInvoiceClick(invoice) : undefined}
          />
        ) : (
          <InvoiceCard
            key={invoice.id}
            invoice={invoice}
            onClick={onInvoiceClick ? () => onInvoiceClick(invoice) : undefined}
          />
        )
      ))}
    </Stack>
  );
}

export default InvoiceList;
