import { useMantineColorScheme, useMantineTheme } from "@mantine/core";
import PrimaryButton from "../ui/PrimaryButton";
import styles from "./InvoiceFormActions.module.css";

interface InvoiceFormActionsProps {
  onDiscard: () => void;
  onSecondaryAction?: () => void;
  onPrimaryAction: () => void;
  discardLabel: string;
  secondaryLabel: string;
  primaryLabel: string;
}

function InvoiceFormActions({
  onDiscard,
  onSecondaryAction,
  onPrimaryAction,
  discardLabel = "Discard",
  secondaryLabel = "Save as Draft",
  primaryLabel = "Save & Send",
}: InvoiceFormActionsProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <div className={`${styles.actionsBar} ${isDark ? styles.actionsBarDark : styles.actionsBarLight}`}>
      <PrimaryButton
        text={discardLabel}
        onClick={onDiscard}
        bgColor={theme.colors.lightBg[0]}
        hoverColor={isDark ? theme.colors.darkMedium[0] : theme.colors.lightText[0]}
        color={isDark ? theme.colors.lightText[0] : theme.colors.mediumBlue[0]}
        lightModeTextColor={theme.colors.mediumBlue[0]}
        darkModeTextColor={theme.colors.mediumBlue[0]}
      />

      <div className={styles.rightActions}>
        {onSecondaryAction ? (
          <PrimaryButton
            text={secondaryLabel}
            onClick={onSecondaryAction}
            bgColor={theme.colors.darkMedium[0]}
            hoverColor={theme.colors.darkSecondary[0]}
            color={theme.colors.lightText[0]}
            lightModeTextColor={theme.colors.lightText[0]}
            darkModeTextColor={theme.colors.lightText[0]}
          />
        ) : null}
        <PrimaryButton
          text={primaryLabel}
          onClick={onPrimaryAction}
          bgColor={theme.colors.primary[0]}
          hoverColor={theme.colors.purple[0]}
          color={theme.colors.light[0]}
          lightModeTextColor={theme.colors.light[0]}
          darkModeTextColor={theme.colors.light[0]}
        />
      </div>
    </div>
  );
}

export default InvoiceFormActions;