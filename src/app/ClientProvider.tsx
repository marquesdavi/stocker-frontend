"use client";

import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Criação do tema personalizado com a fonte Raleway como padrão
const theme = createTheme({
	typography: {
		fontFamily: "Raleway, Arial, sans-serif", // Define a fonte padrão
	},
});

export default function ClientProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
}
