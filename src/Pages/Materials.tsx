import { Add, Delete, Save } from "@mui/icons-material";
import { Button, CircularProgress, IconButton, Modal, Paper, Tooltip } from "@mui/material";
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer } from '@mui/x-data-grid';

import { useEffect, useState } from "react";
import { supabase } from "../Services/RastGest";
import { Material } from "../models";
import ConfirmDialog from "../Elements/ConfirmDialog";


const paginationModel = { page: 0, pageSize: 10};

const Materials = () => {
    const [loading, setLoading] = useState(-1);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [open, setOpen] = useState(false);
    const [element, setElement] = useState(0);

    useEffect(() => {
        getMaterials();
    }, []);

    async function getMaterials() {
        const {data} = await supabase.from("Materials").select('*');
        setMaterials(data as Material[]);
    }

    async function updateMaterial(id: Number, name: string) {
        if(id==0) {
            const {data} = await supabase.from('Materials')
                .insert([{name:name}])
                .select();

            console.log(data);

        } else {
            const {data} = await supabase.from('Materials')
                .update({name: name})
                .eq('id',id)
                .select();
            console.log(data);
        }
        setLoading(-1);

    }

    const handleDelete = async () => {
        const {error} = await supabase.from('Materials').delete().eq('id',element);
        if(error) {
            console.log(error);
        } else {
            setMaterials(materials.filter(material => material.id !== element));
        }
        setOpen(false);
    }

    return (
        <>
            <div style={{display:'flex', justifyContent:'flex-end', padding: 5}}>
                <Tooltip title='Agregar material'>
                    <IconButton
                        aria-label='add'
                        color='primary'
                        size='large'
                        onClick={() => {
                            setMaterials([...materials,{id:0,name:''}]);
                        }}
                    >
                        <Add />
                    </IconButton>
                </Tooltip>
            </div>
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
                                            aria-label="save"
                                            disabled={loading==params.id}
                                            onClick={() => {
                                                setLoading(Number(params.id));
                                                updateMaterial(params.row.id,params.row.name);
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
            {/* Dialog confirmación */ }
            <ConfirmDialog 
                open={open}
                setOpen={setOpen}
                handleDelete={handleDelete}
            />
        </>
    )
}

export default Materials;