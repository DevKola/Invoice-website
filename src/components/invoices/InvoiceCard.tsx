import { Box, Flex, Text, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import dayjs from "dayjs";
import type { InvoiceCardProps } from "../../types/types";
import { InvoiceStatusBadge } from "../ui/InvoiceStatusBadge";

function formatAmount(value: string): string {
  const num = parseFloat(value);
  if (isNaN(num)) return value;
  return num.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function InvoiceCard({ invoice, onClick }: InvoiceCardProps) {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const isDark = colorScheme === "dark";

  const cardBg = isDark ? theme.colors.darkCard[0] : theme.colors.light[0];
  const idColor = theme.colors.dark[0];
  const dateColor = isDark ? theme.colors.grayBlue[0] : theme.colors.grayBlue[0];
  const clientColor = isDark ? theme.colors.lightText[0] : theme.colors.mediumBlue[0];
  const amountColor = isDark ? theme.colors.light[0] : theme.colors.dark[0];
  const hashColor = theme.colors.mediumBlue[0];

  const formattedDue = invoice.paymentDueDate
    ? dayjs(invoice.paymentDueDate).format("DD MMM YYYY")
    : "—";

  return (
    <Box
      onClick={onClick}
      style={{
        backgroundColor: cardBg,
        borderRadius: 8,
        padding: "24px 28px",
        cursor: onClick ? "pointer" : "default",
        border: `1px solid transparent`,
        transition: "border-color 150ms ease",
      }}
      onMouseEnter={(e) => {
        if (onClick) {
          (e.currentTarget as HTMLDivElement).style.borderColor =
            theme.colors.primary[0];
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "transparent";
      }}
    >
      <Flex align="center" justify="space-between" gap="md" wrap="nowrap">
        {/* Invoice Code */}
        <Text
          fw={700}
          size="sm"
          style={{ minWidth: 80 }}
          c={isDark ? theme.colors.light[0] : idColor}
        >
          <Text component="span" c={hashColor}>
            #
          </Text>
          {invoice.invoiceCode}
        </Text>

        {/* Due Date */}
        <Text size="sm" c={dateColor} style={{ minWidth: 110 }}>
          Due {formattedDue}
        </Text>

        {/* Client Name */}
        <Text size="sm" c={clientColor} style={{ flex: 1 }}>
          {invoice.clientAddress?.name ?? "—"}
        </Text>

        {/* Amount */}
        <Text fw={700} size="md" c={amountColor} style={{ minWidth: 90, textAlign: "right" }}>
          £ {formatAmount(invoice.total)}
        </Text>

        {/* Status Badge */}
        <InvoiceStatusBadge status={invoice.status} />

        {/* Arrow */}
        <img
          src="/assets/icon-arrow-right.svg"
          alt=""
          width={7}
          height={10}
          style={{ flexShrink: 0 }}
        />
      </Flex>
    </Box>
  );
}

export default InvoiceCard;
