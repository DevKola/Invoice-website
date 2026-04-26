import { Select, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import type { SelectProps } from '@mantine/core';
import classes from './FormSelect.module.css';

interface FormSelectProps extends Omit<SelectProps, 'label'> {
    title: string;
    error?: string | boolean;
}

const FormSelect = ({
    title,
    error,
    ...props
}: FormSelectProps) => {
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === 'dark';
    const bodyVariantTypography = theme.other.typography.bodyVariant;

    return (
        <Select
            label={title}
            error={error}
            classNames={{ input: classes.input, option: classes.option }}
            rightSection={<img src="/assets/icon-arrow-down.svg" alt="" width={11} height={7} />}
            rightSectionPointerEvents="none"
            {...props}
            styles={{
                label: {
                    ...bodyVariantTypography,
                    color: isDark ? theme.colors.lightText[0] : theme.colors.mediumBlue[0],
                    fontWeight: 600,
                    marginBottom: '4px',
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
                dropdown: {
                    borderColor: isDark ? theme.colors.darkSecondary[0] : theme.colors.lightText[0],
                    backgroundColor: isDark ? theme.colors.darkCard[0] : theme.colors.light[0],
                    minHeight: '100px',
                    padding: '12px',
                },
                option: {
                    color: isDark ? theme.colors.light[0] : theme.colors.dark[0],
                    ...theme.headings.sizes.h4,
                    marginBottom: '20px',

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

export default FormSelect;



