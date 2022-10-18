import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const ColorButton = styled(Button)(({ theme }) => ({
  color: "#ffffff",
  background:
    "linear-gradient(60deg,rgba(114, 88, 213, 1) 0%,rgba(20, 202, 223, 1) 100%)",

  "&:hover": {
    background:
      "linear-gradient(60deg,rgba(84, 58, 183, 1) 0%,rgba(0, 172, 193, 1) 100%)",
  },
}));

export default ColorButton;
