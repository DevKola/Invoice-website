import { Box } from "@mantine/core";

function Logo() {
  return (
    <Box
      style={{
        width: 88,
        height: 88,
        backgroundColor: "#7C5DFA",
        borderRadius: "0 20px 35px 0",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        style={{
          position: "absolute",
          bottom: -22,
          width: "100%",
          height: 70,
          backgroundColor: "#9277FF",
          borderTopLeftRadius: "20px",
        }}
      />
      <img
        src="/assets/logo.svg"
        alt="Logo"
        width={40}
        height={40}
        style={{ position: "relative", zIndex: 1 }}
      />
    </Box>
  );
}

export default Logo;
