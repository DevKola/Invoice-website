import {createTheme} from '@mantine/core';

export const theme = createTheme({
    colors: {
        // Primary colors
        primary: ['#7C5DFA', '#7C5DFA', '#7C5DFA', '#7C5DFA', '#7C5DFA', '#7C5DFA', '#7C5DFA', '#7C5DFA', '#7C5DFA', '#7C5DFA'],
        purple: ['#9277FF', '#9277FF', '#9277FF', '#9277FF', '#9277FF', '#9277FF', '#9277FF', '#9277FF', '#9277FF', '#9277FF'],

        // Background colors
        dark: ['#0C0E16', '#0C0E16', '#0C0E16', '#0C0E16', '#0C0E16', '#0C0E16', '#0C0E16', '#0C0E16', '#0C0E16', '#0C0E16'],
        darkBg: ['#141625', '#141625', '#141625', '#141625', '#141625', '#141625', '#141625', '#141625', '#141625', '#141625'],
        darkCard: ['#1E2139', '#1E2139', '#1E2139', '#1E2139', '#1E2139', '#1E2139', '#1E2139', '#1E2139', '#1E2139', '#1E2139'],
        darkSecondary: ['#252945', '#252945', '#252945', '#252945', '#252945', '#252945', '#252945', '#252945', '#252945', '#252945'],

        // Light colors
        lightBg: ['#F8F8FB', '#F8F8FB', '#F8F8FB', '#F8F8FB', '#F8F8FB', '#F8F8FB', '#F8F8FB', '#F8F8FB', '#F8F8FB', '#F8F8FB'],
        lightText: ['#DFE3FA', '#DFE3FA', '#DFE3FA', '#DFE3FA', '#DFE3FA', '#DFE3FA', '#DFE3FA', '#DFE3FA', '#DFE3FA', '#DFE3FA'],
        light: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF'],

        // Neutral/Gray colors
        grayBlue: ['#888EB0', '#888EB0', '#888EB0', '#888EB0', '#888EB0', '#888EB0', '#888EB0', '#888EB0', '#888EB0', '#888EB0'],
        mediumBlue: ['#7E88C3', '#7E88C3', '#7E88C3', '#7E88C3', '#7E88C3', '#7E88C3', '#7E88C3', '#7E88C3', '#7E88C3', '#7E88C3'],

        // Status/Alert colors
        red: ['#EC5757', '#EC5757', '#EC5757', '#EC5757', '#EC5757', '#EC5757', '#EC5757', '#EC5757', '#EC5757', '#EC5757'],
        lightRed: ['#FF9797', '#FF9797', '#FF9797', '#FF9797', '#FF9797', '#FF9797', '#FF9797', '#FF9797', '#FF9797', '#FF9797'],
    },

    shadows: {
        md: '1px 1px 3px rgba(0, 0, 0, .25)',
        xl: '5px 5px 3px rgba(0, 0, 0, .25)',
    },


    fontFamily: "'League Spartan', sans-serif",
    headings: {
        fontFamily: "'League Spartan', sans-serif",
        sizes: {
            h1: {
                fontSize: '36px',
                fontWeight: '700',
                lineHeight: '33px',
            },
            h2: {
                fontSize: '24px',
                fontWeight: '700',
                lineHeight: '22px',
            },
            h3: {
                fontSize: '15px',
                fontWeight: '700',
                lineHeight: '24px',
            },
            h4: {
                fontSize: '15px',
                fontWeight: '700',
                lineHeight: '15px',
            },
        },
    },
    other: {
        typography: {
            body: {
                fontSize: '13px',
                fontWeight: '400',
                lineHeight: '18px',
                letterSpacing: '-0.1px',
            },
            bodyVariant: {
                fontSize: '13px',
                fontWeight: '400',
                lineHeight: '15px',
                letterSpacing: '-0.25px',
            },
        },
    },
});
