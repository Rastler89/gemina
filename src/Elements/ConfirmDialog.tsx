import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

interface ConfirmDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    handleDelete: () => void;
  }

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({open, setOpen, handleDelete}) => {

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirmación</DialogTitle>
            <DialogContent>¿Estás seguro de que deseas elminar este elemento?</DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button onClick={handleDelete} color='error'>Eliminar</Button>
            </DialogActions>
        </Dialog>
    )

}

export default ConfirmDialog;