import { useEffect, useState } from "react";
import { Cast } from "../models";
import { supabase } from "../Services/RastGest";
import { IconButton, Tooltip } from "@mui/material";
import { Add } from "@mui/icons-material";
import DataTable from "../Elements/DataTable";
import ConfirmDialog from "../Elements/ConfirmDialog";

const Casts = () => {
    const [loading, setLoading] = useState(-1);
    const [casts, setCasts] = useState<Cast[]>([]);
    const [open, setOpen] = useState(false);
    const [element, setElement] = useState(0);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Titulo', editable: true, width: 250 },
        { field: 'description', headerName: 'Descripción', editable: true, width: 250 },
        { field: 'reference', headerName: 'Referencia', editable: true, width: 250},
        { field: 'cost', headerName: 'Coste', editable: true, width: 100 }
    ];

    useEffect(() => {
        getCasts();
    }, []);

    async function getCasts() {
        const {data} = await supabase.from('Casts').select('*');
        setCasts(data as Cast[]);
    }

    async function updateCasts(row: any) {
        const {id,name} = row;

        if(id==0) {
            const {data} = await supabase.from('Casts')
                .insert([{
                    name: name
                }])
                .select();
                console.log(data);
        } else {
            const {data} = await supabase.from('Casts')
                .update({
                    name: name
                })
                .eq('id',id)
                .select();
            console.log(data);
        }
        setLoading(-1);
    }

    const handleDelete = async () => {
        const {error} = await supabase.from('Casts').delete().eq('id',element);
        if(!error) {
            setCasts(casts.filter(cast => cast.id !== element));
        }
        setOpen(false);
    }

    return (
        <>
           <div style={{display:'flex',justifyContent:'flex-end',padding:5}}>
                <Tooltip title='Agregar molde'>
                    <IconButton
                        aria-label='add'
                        color='primary'
                        size='large'
                        onClick={() => {
                            setCasts([...casts,{id:0,title:'',reference:'',cost:0} as Cast]);
                        }}
                    >
                        <Add />
                    </IconButton>
                </Tooltip>
           </div>
           <DataTable
                rows={casts}
                columns={columns}
                loading={loading}
                setElement={setElement}
                update={updateCasts}
                setLoading={setLoading}
                setOpen={setOpen}
                profile={true}
            />
            <ConfirmDialog
                open={open}
                setOpen={setOpen}
                handleDelete={handleDelete}
            />
        </>
    )
}

export default Casts;