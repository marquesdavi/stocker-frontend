"use client";

import ResponsiveAppBar from "@/components/common/ResponsiveNavbar";
import Container from "@mui/material/Container";
import styles from "../page.module.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Button from "@mui/material/Button";
import { useState } from "react";

const GridExample = () => {
	const [rowData, setRowData] = useState([
		{ make: "Tesla", model: "Model Y", price: 64950, electric: true },
		{ make: "Ford", model: "F-Series", price: 33850, electric: false },
		{ make: "Toyota", model: "Corolla", price: 29600, electric: false },
	]);

	const [colDefs, setColDefs] = useState([
		{ field: "make", headerName: "Make", sortable: true, filter: true },
		{ field: "model", headerName: "Model", sortable: true, filter: true },
		{
			field: "price",
			headerName: "Price",
			sortable: true,
			filter: true,
		},
		{
			field: "electric",
			headerName: "Electric",
			sortable: true,
			filter: true,
		},
	]);

	return (
		<div className="ag-theme-quartz" style={{ height: 500, width: "100%" }}>
			<AgGridReact rowData={rowData} columnDefs={colDefs} />
		</div>
	);
};

export default function Stock() {
	return (
		<main>
			<ResponsiveAppBar />
			<Container className={styles.mainContainer}>
				<div className={styles.tableHeader}>
					<h1>Gerenciamento de Estoque</h1>
					<Button variant="contained" disableElevation>
						Vender
					</Button>
				</div>
				<GridExample />
			</Container>
		</main>
	);
}
