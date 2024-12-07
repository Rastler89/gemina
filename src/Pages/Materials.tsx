import { Paper } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';


const materials = [
    { id: 1, name: 'Plata'},
    { id: 1, name: 'Ceramica'},
    { id: 1, name: 'Vinilo'},
    { id: 1, name: 'Hierro'},
  ];

const paginationModel = { page: 0, pageSize: 10};

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
]

const rows = [
    { id: '1', name: 'prova'}
]

const Materials = () => {
    
    return (
        <>
            <Paper sx={{width:'100%'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{pagination:{paginationModel}}}
                    pageSizeOptions={[5,10]}
                    checkboxSelection
                    sx={{border:0}}/>
            </Paper>
        </>
    )
}

export default Materials;