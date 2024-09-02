
import React, { useEffect, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import {
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useApi from "../../hooks/useAPI";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface Language {
  id: string;
  is_active?: number;
  language_name: string;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(
  languageName: string,
  selectedLanguages: readonly Language[],
  theme: Theme
) {
  return {
    fontWeight:
      selectedLanguages
        .map((lang) => lang.language_name)
        .indexOf(languageName) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function AdminLenguage() {
  let AdminId = localStorage.getItem("_id");
  console.log(AdminId);
  // const storeLanguage: Language[] = [];
  interface Box {
    id: number;
    language_id: any;
    proficiency: any;
  }
  const { getData, postData, putData ,deleteData} = useApi();

  const theme = useTheme();
  const [alllanguage, setAllLanguage] = React.useState<Language[]>([]);
  const [selectedLeng, setSelectedLeng] = useState<any>();
  const [editFalg, setEditFlag] = useState<boolean>(false);
  //const [selectedLeng,setSelectedLeng]=useState();
  // const [id, setId] = useState([]);

  // const handleIdChange = () => {
  //   setId();

  // };

  const [boxes, setBoxes] = useState<Box[]>([]);
  const [proficiency, setProficiency] = useState<any>("read");

  const addRow = () => {
    setBoxes((prevBoxes) => [
      ...prevBoxes,
      { id: 0, language_id: "", proficiency: "" },
    ]);
  };

  const deleterow = (id: any, indx: number) => {
    if(id !== 0)
      {
        deleteData(`/admin_language_known/delete/${id}`).then((data: any) => {
          if(data.status === 200){
            toast.success("Language deleted successfully", {
              hideProgressBar: true,
              theme: "colored",
          });
          }
      }).catch(e => {
          toast.error(e?.message, {
              hideProgressBar: true,
              theme: "colored",
          });
      });
  
    }
    // setBoxes(boxes.filter((box) => box.id !== id));
    setBoxes(boxes.filter((box, index) => index !== indx));
  //   toast.success("Admin Language known Deleted Successfully", {
  //     hideProgressBar: true,
  //     theme: "colored",
  // });
  };

  useEffect(() => {
    getData(`${"language/list"}`)
      .then((data: any) => {
        if (data?.status === 200) {
          const filteredData = data?.data?.filter((item:any) => item?.is_active === 1);
          setAllLanguage(filteredData ||[]);
          // setAllLanguage(data?.data);
        }
      })
      .catch((e) => {
        toast.error(e?.message, {
          hideProgressBar: true,
          theme: "colored",
        });
      });
    getData(`${"admin_language_known/edit/" + AdminId}`)
      .then((data: any) => {
        console.log(data);
        if (data?.status === 200) {
          //    setAllLanguage(data?.data);
          const lenduageIds = data.data.language_id;
          setSelectedLeng(lenduageIds);
          data.data.map((item: any, index: number) => {
            const newBox: Box = {
              id: item.id,
              language_id: item.language_id,
              proficiency: item.proficiency,
            };
            if (!boxes.some((box) => box.id === newBox.id)) {
              // setBoxes([...boxes, newBox]);
              setBoxes((prevBoxes) => [...prevBoxes, newBox]);
            }
          });
        } else if (data?.status === 404) {
          setBoxes([{ id: 1, language_id: "", proficiency: "" }]);
          setEditFlag(true);
        } else {
          toast.error(data?.message, {
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
  }, []);



  const saveLanguage = (
    event: React.FormEvent<HTMLFormElement | typeof setSelectedLeng>
  ) => {
    event.preventDefault();
    boxes.forEach((box) => {
      const payload = {
        admin_id: AdminId,
        language_id: box.language_id,
        proficiency: box.proficiency,
      };
      if (editFalg) {
        postData("admin_language_known/add", payload)
          .then((data: any) => {
            if(data.status === 200) {

              toast.success("Language saved successfully", {
                hideProgressBar: true,
                theme: "colored",
            });
            }else{
              toast.error(data?.message, {
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
      } else {
        if (box.id === 0) {
          postData("admin_language_known/add", payload)
            .then((data: any) => {
              if(data.status === 200) {
                toast.success("Language saved successfully", {
                  hideProgressBar: true,
                  theme: "colored",
              });
              }else{
                toast.error(data?.message, {
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
        } else {
            // console.log("this is kjnfdfsj",payload)
          putData("admin_language_known/edit/" + AdminId, payload)
            .then((data: any) => {
              if(data.status === 200){

                toast.success("Language updated successfully", {
                  hideProgressBar: true,
                  theme: "colored",
              });
              }else{
                toast.error(data?.message, {
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
        }
      }
    });

    // payloads.forEach(payload => {

    // });
  };

  //
  const handleChange = (event: SelectChangeEvent<string>, index: number) => {
    const { name, value } = event.target;
    setBoxes((prevBoxes) =>
      prevBoxes.map((box, i) =>
        i === index ? { ...box, language_id: value } : box
      )
    );
    // setFormData({
    //     ...formData, [name]: value
    // })
  };

  const handleChange1 = (event: SelectChangeEvent<string>, index: number) => {
    const { value } = event.target;
    setBoxes((prevBoxes) =>
      prevBoxes.map((box, i) =>
        i === index ? { ...box, proficiency: value } : box
      )
    );
  };

  // console.log("boxes sasa", boxes);
  return (
    <form onSubmit={saveLanguage}>
      {boxes.map((box, index) => (
        <div className="row d-flex justify-content-start align-items-center mt-4 ">
          <div className="col-md-4 ">
            <FormControl required sx={{ m: 1, minWidth: 320, width: "100%" }}>
              <InputLabel id="demo-simple-select-required-label">
                Language
              </InputLabel>
              <Select
                labelId={`language-label-${box.id}`}
                id={`language-select-${box.id}`}
                name={`language_${box.id}`}
                value={box.language_id}
                label="language *"
                onChange={(e) => {
                  handleChange(e, index);
                }}
              >
                {alllanguage.map((lang) => (
                  <MenuItem value={lang.id}>{lang.language_name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="col-md-4 col-sm-3">
            <FormControl required sx={{ m: 1, minWidth: 220, width: "100%" }}>
              <InputLabel id="demo-simple-select-required-label">
                Proficiency
              </InputLabel>
              <Select
                labelId={`language-label-${box.id}`}
                id={`language-select-${box.id}`}
                name={`language_${box.id}`}
                value={box.proficiency}
                label="proficiency *"
                onChange={(e) => {
                  handleChange1(e, index);
                }}
              >
                <MenuItem value={"read"}>Read</MenuItem>
                <MenuItem value={"write"}>Write</MenuItem>
                <MenuItem value={"both"}>Both</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="col-md-4 col-sm-3">
            <IconButton onClick={addRow} sx={{ width: "35px", height: "35px" }}>
              <AddIcon />
            </IconButton>
            {boxes.length !== 1 && (
              <IconButton
                onClick={() => deleterow(box.id,index)}
                sx={{ width: "35px", height: "35px", color: "#f70404b8" }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </div>
        </div>
      ))}
      <div className="row justify-content-center">
        <div className="col-md-12">
          <button className="btn btn-primary" style={{ marginTop: "25px" }}>
            save your language
          </button>
        </div>
      </div>
    </form>
  );
}

export default AdminLenguage;

