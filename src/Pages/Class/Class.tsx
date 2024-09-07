import React, { useContext, useEffect, useState } from 'react'

import '../Class/Class.scss';
import useApi from "../../hooks/useAPI";
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { Class_COLUMNS, Entity_COLUMNS, IClass, IEntity, MenuListinter } from '../../Components/Table/columns';
import { EditIcon, TrashIcon } from '../../assets';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { QUERY_KEYS_CLASS, QUERY_KEYS_ENTITY } from '../../utils/const';
import { toast } from 'react-toastify';
import { DeleteDialog } from '../../Components/Dailog/DeleteDialog';
import FullScreenLoader from '../Loader/FullScreenLoader';
import { dataaccess } from '../../utils/helpers';
import NameContext from '../Context/NameContext';


const Class = () => {
    const context = useContext(NameContext);
    const {namecolor }:any = context;
    const location = useLocation();
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1].toLowerCase();
    const Menulist: any = localStorage.getItem('menulist1');;
    const [filteredData, setFilteredData] = useState<MenuListinter | any>([]);
    const tabletools:any = {
        light:'#547476',dark:'#00D1D9',default:'#547476'
      }
    // useEffect(() => {
    //     JSON.parse(Menulist)?.map((data: any) => {
    //         const fistMach = data?.menu_name.toLowerCase() === lastSegment && data;
    //         if (fistMach.length > 0) {
    //             setFilteredData(fistMach)
    //         }
    //         const result = data?.submenus?.filter((menu: any) => menu.menu_name.toLowerCase() === lastSegment)
    //         if (result.length > 0) {
    //             setFilteredData(result)
    //         }
    //     })
    // }, [Menulist])
    useEffect(() => {
       
        setFilteredData(dataaccess(Menulist, lastSegment, { urlcheck: ""},{ datatest: "" }));
    }, [Menulist, lastSegment]);


    const ClassURL = QUERY_KEYS_CLASS.GET_CLASS;
    const DeleteClassURL = QUERY_KEYS_CLASS.CLASS_DELETE;
    const columns = Class_COLUMNS;
    const navigate = useNavigate();
    const { getData, deleteData,loading } = useApi()
    const [dataClass, setDataClass] = useState<IClass[]>([])
    const [dataDelete, setDataDelete] = useState(false)
    const [dataDeleteId, setDataDeleteId] = useState<number>()


    const callAPI = async () => {

        getData(`${ClassURL}`).then((data: { data: IClass[] }) => {

            if (data.data) {
                setDataClass(data?.data)
            }
        }).catch(e => {
            if (e?.response?.status === 401) {
                navigate("/")
            }
            toast.error(e?.message, {
                hideProgressBar: true,
                theme: "colored",
            });
        });
 
    }

    useEffect(() => {
        callAPI()
    }, [])

    const handleEditFile = (id: number) => {
        navigate(`edit-Class/${id}`)
    };

    const handlecancel = () => {
        setDataDelete(false)
    };

    const handleDeleteFiles = (id: number) => {
        setDataDeleteId(id)
        setDataDelete(true)
    }

    const handleDelete = (id: number | undefined) => {
        deleteData(`${DeleteClassURL}/${id}`).then((data: { message: string, status:any }) => {
            if(data.status === 200){
            toast.success("Class deleted successfully", {
                hideProgressBar: true,
                theme: "colored",

            });
            callAPI();
            setDataDelete(false);
        }else{
            toast.success(data?.message, {
                hideProgressBar: true,
                theme: "colored",
            });
        }
        }).catch(e => {
            if (e?.response?.status === 401) {
                navigate("/")
            }
            toast.error(e?.message, {
                hideProgressBar: true,
                theme: "colored",

            });
        });
    }
    return (
        <>
         {loading && <FullScreenLoader />}
            <div className='dashboard'>
                <div className='card'>
                    <div className='card-body'>
                    
                        <div className='table_wrapper'>
                            <div className='table_inner'>
                                <div className='containerbutton' style={{display:"flex", flexDirection:"row",justifyContent:"space-between"}}>
                                    <Typography variant="h6" sx={{m:1}}>
                                        <div className='main_title'> Class</div>
                                    </Typography>
                                    
                                    {filteredData?.form_data?.is_save === true && (
                                            <Button
                                             className='mainbutton'
                                                variant="contained"
                                                component={NavLink}
                                                to="add-Class"
                                            >
                                                Add Class
                                            </Button>
                                          )}  
                                </div>
                                <Box marginTop="10px" >
                                    <MaterialReactTable
                                        columns={columns}
                                        data={filteredData?.form_data?.is_search ? dataClass : []}
                                        // data={filteredData?.[0]?.is_search ? dataEntity : []}
                                        enableRowVirtualization
                                        positionActionsColumn="first"
                                        muiTablePaperProps={{
                                            elevation: 0
                                        }}
                                        enableRowActions
                                        displayColumnDefOptions={{
                                            'mrt-row-actions': {
                                                header: 'Actions',
                                                size: 150,
                                            },
                                        }}
                                        renderRowActions={(row) => (
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexWrap: "nowrap",
                                                    gap: "0.5",
                                                    marginLeft: "-5px",
                                                    width: "140px",
                                                }}
                                            >
                                               
                                                {filteredData?.form_data?.is_update === true && (
                                                    <Tooltip arrow placement="right" title="Edit">
                                                        <IconButton
                                                            sx={{ width: "35px", height: "35px",color:tabletools[namecolor] }}
                                                            onClick={() => {
                                                                handleEditFile(row?.row?.original?.id);
                                                            }}
                                                        // disabled={!filteredData?.is_update}
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                )}   
                                                <Tooltip arrow placement="right" title="Delete">
                                                    <IconButton
                                                        sx={{ width: "35px", height: "35px",color:tabletools[namecolor] }}
                                                        onClick={() => {
                                                            handleDeleteFiles(row?.row?.original?.id);
                                                        }}
                                                    >
                                                        <TrashIcon />
                                                    </IconButton>
                                                </Tooltip>

                                            </Box>
                                        )}
                                    />
                                </Box>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DeleteDialog
                isOpen={dataDelete}
                onCancel={handlecancel}
                onDeleteClick={() => handleDelete(dataDeleteId)}
                title="Delete documents?"
            />
        </>
    )
}

export default Class