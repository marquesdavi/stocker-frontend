"use client";

import ResponsiveAppBar from "@/components/common/ResponsiveNavbar";
import Container from "@mui/material/Container";
import styles from "../page.module.css";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import CreateUserModal from "@/components/admin/CreateUserModal";
import UserDetailsModal from "@/components/admin/UserDetailsModal";

export default function Admin() {
	const [rows, setRows] = useState([]);
	const [openCreateModal, setOpenCreateModal] = useState(false);
	const [openDetailsModal, setOpenDetailsModal] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);

	async function fetchData() {
		const res = await fetch("http://localhost:8080/user/");
		const data = await res.json();
		setRows(data); // Armazena os dados na variável de estado
	}

	useEffect(() => {
		fetchData();
	}, []);

	const handleOpenCreateModal = () => {
		setOpenCreateModal(true);
	};

	const handleCloseCreateModal = () => {
		setOpenCreateModal(false);
	};

	const handleOpenDetailsModal = (user) => {
		setSelectedUser(user);
		setOpenDetailsModal(true);
	};

	const handleCloseDetailsModal = () => {
		setOpenDetailsModal(false);
		setSelectedUser(null);
	};

	return (
		<main>
			<ResponsiveAppBar />
			<Container className={styles.mainContainer}>
				<div className={styles.tableHeader}>
					<h1>Admin</h1>
					<Button
						variant="contained"
						disableElevation
						onClick={handleOpenCreateModal}
					>
						Criar Usuário
					</Button>
				</div>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell align="right">Email</TableCell>
								<TableCell align="right">CPF</TableCell>
								<TableCell align="right">Roles</TableCell>
								<TableCell align="right">Ações</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<TableRow
									key={row.id}
									sx={{
										"&:last-child td, &:last-child th": {
											border: 0,
										},
									}}
								>
									<TableCell component="th" scope="row">
										{row.name}
									</TableCell>
									<TableCell align="right">
										{row.email}
									</TableCell>
									<TableCell align="right">
										{row.cpf ? row.cpf : "N/A"}
									</TableCell>
									<TableCell align="right">
										{row.roles.join(", ")}
									</TableCell>
									<TableCell align="right">
										<Button
											variant="contained"
											onClick={() =>
												handleOpenDetailsModal(row)
											}
										>
											Ver Detalhes
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Container>

			{/* Modal de Criação de Usuário */}
			<CreateUserModal
				open={openCreateModal}
				onClose={handleCloseCreateModal}
			/>

			{/* Modal de Detalhes do Usuário */}
			<UserDetailsModal
				open={openDetailsModal}
				onClose={handleCloseDetailsModal}
				user={selectedUser}
			/>
		</main>
	);
}
