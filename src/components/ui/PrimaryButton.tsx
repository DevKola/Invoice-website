import { useState } from 'react';
import { Button, Text, useMantineColorScheme } from '@mantine/core';
import type { PrimaryButtonProps } from '../../types/types';

const PrimaryButton = ({
    text,
    onClick,
    bgColor,
    color,
    hoverColor,
    icon,
    iconColor,
    iconBg,
    lightModeTextColor,
    darkModeTextColor,
    type = 'button',
    disabled = false,
}: PrimaryButtonProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const { colorScheme } = useMantineColorScheme();
    const labelColor = colorScheme === 'dark' ? (darkModeTextColor ?? color) : (lightModeTextColor ?? color);

    return (
        <Button
            type={type}
            onClick={onClick}
            disabled={disabled}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            leftSection={
                icon ? (
                    <span
                        style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: iconBg ?? 'white',
                            color: iconColor ?? color,
                            flexShrink: 0,
                        }}
                    >
                        {icon}
                    </span>
                ) : undefined
            }
            styles={{
                root: {
                    height: '48px',
                    width: 'fit-content',
                    minWidth: '89px',
                    borderRadius: '24px',
                    backgroundColor: isHovered ? hoverColor : bgColor,
                    color,
                    fontSize: '15px',
                    fontWeight: 700,
                    lineHeight: '15px',
                    letterSpacing: '-0.25px',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    opacity: disabled ? 0.6 : 1,
                    transition: 'background-color 150ms ease',
                },
                inner: {
                    gap: '12px',
                },
                section: {
                    marginRight: 0,
                },
                label: {
                    color: 'inherit',
                },
            }}
        >
            <Text component="span" c={labelColor} inherit>
                {text}
            </Text>
        </Button>
    );
};

export default PrimaryButton;