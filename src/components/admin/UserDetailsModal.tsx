import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	boxShadow: 24,
};

interface UserDetailsModalProps {
	open: boolean;
	onClose: () => void;
	user: {
		name: string;
		email: string;
		cpf: string | null;
		roles: string[];
	} | null;
}

export default function UserDetailsModal({
	open,
	onClose,
	user,
}: UserDetailsModalProps) {
	return (
		<Modal
			aria-labelledby="transition-modal-title"
			aria-describedby="transition-modal-description"
			open={open}
			onClose={onClose}
			closeAfterTransition
			slots={{ backdrop: Backdrop }}
			slotProps={{
				backdrop: {
					timeout: 500,
					className: "modal-overlay", // Aplica o estilo personalizado ao backdrop
				},
			}}
		>
			<Fade in={open}>
				<Box sx={style} className="modal-container">
					<Box className="modal-header">
						<Typography
							id="transition-modal-title"
							variant="h6"
							component="h2"
						>
							Detalhes do Usuário
						</Typography>
						<IconButton onClick={onClose} className="close-button">
							<CloseIcon />
						</IconButton>
					</Box>
					{user ? (
						<>
							<Typography variant="body1" component="p">
								Nome: {user.name}
							</Typography>
							<Typography variant="body1" component="p">
								Email: {user.email}
							</Typography>
							<Typography variant="body1" component="p">
								CPF: {user.cpf || "N/A"}
							</Typography>
							<Typography variant="body1" component="p">
								Roles: {user.roles.join(", ")}
							</Typography>
						</>
					) : (
						<Typography variant="body1" component="p">
							Carregando...
						</Typography>
					)}
					<Button
						variant="contained"
						color="primary"
						onClick={onClose}
						sx={{ mt: 2 }}
					>
						Fechar
					</Button>
				</Box>
			</Fade>
		</Modal>
	);
}
