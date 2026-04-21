import {TextInput, useMantineColorScheme, useMantineTheme} from '@mantine/core';
import type { TextInputProps } from '@mantine/core';
import classes from './FormInput.module.css';

interface FormInputProps extends Omit<TextInputProps, 'label'> {
    title: string;
    error?: string | boolean;
}

const FormInput = ({
    title,
    error,
    ...props
}: FormInputProps) => {
    const theme = useMantineTheme();
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <TextInput
            label={title}
            error={error}
            classNames={{ input: classes.input }}
            {...props}
            styles={{
                label: {
                    color: isDark? theme.colors.lightText[0] : theme.colors.mediumBlue[0],
                    fontWeight: 600,
                    fontSize: theme.other.typography.bodyVariant,
                    marginBottom: '4px',
                },
                input: {
                    ...theme.headings.sizes.h4,
                    borderColor: isDark ? theme.colors.darkSecondary[0] : theme.colors.lightText[0],
                    borderRadius: "5px",
                    color: isDark ? theme.colors.light[0] : theme.colors.dark[0],
                    backgroundColor: isDark? theme.colors.darkCard[0] : theme.colors.light[0],
                    height: '48px',
                    padding: '12px 16px',
                    transition: 'border-color 150ms ease, box-shadow 150ms ease',
                    '&:disabled': {
                        backgroundColor: 'rgba(0, 0, 0, 0.05)',
                        cursor: 'not-allowed',
                    },
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

export default FormInput;




