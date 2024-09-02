import React, { useState } from 'react'
import '../Uploadpdf/Uploadpdf.scss';
import useApi from "../../hooks/useAPI";
import { Box, Button, Typography } from '@mui/material';
import { QUERY_KEYS_COURSE } from '../../utils/const';
import FullScreenLoader from '../Loader/FullScreenLoader';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from "react-router-dom";

const Uploadpdf = () => {
    const location = useLocation();
    const navigator = useNavigate();
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const lastSegment = pathSegments[pathSegments.length - 1].toLowerCase();
    const Menulist: any = localStorage.getItem('menulist1');
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

    const CourseURL = QUERY_KEYS_COURSE.GET_COURSE;
    const DeleteCourseURL = QUERY_KEYS_COURSE.COURSE_DELETE;
    const { getData, loading ,postFileData} = useApi();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files);
            const pdfFiles = filesArray.filter(file => file.type === 'application/pdf');

            if (pdfFiles.length !== filesArray.length) {
                toast.error("Only PDF files are allowed");
            }

            setSelectedFiles(pdfFiles);
        }
    };

    // const handleFileUpload = async () => {
    //     if (selectedFiles.length === 0) {
    //         toast.error("No files selected");
    //         return;
    //     }

    //     const formData = new FormData();
    //     selectedFiles.forEach(file => {
    //         formData.append('pdf_file', file);
    //     });
    //     formData.append('teacher_id', "4");
    //     try {
    //         const response = await fetch('http://13.232.125.29:8000/upload-pdf', {
    //             method: 'POST',
    //             body: formData
    //         });

    //         if (response.ok) {
    //             toast.success("Files uploaded successfully");
    //             setSelectedFiles([]); // Clear the selected files after successful upload
    //         } else {
    //             toast.error("Failed to upload files");
    //         }
    //     } catch (error) {
    //         toast.error("An error occurred during file upload");
    //     }
    // };
    const handleFileUpload = async () => {
        if (selectedFiles.length === 0) {
            toast.error("No files selected");
            return;
        }
    
        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append('pdf_file', file); 
        });
        formData.append('teacher_id', "4"); 
       await postFileData(`${"/upload-pdf"}`,formData)
        .then((data: any) => {
          if (data?.status === 200) {
            toast.success(data?.message, {
              hideProgressBar: true,
              theme: "colored",
            });
          } else {
            toast.error(data?.message, {
              hideProgressBar: true,
              theme: "colored",
            });;
          }
        })
        .catch((e) => {
          toast.error(e?.message, {
            hideProgressBar: true,
            theme: "colored",
          });
        });
    };
    const usertype:any = localStorage.getItem('user_type')
    
    if (usertype !== 'admin') {
        navigator('/main/*')
      }

    return (
        <>
            {loading && <FullScreenLoader />}
            <div className='dashboard'>
                <div className='card'>
                    <div className='card-body'>
                        <div className='table_wrapper'>
                            <div className='table_inner'>
                                <div className='containerbutton' style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                    <Typography variant="h6" sx={{ m: 1 }}>
                                        {/* <div className='main_title'>Teacher</div> */}
                                    </Typography>
                                </div>
                                <Box marginTop="10px">
                                    <Button variant="contained" component="label"  className="custom-button">
                                        Upload PDFs
                                        <input type="file" 
                                        // accept="application/pdf"
                                        accept=".pdf"
                                         hidden multiple onChange={handleFileChange} />
                                    </Button>
                                    <div>
                                        {selectedFiles.length > 0 && (
                                            <ul>
                                                {selectedFiles.map((file, index) => (
                                                    <li key={index}>{file.name}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </Box>
                                <Button sx={{ marginTop: 5 }} variant="contained" onClick={handleFileUpload} disabled={selectedFiles.length === 0}>
                                    Submit
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Uploadpdf;
