import { Box, Text, useMantineColorScheme } from "@mantine/core";
import { InvoiceStatus, invoiceStatusLabel, type InvoiceStatusBadgeProps } from "../../types/types";
import { useMediaQuery } from "@mantine/hooks";

const statusConfig: Record<
  InvoiceStatus,
  { color: string; colorDark?: string; bgLight: string; bgDark: string }
> = {
  [InvoiceStatus.Paid]: {
    color: "#33D7A0",
    bgLight: "rgba(51, 215, 160, 0.06)",
    bgDark: "rgba(51, 215, 160, 0.06)",
  },
  [InvoiceStatus.Pending]: {
    color: "#FF8F00",
    bgLight: "rgba(255, 143, 0, 0.06)",
    bgDark: "rgba(255, 143, 0, 0.06)",
  },
  [InvoiceStatus.Draft]: {
    color: "#373B53",
    colorDark: "#DFE3FA",
    bgLight: "rgba(55, 59, 83, 0.06)",
    bgDark: "rgba(223, 227, 250, 0.06)",
  },
};

export function InvoiceStatusBadge({ status }: InvoiceStatusBadgeProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const config = statusConfig[status];
  const isMobile = useMediaQuery("(max-width: 760px)");
  const color =
    isDark && status === InvoiceStatus.Draft
      ? config.colorDark ?? config.color
      : config.color;
  const bg = isDark ? config.bgDark : config.bgLight;

  return (
    <Box
      style={{
        backgroundColor: bg,
        borderRadius: 6,
        padding: isMobile ? "7px 0" : "10px 0",
        minWidth: isMobile ? 80 : 104,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <Box
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: color,
          flexShrink: 0,
        }}
      />
      <Text fw={700} size={isMobile ? "xs" : "sm"} c={color}>
        {invoiceStatusLabel[status]}
      </Text>
    </Box>
  );
}

export default InvoiceStatusBadge;
