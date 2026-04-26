import { useEffect, useState } from "react";
import { Box, Loader, Modal, Text, Title, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { selectInvoicesError, selectInvoicesMutationStatus, selectSelectedInvoice, selectSelectedInvoiceStatus } from "../../features/invoices/invoices.selectors";
import { fetchInvoiceById } from "../../features/invoices/invoices.thunks";
import type { InvoiceDetailViewProps } from "../../types/types";
import { InvoiceStatus } from "../../types/types";
import { formatAmount, formatDate, renderAddress } from "../../util/invoiceDetail.utils";
import { InvoiceStatusBadge } from "../ui/InvoiceStatusBadge";
import PrimaryButton from "../ui/PrimaryButton";
import styles from "./InvoiceDetailView.module.css";

function InvoiceDetailView({
  onEdit,
  onDelete,
  onMarkAsPaid,
}: InvoiceDetailViewProps) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const [isMarkingPaid, setIsMarkingPaid] = useState(false);
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const dispatch = useAppDispatch();
  const invoice = useAppSelector(selectSelectedInvoice);
  const invoiceStatus = useAppSelector(selectSelectedInvoiceStatus);
  const invoiceError = useAppSelector(selectInvoicesError);
  const mutationStatus = useAppSelector(selectInvoicesMutationStatus);
  const isDeleting = mutationStatus === 'loading';
  const normalizedStatus = String(invoice?.status ?? "").toLowerCase();
  const isPaid = normalizedStatus === String(InvoiceStatus.Paid) || normalizedStatus === "paid";
  const isDraft = normalizedStatus === String(InvoiceStatus.Draft) || normalizedStatus === "draft";
  const isPending = normalizedStatus === String(InvoiceStatus.Pending) || normalizedStatus === "pending";

  const markPaidChecks = (() => {
    if (!invoice) {
      return {
        isDraft: false,
        hasClientName: false,
        hasClientEmail: false,
        hasDescription: false,
        hasSenderAddress: false,
        hasClientAddress: false,
        hasMinimumItems: false,
        hasItemsWithData: false,
        hasTotalValue: false,
      };
    }

    const hasClientName = !!invoice.clientAddress?.name?.trim();
    const hasClientEmail = !!invoice.clientAddress?.email?.trim();
    const hasDescription = !!invoice.description?.trim();

    const hasSenderAddress = !!invoice.senderAddress?.streetAddress?.trim()
      && !!invoice.senderAddress?.city?.trim()
      && !!invoice.senderAddress?.postalCode?.trim()
      && !!invoice.senderAddress?.country?.trim();

    const hasClientAddress = !!invoice.clientAddress?.streetAddress?.trim()
      && !!invoice.clientAddress?.city?.trim()
      && !!invoice.clientAddress?.postalCode?.trim()
      && !!invoice.clientAddress?.country?.trim();

    const hasMinimumItems = invoice.invoiceItems.length > 0;
    const hasItemsWithData = invoice.invoiceItems.every((item) => {
      const quantity = parseFloat(item.quantity ?? "0");
      const price = parseFloat(item.price ?? "0");
      return !!item.name?.trim() && !isNaN(quantity) && quantity > 0 && !isNaN(price) && price > 0;
    });

    const computedTotal = invoice.invoiceItems.reduce((sum, item) => {
      const quantity = parseFloat(item.quantity ?? "0");
      const price = parseFloat(item.price ?? "0");
      if (isNaN(quantity) || isNaN(price)) {
        return sum;
      }

      return sum + quantity * price;
    }, 0);

    return {
      isDraft,
      hasClientName,
      hasClientEmail,
      hasDescription,
      hasSenderAddress,
      hasClientAddress,
      hasMinimumItems,
      hasItemsWithData,
      hasTotalValue: computedTotal > 0,
    };
  })();

  const canMarkDraftAsPaid = markPaidChecks.isDraft
    && markPaidChecks.hasClientName
    && markPaidChecks.hasClientEmail
    && markPaidChecks.hasDescription
    && markPaidChecks.hasSenderAddress
    && markPaidChecks.hasClientAddress
    && markPaidChecks.hasMinimumItems
    && markPaidChecks.hasItemsWithData
    && markPaidChecks.hasTotalValue;

  const canMarkAsPaid = !isPaid && (isPending || canMarkDraftAsPaid);

  
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const isDark = colorScheme === "dark";

  const surfaceColor = isDark ? theme.colors.darkCard[0] : theme.colors.light[0];
  const panelColor = isDark ? theme.colors.darkSecondary[0] : theme.colors.lightBg[0];
  const footerColor = isDark ? theme.colors.darkMedium[0] : theme.colors.darkMedium[0];
  const primaryText = isDark ? theme.colors.light[0] : theme.colors.dark[0];
  const secondaryText = theme.colors.grayBlue[0];
  const tertiaryText = isDark ? theme.colors.lightText[0] : theme.colors.mediumBlue[0];

  function handleBack() {
    navigate("/");
  }

  function handleOpenDeleteModal() {
    setDeleteModalOpen(true);
  }

  function handleCloseDeleteModal() {
    if (isDeleting) {
      return;
    }

    setDeleteModalOpen(false);
  }

  async function handleConfirmDelete() {
    try {
      await onDelete();
      setDeleteModalOpen(false);
    } catch {
      // Error is handled by Redux and displayed in UI
    }
  }

  async function handleMarkAsPaid() {
    setIsMarkingPaid(true);
    try {
      await onMarkAsPaid();
    } catch {
      // Error is handled by Redux and displayed in UI
    } finally {
      setIsMarkingPaid(false);
    }
  }

  useEffect(() => {
    if (invoiceId) {
      void dispatch(fetchInvoiceById(invoiceId));
    }
  }, [invoiceId]);

  if (invoiceStatus === "loading" || !invoice || invoice.id !== invoiceId) {
    return (
      <Box className={styles.wrapper}>
        <button type="button" onClick={handleBack} className={styles.backButton}>
          <img src="/assets/icon-arrow-left.svg" alt="" className={styles.backIcon} />
          <Text fw={700} c={primaryText}>
            Go back
          </Text>
        </button>

        <Box className={styles.stateCard} style={{ backgroundColor: surfaceColor }}>
          <Loader color={theme.colors.primary[0]} />
          <Text c={secondaryText}>Loading invoice...</Text>
        </Box>
      </Box>
    );
  }

  if (invoiceStatus === "failed") {
    return (
      <Box className={styles.wrapper}>
        <button type="button" onClick={handleBack} className={styles.backButton}>
          <img src="/assets/icon-arrow-left.svg" alt="" className={styles.backIcon} />
          <Text fw={700} c={primaryText}>
            Go back
          </Text>
        </button>

        <Box className={styles.stateCard} style={{ backgroundColor: surfaceColor }}>
          <Text fw={700} c={primaryText}>Unable to load invoice</Text>
          <Text c={secondaryText}>{invoiceError?.message ?? "Please try again."}</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box className={styles.wrapper}>
      <button type="button" onClick={handleBack} className={styles.backButton}>
        <img
          src="/assets/icon-arrow-left.svg"
          alt=""
          className={styles.backIcon}
        />
        <Text fw={700} c={primaryText}>
          Go back
        </Text>
      </button>

      <Box className={styles.statusBar} style={{ backgroundColor: surfaceColor }}>
        <Box className={styles.statusMeta}>
          <Text size="sm" c={secondaryText}>
            Status
          </Text>
          <InvoiceStatusBadge status={invoice.status} />
        </Box>

        <Box className={styles.actions}>
          <PrimaryButton
            text="Edit"
            onClick={onEdit ?? (() => {})}
            bgColor={isDark ? theme.colors.darkBg[0] : theme.colors.lightBg[0]}
            hoverColor={isDark ? theme.colors.darkSecondary[0] : theme.colors.lightText[0]}
            color={isDark ? theme.colors.lightText[0] : theme.colors.grayBlue[0]}
            lightModeTextColor={theme.colors.grayBlue[0]}
            disabled={isPaid}
            darkModeTextColor={theme.colors.lightText[0]}
          />
          <PrimaryButton
            text="Delete"
            onClick={handleOpenDeleteModal}
            bgColor={theme.colors.red[0]}
            hoverColor={theme.colors.lightRed[1]}
            color={theme.colors.light[0]}
            lightModeTextColor={theme.colors.light[0]}
            darkModeTextColor={theme.colors.light[0]}
          />
          <PrimaryButton
            text={isMarkingPaid ? <Loader size="sm" color={theme.colors.lightBg[0]} /> : "Mark as Paid"}
            onClick={handleMarkAsPaid}
            disabled={!canMarkAsPaid || isMarkingPaid}
            bgColor={theme.colors.primary[0]}
            hoverColor={theme.colors.purple[0]}
            color={theme.colors.light[0]}
            lightModeTextColor={theme.colors.light[0]}
            darkModeTextColor={theme.colors.light[0]}
          />
        </Box>
      </Box>

      <Box
        className={styles.mobileActions}
        style={{ backgroundColor: isDark ? theme.colors.darkCard[0] : theme.colors.light[0] }}
      >
        <PrimaryButton
          text="Edit"
          onClick={onEdit ?? (() => {})}
          bgColor="transparent"
          hoverColor="transparent"
          color={isDark ? theme.colors.lightText[0] : theme.colors.grayBlue[0]}
          lightModeTextColor={theme.colors.grayBlue[0]}
          darkModeTextColor={theme.colors.lightText[0]}
          disabled={isPaid}
        />
        <PrimaryButton
          text="Delete"
          onClick={handleOpenDeleteModal}
          bgColor={theme.colors.red[0]}
          hoverColor={theme.colors.lightRed[0]}
          color={theme.colors.light[0]}
          lightModeTextColor={theme.colors.light[0]}
          darkModeTextColor={theme.colors.light[0]}
        />
        
            <PrimaryButton
              text={isMarkingPaid ? <Loader size="sm" color={theme.colors.lightBg[0]} /> : "Mark as Paid"}
              onClick={handleMarkAsPaid}
              disabled={!canMarkAsPaid || isMarkingPaid}
              bgColor={theme.colors.primary[0]}
              hoverColor={theme.colors.purple[0]}
              color={theme.colors.light[0]}
              lightModeTextColor={theme.colors.light[0]}
              darkModeTextColor={theme.colors.light[0]}
            />
      </Box>

      <Box className={styles.invoiceCard} style={{ backgroundColor: surfaceColor }}>
        <Box className={styles.topRow}>
          <Box className={styles.invoiceIdentity}>
            <Title order={4} c={primaryText}>
              <Text component="span" c={theme.colors.mediumBlue[0]} inherit>
                #
              </Text>
              {invoice?.invoiceCode}
            </Title>
            <Text size="sm" c={secondaryText}>
              {invoice?.description ?? "Invoice description"}
            </Text>
          </Box>

          <Box className={styles.senderAddress} c={secondaryText}>
            {renderAddress([
              invoice?.senderAddress?.streetAddress,
              invoice?.senderAddress?.city,
              invoice?.senderAddress?.postalCode,
              invoice?.senderAddress?.country,
            ])}
          </Box>
        </Box>

        <Box className={styles.detailsGrid}>
          <Box className={`${styles.detailBlock} ${styles.invoiceDate}`}>
            <Text size="sm" c={secondaryText}>
              Invoice Date
            </Text>
            <Text fw={700} c={primaryText}>
              {formatDate(invoice.createdAt)}
            </Text>
          </Box>

          <Box className={`${styles.detailBlock} ${styles.paymentDue}`}>
            <Text size="sm" c={secondaryText}>
              Payment Due
            </Text>
            <Text fw={700} c={primaryText}>
              {formatDate(invoice.paymentDueDate)}
            </Text>
          </Box>

          <Box className={`${styles.detailBlock} ${styles.billTo}`}>
            <Text size="sm" c={secondaryText}>
              Bill To
            </Text>
            <Box className={styles.stackedCopy}>
              <Text fw={700} c={primaryText}>
                {invoice?.clientAddress?.name ?? "—"}
              </Text>
              <Box c={tertiaryText}>
                {renderAddress([
                  invoice?.clientAddress?.streetAddress,
                  invoice?.clientAddress?.city,
                  invoice?.clientAddress?.postalCode,
                  invoice?.clientAddress?.country,
                ])}
              </Box>
            </Box>
          </Box>

          <Box className={`${styles.detailBlock} ${styles.sentTo}`}>
            <Text size="sm" c={secondaryText}>
              Sent to
            </Text>
            <Text fw={700} c={primaryText}>
              {invoice?.clientAddress?.email ?? "—"}
            </Text>
          </Box>
        </Box>

        <Box className={styles.itemsPanel} style={{ backgroundColor: panelColor }}>
          <Box className={styles.itemsContent}>
            <Box className={styles.itemsHeader}>
              <Text size="sm" c={secondaryText}>
                Item Name
              </Text>
              <Text size="sm" c={secondaryText} className={styles.itemsHeaderRight}>
                QTY.
              </Text>
              <Text size="sm" c={secondaryText} className={styles.itemsHeaderRight}>
                Price
              </Text>
              <Text size="sm" c={secondaryText} className={styles.itemsHeaderRight}>
                Total
              </Text>
            </Box>

            {invoice?.invoiceItems?.map((item) => (
              <Box key={item.id} className={styles.itemRow}>
                <Text fw={700} c={primaryText} className={styles.itemName}>
                  {item.name ?? "Unnamed item"}
                </Text>
                <Text fw={700} c={theme.colors.mediumBlue[0]} className={`${styles.itemRowRight} ${styles.itemHideMobile}`}>
                  {item.quantity}
                </Text>
                <Text fw={700} c={theme.colors.mediumBlue[0]} className={`${styles.itemRowRight} ${styles.itemHideMobile}`}>
                  £ {formatAmount(item.price)}
                </Text>
                <Text fw={700} c={primaryText} className={`${styles.itemRowRight} ${styles.itemTotal}`}>
                  £ {formatAmount(item.total)}
                </Text>
                <Text size="sm" c={theme.colors.mediumBlue[0]} className={styles.itemMeta}>
                  {item.quantity} x £ {formatAmount(item.price)}
                </Text>
              </Box>
            ))}
          </Box>

          <Box className={styles.amountFooter} style={{ backgroundColor: footerColor }}>
            <Text size="sm" c={theme.colors.light[0]}>
              Amount Due
            </Text>
            <Title order={2} c={theme.colors.light[0]}>
              £ {formatAmount(invoice?.total)}
            </Title>
          </Box>
        </Box>
      </Box>

      <Modal
        opened={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        centered
        withCloseButton={false}
        size={"md"}
        radius={8}
        closeOnEscape={!isDeleting}
        closeOnClickOutside={!isDeleting}
        overlayProps={{ opacity: 0.75, color: "#000" }}
        classNames={{
          content: styles.deleteModalContent,
          body: styles.deleteModalBody,
        }}
        styles={{
          content: {
            backgroundColor: isDark ? theme.colors.darkBg[0] : theme.colors.light[0],
          },
        }}
      >
        <div className={styles.deleteModalStack}>
          <Title order={3} c={isDark ? theme.colors.light[0] : theme.colors.dark[0]}>
            Confirm Deletion
          </Title>
          <Text size="sm" c={theme.colors.grayBlue[0]}>
            Are you sure you want to delete invoice #{invoice?.invoiceCode}? This action cannot be undone.
          </Text>

          <div className={styles.deleteModalActions}>
            <PrimaryButton
              text="Cancel"
              onClick={handleCloseDeleteModal}
              disabled={isDeleting}
              bgColor={theme.colors.lightBg[0]}
              hoverColor={isDark ? theme.colors.darkMedium[0] : theme.colors.lightText[0]}
              color={isDark ? theme.colors.lightText[0] : theme.colors.mediumBlue[0]}
              lightModeTextColor={theme.colors.mediumBlue[0]}
              darkModeTextColor={theme.colors.mediumBlue[0]}
            />
              <PrimaryButton
                text={isDeleting ?  <Loader size={"sm"} color={theme.colors.primary[0]} /> : "Delete"}
                onClick={handleConfirmDelete}
                bgColor={theme.colors.red[0]}
                hoverColor={theme.colors.lightRed[1]}
                color={theme.colors.light[0]}
                lightModeTextColor={theme.colors.light[0]}
                darkModeTextColor={theme.colors.light[0]}
                disabled={isDeleting}
              />
          
          </div>
        </div>
      </Modal>
    </Box>
  );
}

export default InvoiceDetailView;