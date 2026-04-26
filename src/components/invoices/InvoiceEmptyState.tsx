import { Flex, Text, Title, useMantineColorScheme, useMantineTheme } from "@mantine/core";

function InvoiceEmptyState() {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const isDark = colorScheme === "dark";

  return (
    <Flex direction="column" align="center" justify="center" pt={80} gap={24}>
      <img src="/assets/illustration-empty.svg" alt="No invoices" width={240} />
      <Flex direction="column" align="center" gap={12}>
        <Title order={2} c={isDark ? theme.colors.light[0] : theme.colors.dark[0]}>
          There is nothing here
        </Title>
        <Text size="sm" c={isDark ? theme.colors.grayBlue[0] : theme.colors.grayBlue[0]} ta="center" maw={220}>
          Create an invoice by clicking the{" "}
          <Text component="span" fw={700}>
            New Invoice
          </Text>{" "}
          button and get started
        </Text>
      </Flex>
    </Flex>
  );
}

export default InvoiceEmptyState;
