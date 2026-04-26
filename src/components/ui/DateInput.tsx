import { useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import type { ComponentProps } from 'react';
import classes from './DateInput.module.css';

interface FormDateInputProps extends Omit<ComponentProps<typeof DatePickerInput>, 'label'> {
  title: string;
  error?: string | boolean;
}

const DateInput = ({
  title,
  error,
  valueFormat = 'DD MMM YYYY',
  rightSection,
  rightSectionPointerEvents = 'none',
  ...props
}: FormDateInputProps) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';
  const bodyVariantTypography = theme.other.typography.bodyVariant;

  return (
    <DatePickerInput
      label={title}
      error={error}
      valueFormat={valueFormat}
      classNames={{ input: classes.input, day: classes.day }}
      rightSection={
        rightSection ?? <img src="/assets/icon-calendar.svg" alt="" width={16} height={16} />
      }
      rightSectionPointerEvents={rightSectionPointerEvents}
      clearSectionMode="rightSection"
      popoverProps={{
        styles: {
          dropdown: {
            borderColor: isDark ? theme.colors.darkSecondary[0] : theme.colors.lightText[0],
            backgroundColor: isDark ? theme.colors.darkCard[0] : theme.colors.light[0],
          },
        },
      }}
      {...props}
      styles={{
        label: {
          ...bodyVariantTypography,
          color: isDark ? theme.colors.lightText[0] : theme.colors.mediumBlue[0],
          fontWeight: 600,
          marginBottom: '4px',
        },
        datePickerRoot: {
          backgroundColor: isDark ? theme.colors.darkCard[0] : theme.colors.light[0],
        },
        input: {
          ...theme.headings.sizes.h4,
          width: '100%',
          borderColor: isDark ? theme.colors.darkSecondary[0] : theme.colors.lightText[0],
          borderRadius: '5px',
          color: isDark ? theme.colors.light[0] : theme.colors.dark[0],
          backgroundColor: isDark ? theme.colors.darkCard[0] : theme.colors.light[0],
          height: '48px',
          padding: '12px 44px 12px 16px',
          transition: 'border-color 150ms ease, box-shadow 150ms ease',
        },
        section: {
          width: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        month: {
          backgroundColor: isDark ? theme.colors.darkCard[0] : theme.colors.light[0],
        },
        monthsList: {
          backgroundColor: isDark ? theme.colors.darkCard[0] : theme.colors.light[0],
        },
        yearsList: {
          backgroundColor: isDark ? theme.colors.darkCard[0] : theme.colors.light[0],
        },
        weekday: {
          color: isDark ? theme.colors.lightText[0] : theme.colors.mediumBlue[0],
        },
        day: {
          color: isDark ? theme.colors.light[0] : theme.colors.dark[0],
          ...theme.headings.sizes.h5,
          fontWeight: '600',
        },
        error: {
          color: theme.colors.red[0],
          fontSize: '12px',
          marginTop: '6px',
        },
      }}
    />
  );
};

export default DateInput;



