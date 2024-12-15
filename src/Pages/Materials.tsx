import { Add, Delete, Save } from "@mui/icons-material";
import { Button, CircularProgress, IconButton, Modal, Paper, Tooltip } from "@mui/material";

import { useEffect, useState } from "react";
import { supabase } from "../Services/RastGest";
import { Material } from "../models";
import ConfirmDialog from "../Elements/ConfirmDialog";
import DataTable from "../Elements/DataTable";

const Materials = () => {
    const [loading, setLoading] = useState(-1);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [open, setOpen] = useState(false);
    const [element, setElement] = useState(0);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', editable: true, width: 250 }
    ];

    useEffect(() => {
        getMaterials();
    }, []);

    async function getMaterials() {
        const {data} = await supabase.from('Materials').select('*');
        setMaterials(data as Material[]);
    }

    async function updateMaterial(row: any) {
        const {id,name} = row;

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
            <DataTable
                rows={materials}
                columns={columns}
                loading={loading}
                setElement={setElement}
                update={updateMaterial}
                setLoading={setLoading}
                setOpen={setOpen}
            />
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