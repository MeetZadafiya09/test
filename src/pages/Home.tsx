import { Link, useNavigate } from "react-router";
import useUserStore, { type User } from "../store/users.store";
import { Button, Paper } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteUserModal, { type DeleteModalData } from "../components/modal/DeleteUserModal";
import { useState } from "react";

const renderCell = (params: GridRenderCellParams) => <span style={{ textTransform: 'capitalize' }}>{params.value}</span>;



const Home = () => {
    const { users } = useUserStore()
    const navigate = useNavigate()
    const [deleteUserModal, setDeleteUserModal] = useState<DeleteModalData>({
        open: false,
        data: null
    })
    const handleDelete = (row: User) => {
        setDeleteUserModal({
            open: true,
            data: row
        })
    }
    const handleEdit = (row: User) => {
        navigate(`/users/${row.id}/edit`)
    }
    const userColumns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Name',
            width: 140
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 300
        },
        {
            field: 'age',
            headerName: 'Age',
            width: 70
        },
        {
            field: 'city',
            headerName: 'City',
            width: 130,
            renderCell
        },
        {
            field: 'gender',
            headerName: 'Gender',
            width: 90,
            renderCell
        },
        {
            field: 'hobbies',
            headerName: 'Hobbies',
            width: 250,
            renderCell: (params) => params.value?.join(', ')
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 150,
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <>
                    <GridActionsCellItem
                        icon={<EditSquareIcon color="success" sx={{ fontSize: 24 }} />}
                        label="Edit"
                        onClick={() => handleEdit(params.row)}
                    />

                    <GridActionsCellItem
                        icon={<DeleteIcon sx={{ color: 'red', fontSize: 24 }} />}
                        label="Delete"
                        onClick={() => handleDelete(params.row)}
                    />
                </>
            ),
        }

    ]
    return (
        <>
            <div>
                <Button
                    variant="contained"
                    component={Link}
                    to="/users/add"
                >
                    Add Users
                </Button>
                <Paper sx={{ height: 400, width: '100%', marginTop: 2 }}>
                    <DataGrid
                        columns={userColumns}
                        rows={users}
                        disableRowSelectionOnClick
                        pageSizeOptions={[5, 10]}
                        initialState={
                            {
                                pagination: {
                                    paginationModel: {
                                        page: 0,
                                        pageSize: 5
                                    }
                                }
                            }
                        }
                    />
                </Paper>
            </div>
            <DeleteUserModal data={deleteUserModal} setData={setDeleteUserModal} />
        </>
    )
}

export default Home;