import { useState } from "react";
import {
  Box,
  Checkbox,
  Flex,
  Popover,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import PrimaryButton from "../ui/PrimaryButton";
import { InvoiceStatus, invoiceStatusLabel, type InvoicesHeaderProps } from "../../types/types";
import styles from "./InvoicesHeader.module.css";
import { useMediaQuery } from "@mantine/hooks";

const ALL_STATUSES: InvoiceStatus[] = [
  InvoiceStatus.Draft,
  InvoiceStatus.Pending,
  InvoiceStatus.Paid,
];

function InvoicesHeader({
  invoiceCount,
  selectedStatuses,
  onStatusChange,
  onNewInvoice,
}: InvoicesHeaderProps) {
  const [filterOpen, setFilterOpen] = useState(false);
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const isDark = colorScheme === "dark";
  const isMobile = useMediaQuery("(max-width: 740px)");

  const titleColor = isDark ? theme.colors.light[0] : theme.colors.dark[0];
  const subtitleColor = isDark ? theme.colors.grayBlue[0] : theme.colors.grayBlue[0];
  const filterTextColor = isDark ? theme.colors.light[0] : theme.colors.dark[0];
  const popoverBg = isDark ? theme.colors.darkSecondary[0] : theme.colors.light[0];

  const subtitleText =
    invoiceCount === 0
      ? "No invoices"
      : `There are ${invoiceCount} total invoice${invoiceCount !== 1 ? "s" : ""}`;
  const mobileSubtitleText =
    invoiceCount === 0 ? "No invoices" : `${invoiceCount} invoices`;

  function toggleStatus(status: InvoiceStatus) {
    if (selectedStatuses.includes(status)) {
      onStatusChange(selectedStatuses.filter((s) => s !== status));
    } else {
      onStatusChange([...selectedStatuses, status]);
    }
  }

  return (
    <Flex align="center" justify="space-between" mb={40} className={styles.header}>
      <Box className={styles.leftBlock}>
        <Title order={1} c={titleColor} className={styles.title}>
          Invoices
        </Title>
        <Text size="sm" c={subtitleColor} mt={4} className={styles.subtitle}>
          <span className={styles.desktopOnly}>{subtitleText}</span>
          <span className={styles.mobileOnly}>{mobileSubtitleText}</span>
        </Text>
      </Box>
      <Flex align="center" gap={ isMobile ? 20 :40} className={styles.actions}>
        <Popover
          opened={filterOpen}
          onChange={setFilterOpen}
          position="bottom"
          width={200}
          shadow="md"
          radius={8}
        >
          <Popover.Target>
            <Flex
              align="center"
              gap={12}
              className={styles.filterTrigger}
              onClick={() => setFilterOpen((o) => !o)}
            >
              <Text fw={700} size="sm" c={filterTextColor} className={styles.filterLabel}>
                <span className={styles.desktopOnly}>Filter by status</span>
                <span className={styles.mobileOnly}>Filter</span>
              </Text>
              <img
                src="/assets/icon-arrow-down.svg"
                alt=""
                width={11}
                height={7}
                className={filterOpen ? styles.filterIconOpen : styles.filterIcon}
              />
            </Flex>
          </Popover.Target>

          <Popover.Dropdown
            style={{ backgroundColor: popoverBg, border: "none", padding: "24px" }}
          >
            <Stack gap={16}>
              {ALL_STATUSES.map((status) => (
                <Checkbox
                  key={status}
                  label={invoiceStatusLabel[status]}
                  checked={selectedStatuses.includes(status)}
                  onChange={() => toggleStatus(status)}
                  className={isDark ? styles.checkboxDark : styles.checkboxLight}
                  styles={{
                    label: {
                      color: isDark ? theme.colors.light[0] : theme.colors.dark[0],
                      fontWeight: 700,
                      fontSize: "15px",
                      cursor: "pointer",
                    },
                  }}
                />
              ))}
            </Stack>
          </Popover.Dropdown>
        </Popover>
        <Box className={styles.desktopButton}>
          <PrimaryButton
            text="New Invoice"
            bgColor={theme.colors.primary[0]}
            hoverColor={theme.colors.purple[0]}
            color={theme.colors.light[0]}
            lightModeTextColor={theme.colors.light[0]}
            darkModeTextColor={theme.colors.light[0]}
            icon={<img src="/assets/icon-plus.svg" alt="" width={10} height={10} />}
            iconBg={theme.colors.light[0]}
            iconColor={theme.colors.primary[0]}
            onClick={onNewInvoice}
          />
        </Box>

         <Box className={styles.mobileNewButton}>
          <PrimaryButton
            text="New"
            bgColor={theme.colors.primary[0]}
            hoverColor={theme.colors.purple[0]}
            color={theme.colors.light[0]}
            lightModeTextColor={theme.colors.light[0]}
            darkModeTextColor={theme.colors.light[0]}
            icon={<img src="/assets/icon-plus.svg" alt="" width={10} height={10} />}
            iconBg={theme.colors.light[0]}
            iconColor={theme.colors.primary[0]}
            onClick={onNewInvoice}
          />
        </Box>
      </Flex>
    </Flex>
  );
}

export default InvoicesHeader;
