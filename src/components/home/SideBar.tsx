import { Box, Flex, useMantineColorScheme } from "@mantine/core";
import Logo from "../ui/Logo";
import styles from "./SideBar.module.css";

function SideBar() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Box className={styles.root}>
      <Logo />
      <Box className={styles.spacer} />
      <Flex className={styles.controls}>
        <Box
          component="button"
          onClick={() => toggleColorScheme()}
          className={styles.toggleButton}
        >
          <img
            src={isDark ? "/assets/icon-sun.svg" : "/assets/icon-moon.svg"}
            alt={isDark ? "Switch to light mode" : "Switch to dark mode"}
            width={20}
            height={20}
          />
        </Box>
        <Box className={styles.divider} />
        <Box className={styles.avatar}>
          <img
            src="/assets/image-avatar.jpg"
            alt="User avatar"
            width={40}
            height={40}
            className={styles.avatarImage}
          />
        </Box>
      </Flex>
    </Box>
  );
}

export default SideBar;
