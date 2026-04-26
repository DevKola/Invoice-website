import { Box, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { Outlet } from 'react-router';
import SideBar from '../components/home/SideBar.tsx';
import styles from '../App.module.css';

function Layout() {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const isDark = colorScheme === 'dark';

  const mainBg = isDark ? theme.colors.darkSecondary[0] : theme.colors.lightBg[0];

  return (
    <Box className={styles.shell} style={{ backgroundColor: mainBg }}>
      <SideBar />
      <Box className={styles.main}>
        <Box className={styles.content}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default Layout;