import { Delete, Edit, Save } from "@mui/icons-material";
import { Button, CircularProgress, IconButton, Paper } from "@mui/material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useEffect, useState } from "react";
import { supabase } from "../Services/RastGest";
import { Material } from "../models";


const paginationModel = { page: 0, pageSize: 10};

const rows = [
    { id: '1', name: 'prova'}
]

const Materials = () => {
    const [loading, setLoading] = useState(-1);
    const [materials, setMaterials] = useState<Material[]>([]);

    useEffect(() => {
        getMaterials();
    }, []);

    async function getMaterials() {
        const {data} = await supabase.from("Materials").select('*');
        setMaterials(data as Material[]);
    }

    return (
        <>
            <Paper sx={{width:'100%'}}>
                <DataGrid
                    rows={materials}
                    columns={[
                        { field: 'id', headerName: 'ID', width: 70 },
                        { field: 'name', headerName: 'Name', editable: true, width: 250 },
                        { field: 'actions', headerName: 'Acciones',
                            renderCell: (params) => {
                                return (
                                    <div>
                                        <IconButton
                                            aria-label="edit"
                                            disabled={loading==params.id}
                                            onClick={() => {
                                                setLoading(Number(params.id));
                                                console.log()
                                                setTimeout(() => {
                                                    setLoading(-1);
                                                },10000);
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
                                        <IconButton aria-label="delete">
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
        </>
    )
}

export default Materials;