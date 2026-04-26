import { Text } from "@mantine/core";
import dayjs from "dayjs";

export function formatAmount(value: string): string {
  const num = Number(value);

  if (Number.isNaN(num)) {
    return value;
  }

  return num.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatDate(value: string): string {
  return value ? dayjs(value).format("DD MMM YYYY") : "—";
}

export function renderAddress(parts: Array<string | null | undefined>) {
  return parts.filter(Boolean).map((part) => (
    <Text key={part} size="sm" inherit>
      {part}
    </Text>
  ));
}

export function calculateItemTotal(quantity: string, price: string) {
  const parsedQuantity = Number.parseFloat(quantity);
  const parsedPrice = Number.parseFloat(price);

  if (Number.isNaN(parsedQuantity) || Number.isNaN(parsedPrice)) {
    return "0.00";
  }

  return (parsedQuantity * parsedPrice).toFixed(2);
}
