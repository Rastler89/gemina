import { Delete, Save, Visibility } from "@mui/icons-material";
import { CircularProgress, IconButton, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

interface DataTableProps {
    rows: any[];
    columns: any[];
    loading: number;
    setElement: (element: number) => void;
    update: (arg0: any) => void;
    setLoading: (loading: number) => void;
    setOpen: (open:boolean) => void;
    profile: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
    rows,
    columns,
    loading,
    setElement,
    update,
    setLoading,
    setOpen,
    profile
}) => {
    const paginationModel = { page: 0, pageSize: 10};

    return (
        <Paper sx={{width:'100%'}}>
            <DataGrid
                rows={rows}
                columns={[
                    ...columns,
                    { field: 'actions', headerName: 'Acciones',
                        renderCell: (params) => {
                            return (
                                <div>
                                    <IconButton
                                        aria-label="save"
                                        disabled={loading==params.id}
                                        onClick={() => {
                                            setLoading(Number(params.id));
                                            update(params.row);
                                        }}
                                    >
                                        <Save />
                                        {loading==params.id && (
                                            <CircularProgress
                                                size={38}
                                                className='fabProgress'
                                            />
                                        )}
                                    </IconButton>
                                    {profile &&
                                    <IconButton
                                        aria-label="details"
                                    >
                                        <Visibility />
                                    </IconButton>
                                    }
                                    <IconButton 
                                        aria-label="delete"
                                        onClick={() => {
                                            setOpen(true);
                                            setElement(params.row.id);
                                        }}
                                    >
                                        <Delete />
                                    </IconButton>
                                </div>
                            )
                        }
                    }
                ]}
                initialState={{pagination:{paginationModel}}}
                pageSizeOptions={[5,10]}
                sx={{border:0}}/>
        </Paper>
    )
}

export default DataTable;