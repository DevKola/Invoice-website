import { Button, Drawer, Group, ScrollArea, Text, Title, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { useEffect } from "react";
import type { CreateInvoiceFormProps, CreateInvoiceFormValues } from "../../types/types";
import DateInput from "../ui/DateInput";
import FormInput from "../ui/FormInput";
import FormSelect from "../ui/FormSelect";
import InvoiceFormActions from "./InvoiceFormActions";
import styles from "./CreateInvoiceForm.module.css";
import { calculateItemTotal } from "../../util/invoiceDetail.utils";


const createEmptyItem = () => ({
  name: "",
  quantity: "1",
  price: "0.00",
});

function createDefaultInvoiceFormValues(): CreateInvoiceFormValues {
  return {
    billFromStreet: "",
    billFromCity: "",
    billFromPostCode: "",
    billFromCountry: "",
    clientName: "",
    clientEmail: "",
    billToStreet: "",
    billToCity: "",
    billToPostCode: "",
    billToCountry: "",
    invoiceDate: new Date("2021-08-21"),
    paymentTerms: "net-30",
    projectDescription: "",
    items: [createEmptyItem()],
  };
}


function CreateInvoiceForm({
  opened,
  onClose,
  onSaveDraft,
  onSubmit,
  title = "New Invoice",
  initialValues,
  discardLabel = "Discard",
  saveDraftLabel = "Save as Draft",
  submitLabel = "Save & Send",
  showSaveDraft = true,
}: CreateInvoiceFormProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const isMobile = useMediaQuery("(max-width: 768px)");
  const primaryText = isDark ? theme.colors.light[0] : theme.colors.dark[0];

  const form = useForm<CreateInvoiceFormValues>({
    initialValues: initialValues ?? createDefaultInvoiceFormValues(),
  });

  useEffect(() => {
    if (!opened) {
      return;
    }

    form.setValues(initialValues ?? createDefaultInvoiceFormValues());
  }, [initialValues, opened]);

  function handleSaveAndSend() {
    form.onSubmit((values) => onSubmit(values))();
  }

  function handleAddNewItem() {
    form.insertListItem("items", createEmptyItem());
  }

  function handleRemoveItem(index: number) {
    if (form.values.items.length <= 1) {
      return;
    }

    form.removeListItem("items", index);
  }

  function handleSaveDraft() {
    onSaveDraft(form.values);
  }

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      withCloseButton={false}
      position="left"
      size={720}
      offset={1}
      shadow="xs"
      closeOnClickOutside
      overlayProps={{ opacity: 0.65, color: "#000" }}
      styles={{
        content: {
          marginLeft: isMobile ? 0 : 70,
          overflow: "hidden",
          backgroundColor: isDark ? theme.colors.darkBg[0] : theme.colors.light[0],
        },
        body: {
          height: "100%",
          padding: isMobile ? "70px 0 0 0" : "0 0 0 0",
        },
      }}
      zIndex={200}
    >
      <div className={styles.drawerContent}>
        <ScrollArea className={styles.scrollArea}>
          <form className={styles.form} onSubmit={form.onSubmit((values) => onSubmit(values))}>
            {isMobile ? (
              <button type="button" onClick={onClose} className={styles.backButton}>
                <img src="/assets/icon-arrow-left.svg" alt="" className={styles.backIcon} />
                <Text fw={700} c={primaryText}>
                  Go back
                </Text>
              </button>
            ) : null}

            <Title order={2} c={isDark ? theme.colors.light[0] : theme.colors.dark[0]} className={styles.title}>
              {title}
            </Title>

            <div>
              <Text fw={700} c={theme.colors.primary[0]} className={styles.sectionTitle}>Bill From</Text>
              <Group grow mb={16}>
                <FormInput title="Street Address" {...form.getInputProps("billFromStreet")} />
              </Group>
              <div className={styles.threeCol}>
                <FormInput title="City" {...form.getInputProps("billFromCity")} />
                <FormInput title="Post Code" {...form.getInputProps("billFromPostCode")} />
                <FormInput title="Country" {...form.getInputProps("billFromCountry")} />
              </div>
            </div>

            <div>
              <Text fw={700} c={theme.colors.primary[0]} className={styles.sectionTitle}>Bill To</Text>
              <Group grow mb={16}>
                <FormInput title="Client's Name" {...form.getInputProps("clientName")} />
              </Group>
              <Group grow mb={16}>
                <FormInput
                  title="Client's Email"
                  placeholder="e.g. alex@example.com"
                  {...form.getInputProps("clientEmail")}
                />
              </Group>
              <Group grow mb={16}>
                <FormInput title="Street Address" {...form.getInputProps("billToStreet")} />
              </Group>
              <div className={styles.threeCol}>
                <FormInput title="City" {...form.getInputProps("billToCity")} />
                <FormInput title="Post Code" {...form.getInputProps("billToPostCode")} />
                <FormInput title="Country" {...form.getInputProps("billToCountry")} />
              </div>
            </div>

            <Group grow className={styles.twoCol}>
              <DateInput title="Invoice Date" {...form.getInputProps("invoiceDate")} />
              <FormSelect
                title="Payment Terms"
                data={[
                  { value: "net-1", label: "Net 1 Day" },
                  { value: "net-7", label: "Net 7 Days" },
                  { value: "net-14", label: "Net 14 Days" },
                  { value: "net-30", label: "Net 30 Days" },
                ]}
                {...form.getInputProps("paymentTerms")}
              />
            </Group>

            <Group grow>
              <FormInput
                title="Project Description"
                placeholder="e.g. Graphic Design Service"
                {...form.getInputProps("projectDescription")}
              />
            </Group>

            <div>
              <Text fw={700} c={isDark ? theme.colors.lightText[0] : theme.colors.mediumBlue[0]} mb={16}>
                Item List
              </Text>
              <div className={styles.itemsHeader}>
                <Text size="sm" c={theme.colors.mediumBlue[0]} className={styles.groupLabel}>Item Name</Text>
                <Text size="sm" c={theme.colors.mediumBlue[0]} ta="center" className={styles.groupLabel}>Qty.</Text>
                <Text size="sm" c={theme.colors.mediumBlue[0]} ta="center" className={styles.groupLabel}>Price</Text>
                <Text size="sm" c={theme.colors.mediumBlue[0]} ta="center" className={styles.groupLabel}>Total</Text>
              </div>

              <div className={styles.itemsList}>
                {form.values.items.map((item, index) => (
                  <div className={styles.itemRow} key={`item-${index}`}>
                    <FormInput
                      title=""
                      placeholder="Item name"
                      {...form.getInputProps(`items.${index}.name`)}
                    />
                    <FormInput
                      title=""
                      placeholder="0"
                      type="number"
                      min="0"
                      {...form.getInputProps(`items.${index}.quantity`)}
                    />
                    <FormInput
                      title=""
                      placeholder="0.00"
                      type="number"
                      min="0"
                      step="0.01"
                      {...form.getInputProps(`items.${index}.price`)}
                    />
                    <div className={styles.itemTotalCell}>
                      <Text fw={700} c={isDark ? theme.colors.light[0] : theme.colors.dark[0]}>
                        £ {calculateItemTotal(item.quantity, item.price)}
                      </Text>
                      <button
                        type="button"
                        className={styles.deleteItemButton}
                        onClick={() => handleRemoveItem(index)}
                        aria-label={`Delete ${item.name || "item"}`}
                      >
                        <img src="/assets/icon-delete.svg" alt="" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                type="button"
                fullWidth
                variant="filled"
                className={styles.pillButton}
                bg={isDark ? theme.colors.darkSecondary[0] : theme.colors.lightBg[0]}
                c={isDark ? theme.colors.lightText[0] : theme.colors.mediumBlue[0]}
                onClick={handleAddNewItem}
              >
                + Add New Item
              </Button>
            </div>
          </form>
        </ScrollArea>

        <InvoiceFormActions
          onDiscard={onClose}
          onSecondaryAction={showSaveDraft ? handleSaveDraft : undefined}
          onPrimaryAction={handleSaveAndSend}
          discardLabel={discardLabel}
          secondaryLabel={saveDraftLabel}
          primaryLabel={submitLabel}
        />
      </div>
    </Drawer>
  );
}

export default CreateInvoiceForm;