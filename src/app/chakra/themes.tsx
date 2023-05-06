import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
  global: (props:any) => ({
    
  }),
  breakpoints: {
    base: "0px",
    sm: "580px",
    md: "650px",
    lg: "960px",
    xl: "1000px",
    xxl: "1280px",
    vxl: "1500px",
  },
  
});

export default theme;
