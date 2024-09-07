import React, { useContext, useEffect, useState } from "react";
import "../Uploadpdf/Uploadpdf.scss";
import useApi from "../../hooks/useAPI";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { QUERY_KEYS_COURSE, QUERY_KEYS_SUBJECT } from "../../utils/const";
import FullScreenLoader from "../Loader/FullScreenLoader";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import NameContext from "../Context/NameContext";
import {
  inputfield,
  inputfieldhover,
  inputfieldtext,
} from "../../utils/helpers";

interface Classes {
  id: number;
  class_name: string;
  new_class_name: string;
  class_id: string;
}

interface FileList {
  pdf_file_name: string;
  pdf_path: string;
  upload_by: number;
  upload_date_time: string;
}

const PDFList = () => {
  const context = useContext(NameContext);
  const { namecolor }: any = context;
  const location = useLocation();
  const navigator = useNavigate();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const SubjectURL = QUERY_KEYS_SUBJECT.GET_SUBJECT;
  const usertype: any = localStorage.getItem("user_type");
  let AdminId: string | null = localStorage.getItem("_id");
  if (AdminId) {
    AdminId = String(AdminId);
  }
  const [selectedClass, setSelectedClass] = useState("");
  const [dataSubject, setDataSubject] = useState([]);
  const [classes, setClasses] = useState<Classes[]>([]);
  const [fileList, setFileList] = useState<FileList[]>([]);
  const [selectedFile, setSelectedFile] = useState("");

  const { getData, loading, deleteFileData } = useApi();

  const callAPI = async () => {
    getData(`${SubjectURL}`)
      .then((data: any) => {
        if (data.data) {
          setDataSubject(data?.data);
        }
      })
      .catch((e) => {
        toast.error(e?.message, {
          hideProgressBar: true,
          theme: "colored",
        });
      });
  };
  useEffect(() => {
    callAPI();

    getData("/class/list")
      .then((response: any) => {
        if (response.status === 200) {
          // const filteredData = response?.data?.filter((item:any) => item?.is_active === 1);
          let filteredData: any[] = [];
          response?.data?.forEach((item: any) => {
            if (item?.is_active) {
              let updatedClassName = item.class_name.split("_").join(" ");
              item.new_class_name =
                updatedClassName.charAt(0).toUpperCase() +
                updatedClassName.slice(1);
              filteredData.push(item);
            }
          });

          setClasses(filteredData || []);
          // setCourses(response.data);
        }
      })
      .catch((error) => {
        toast.error(error?.message, {
          hideProgressBar: true,
          theme: "colored",
        });
      });
  }, []);

  useEffect(() => {
    const tempData = [
      {
        pdf_file_name: "class_10_geo1.pdf",
        pdf_path:
          "/home/ubuntu/llama-model/pdf_files/class_10/class_10_geo1.pdf",
        upload_by: 513,
        upload_date_time: "Mon, 02 Sep 2024 08:32:33 GMT",
      },
      {
        pdf_file_name: "class_10_geo2.pdf",
        pdf_path:
          "/home/ubuntu/llama-model/pdf_files/class_10/class_10_geo2.pdf",
        upload_by: 513,
        upload_date_time: "Mon, 02 Sep 2024 08:32:33 GMT",
      },
      {
        pdf_file_name: "class_10_geo3.pdf",
        pdf_path:
          "/home/ubuntu/llama-model/pdf_files/class_10/class_10_geo3.pdf",
        upload_by: 513,
        upload_date_time: "Mon, 02 Sep 2024 08:32:33 GMT",
      },
      {
        pdf_file_name: "class_10_geo4.pdf",
        pdf_path:
          "/home/ubuntu/llama-model/pdf_files/class_10/class_10_geo4.pdf",
        upload_by: 513,
        upload_date_time: "Mon, 02 Sep 2024 08:32:33 GMT",
      },
      {
        pdf_file_name: "class_10_geo5.pdf",
        pdf_path:
          "/home/ubuntu/llama-model/pdf_files/class_10/class_10_geo5.pdf",
        upload_by: 513,
        upload_date_time: "Mon, 02 Sep 2024 08:32:33 GMT",
      },
      {
        pdf_file_name: "class_10_geo6.pdf",
        pdf_path:
          "/home/ubuntu/llama-model/pdf_files/class_10/class_10_geo6.pdf",
        upload_by: 513,
        upload_date_time: "Mon, 02 Sep 2024 08:32:33 GMT",
      },
      {
        pdf_file_name: "class_10_geo7.pdf",
        pdf_path:
          "/home/ubuntu/llama-model/pdf_files/class_10/class_10_geo7.pdf",
        upload_by: 513,
        upload_date_time: "Mon, 02 Sep 2024 08:32:33 GMT",
      },
      {
        pdf_file_name: "class_10_geo8.pdf",
        pdf_path:
          "/home/ubuntu/llama-model/pdf_files/class_10/class_10_geo8.pdf",
        upload_by: 513,
        upload_date_time: "Mon, 02 Sep 2024 08:32:33 GMT",
      },
    ];

    if (selectedClass) {
      getData(
        `http://13.232.96.204:5000/display-files?class_name=${selectedClass}`
      )
        .then((response: any) => {
          if (response.status === 200) {
            setFileList(response?.filenames);
          }
        })
        .catch((error) => {
          toast.error(error?.message, {
            hideProgressBar: true,
            theme: "colored",
          });
        });
    }
  }, [selectedClass]);

  if (usertype !== "admin") {
    navigator("/main/*");
  }

  const handleChange = (event: any) => {
    const { name, value } = event?.target;
    if (name === "class_id") setSelectedClass(value);
    else setSelectedFile(value);
  };

  const deleteFile = () => {
    const fileName = fileList.reduce((acc, crr) => {
      if (crr.pdf_path === selectedFile) acc = crr.pdf_file_name;
      return acc;
    }, "");
    const payload = {
      file_path: selectedFile,
      file_name: fileName,
      class_name: selectedClass,
    };
    deleteFileData(`http://13.232.96.204:5000/delete-files`, payload)
      .then((data: any) => {
        setSelectedFile("");
        if (data.status === 200) {
          toast.success("File deleted successfully", {
            hideProgressBar: true,
            theme: "colored",
          });
        }
      })
      .catch((e) => {
        toast.error(e?.message, {
          hideProgressBar: true,
          theme: "colored",
        });
      });
  };

  return (
    <>
      {loading && <FullScreenLoader />}
      <div className="dashboard">
        <div className="card">
          <div className="card-body">
            <div className="table_wrapper">
              <div className="table_inner">
                <div
                  className="containerbutton"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6" sx={{ m: 1 }}>
                    {/* <div className='main_title'>Teacher</div> */}
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    marginBottom: "20px",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <FormControl sx={{ minWidth: 300 }}>
                      <InputLabel
                        id="select-class-label"
                        sx={{ color: inputfieldtext(namecolor) }}
                      >
                        Class *
                      </InputLabel>
                      <Select
                        labelId="select-class-label"
                        value={selectedClass}
                        onChange={handleChange}
                        label="Class *"
                        placeholder="Select class"
                        variant="outlined"
                        name="class_id"
                        sx={{
                          backgroundColor: inputfield(namecolor),
                          color: inputfieldtext(namecolor),
                        }}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              backgroundColor: inputfield(namecolor),
                              color: inputfieldtext(namecolor),
                            },
                          },
                        }}
                      >
                        {classes?.map((classes) => (
                          <MenuItem
                            key={classes.class_name}
                            value={classes.class_name}
                            sx={{
                              backgroundColor: inputfield(namecolor),
                              color: inputfieldtext(namecolor),
                              "&:hover": {
                                backgroundColor: inputfieldhover(namecolor), // Change this to your desired hover background color
                              },
                            }}
                          >
                            {classes?.new_class_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <FormControl sx={{ minWidth: 300 }}>
                      <InputLabel
                        id="select-file-label"
                        sx={{ color: inputfieldtext(namecolor) }}
                      >
                        File *
                      </InputLabel>
                      <Select
                        labelId="select-file-label"
                        value={selectedFile}
                        disabled={!selectedClass}
                        onChange={handleChange}
                        label="File *"
                        placeholder="Select file"
                        variant="outlined"
                        name={"file_id"}
                        sx={{
                          backgroundColor: inputfield(namecolor),
                          color: inputfieldtext(namecolor),
                        }}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              backgroundColor: inputfield(namecolor),
                              color: inputfieldtext(namecolor),
                            },
                          },
                        }}
                      >
                        {fileList?.map((file) => (
                          <MenuItem
                            key={file.pdf_path}
                            value={file.pdf_path}
                            sx={{
                              backgroundColor: inputfield(namecolor),
                              color: inputfieldtext(namecolor),
                              "&:hover": {
                                backgroundColor: inputfieldhover(namecolor), // Change this to your desired hover background color
                              },
                            }}
                          >
                            {file?.pdf_file_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <a
                      href={
                        selectedFile.length > 0
                          ? `http://13.232.96.204:5000/files${selectedFile}`
                          : ""
                      }
                      target={selectedFile.length > 0 ? "_blank" : ""}
                    >
                      <Button
                        variant="contained"
                        component="label"
                        className={`custom-button ${
                          !selectedFile ? "disabled-mainbutton" : "mainbutton"
                        }`}
                        disabled={!selectedFile}
                      >
                        Preview
                      </Button>
                    </a>
                  </div>
                  <div>
                    <Button
                      variant="contained"
                      component="label"
                      className={`custom-button ${
                        !selectedFile ? "disabled-mainbutton" : "mainbutton"
                      }`}
                      disabled={!selectedFile}
                      onClick={deleteFile}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                {/* {selectedFiles.length > 0 && (
                  <div className="file-list-container">
                    <div className="file-columns">
                      <div className="file-column">
                        {firstBatch.map((file, index) => (
                          <div
                            key={index}
                            className="file-item"
                            //  onClick={() => setSelectedPdf(URL.createObjectURL(file))}
                          >
                            {file.name}
                          </div>
                        ))}
                      </div>
                      <div className="file-column">
                        {secondBatch.map((file, index) => (
                          <div
                            key={index}
                            className="file-item"
                            // onClick={() => setSelectedPdf(URL.createObjectURL(file))}
                          >
                            {file.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )} */}
                {/* <Button
                  className={"mainbutton"}
                  sx={{ marginTop: 5 }}
                  variant="contained"
                  // onClick={handleFileUpload}
                  // disabled={selectedFiles.length === 0}
                >
                  Submit
                </Button> */}
              </div>
              {/* {selectedPdf && (
                                    <div className='pdfView'>
                                    <button onClick={handleClose} className='closeButton'>
                                      &times; 
                                    </button>
                                    <iframe src={selectedPdf} width="100%" height="800px" />
                                  </div>
                                     )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PDFList;
