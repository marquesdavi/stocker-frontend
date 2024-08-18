import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";

const style = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	boxShadow: 24,
};

interface CreateUserModalProps {
	open: boolean;
	onClose: () => void;
}

export default function CreateUserModal({
	open,
	onClose,
}: CreateUserModalProps) {
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
							Criar Novo Usuário
						</Typography>
						<IconButton onClick={onClose} className="close-button">
							<CloseIcon />
						</IconButton>
					</Box>
					<TextField
						fullWidth
						label="Nome"
						margin="normal"
						variant="outlined"
					/>
					<TextField
						fullWidth
						label="Email"
						margin="normal"
						variant="outlined"
					/>
					<TextField
						fullWidth
						label="CPF"
						margin="normal"
						variant="outlined"
					/>
					<Button
						variant="contained"
						color="primary"
						onClick={onClose}
						sx={{ mt: 2 }}
					>
						Criar
					</Button>
				</Box>
			</Fade>
		</Modal>
	);
}
