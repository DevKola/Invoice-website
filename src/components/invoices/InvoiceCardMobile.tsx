import { Box, Text, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import dayjs from "dayjs";
import type { InvoiceCardProps } from "../../types/types";
import { InvoiceStatusBadge } from "../ui/InvoiceStatusBadge";
import styles from "./InvoiceCardMobile.module.css";

function formatAmount(value: string): string {
  const num = parseFloat(value);
  if (isNaN(num)) return value;
  return num.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function InvoiceCardMobile({ invoice, onClick }: InvoiceCardProps) {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const isDark = colorScheme === "dark";

  const cardBg = isDark ? theme.colors.darkCard[0] : theme.colors.light[0];
  const hashColor = theme.colors.mediumBlue[0];
  const textPrimary = isDark ? theme.colors.light[0] : theme.colors.dark[0];
  const textSecondary = isDark ? theme.colors.lightText[0] : theme.colors.mediumBlue[0];

  const formattedDue = invoice.paymentDueDate
    ? dayjs(invoice.paymentDueDate).format("DD MMM YYYY")
    : "—";

  return (
    <Box
      onClick={onClick}
      className={styles.card}
      style={{
        backgroundColor: cardBg,
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <Box className={styles.topRow}>
        <Text fw={700} c={textPrimary} className={styles.code}>
          <Text component="span" c={hashColor} inherit>
            #
          </Text>
          {invoice.invoiceCode}
        </Text>
        <Text fw={500} c={textSecondary} className={styles.client}>
          {invoice.clientAddress?.name ?? "—"}
        </Text>
      </Box>

      <Box className={styles.bottomRow}>
         <Box className={styles.middleRow}>
        <Text c={textSecondary} className={styles.due}>
          Due {formattedDue}
        </Text>
         <Text fw={700} c={textPrimary} className={styles.amount}>
          £ {formatAmount(invoice.total)}
        </Text>
      </Box>
       
        <Box className={styles.status}>
          <InvoiceStatusBadge status={invoice.status} />
        </Box>
      </Box>
    </Box>
  );
}

export default InvoiceCardMobile;
