import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material"
import type { User } from "../../store/users.store"
import useUserStore from "../../store/users.store"

export interface DeleteModalData {
    data: User | null
    open: boolean
}

export interface DeleteUserModalProps {
    data: DeleteModalData
    setData: (data: DeleteModalData) => void
}


const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ data, setData }) => {
    const { deleteUser } = useUserStore()
    const handleDelete = () => {
        deleteUser(data.data?.id as string)
        handleClose()
    }
    const handleClose = () => {
        setData({
            open: false,
            data: null
        })
    }
    return (
        <Dialog
            open={data.open}
            onClose={handleClose}
        >
            <DialogTitle>Delete User</DialogTitle>
            <DialogContent>
                Are you sure you want to delete this user?
            </DialogContent>
            <DialogActions sx={{
                p:2
            }}>
                <Button variant="contained" onClick={handleClose}>
                    Cancel
                </Button>

                <Button variant="contained" color="error" onClick={handleDelete}>
                    Delete
                </Button>
            </DialogActions>

        </Dialog>
    )
}

export default DeleteUserModal