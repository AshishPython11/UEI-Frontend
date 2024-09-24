// import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
// import React, { FunctionComponent } from "react";

// export const ProfileDialog: FunctionComponent<{
//   isOpen: boolean;
//   onCancel: () => void;
//   onOkClick: () => void;
//   title: string;
// }> = ({ isOpen, onCancel, onOkClick, title}) => (

//   <Dialog
//     open={isOpen}
//     onClose={onCancel}
//     aria-labelledby="alert-dialog-title"
//     aria-describedby="alert-dialog-description"
//     disableBackdropClick
//   >
//     <DialogTitle id="alert-dialog-title">
//       {title}
//     </DialogTitle>
//     <DialogContent>
//       <DialogContentText id="alert-dialog-description">
//       To access the chat feature, please complete your profile by filling in all required fields. Thank you!
//       </DialogContentText>
//     </DialogContent>
//     <DialogActions>
//       <Button onClick={onCancel} autoFocus>
//         Cancel
//       </Button>
//       <Button onClick={onOkClick} autoFocus>
//        Ok
//       </Button>
//     </DialogActions>
//   </Dialog>
// );

import React, {
  FunctionComponent,
  useState,
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  useRef,
  useContext,
} from "react";
import Backdrop from "@mui/material/Backdrop";
import type {
  DialogProps,
  FilledTextFieldProps,
  OutlinedTextFieldProps,
  StandardTextFieldProps,
  TextFieldVariants,
} from "@mui/material";

import "bootstrap/dist/css/bootstrap.min.css";
import "./stylechat.css"; // Import your CSS file
import useApi from "../../hooks/useAPI";
import { toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import { Country, State, City } from "country-state-city";
import { QUERY_KEYS_STUDENT } from "../../utils/const";
import SendIcon from "@mui/icons-material/Send";
import { JSX } from "react/jsx-runtime";
import NameContext from "../../Pages/Context/NameContext";
import {
  chatcalandericon,
  chatdatetext,
  chatdialog,
  chattextbgleft,
  chattextbgright,
  chattextleft,
  chattextright,
  inputfieldtext,
} from "../../utils/helpers";
import CloseIcon from "@mui/icons-material/Close";
import { Flag } from "@mui/icons-material";
import { ChatDialogClose } from "./ChatDialogClose";

interface Institute {
  id: number;
  institution_id: string;
  institution_name: string;
}

interface Course {
  id: number;
  course_name: string;
  course_id: string;
}
interface Classes {
  id: number;
  class_name: string;
}

interface Subject {
  id: string;
  subject_name: string;
  subject_id: string;
}
interface Hobby {
  hobby_name: string;
  id: number;
  is_active: number;
}

interface Language {
  id: string;
  is_active?: number;
  language_name: string;
}

interface Option {
  value: string;
  label: string;
}
interface Mapping {
  [key: string]: string[];
}

export const ProfileDialog: FunctionComponent<{
  isOpen: boolean;
  onCancel: () => void;
  onOkClick: () => void;
  title: string;
}> = ({ isOpen, onCancel, onOkClick, title }) => {
  const handleClose: DialogProps["onClose"] = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    onCancel();
  };
  const context = useContext(NameContext);
  const { namecolor, setNamecolor }: any = context;
  let StudentId = localStorage.getItem("_id");
  let usertype = localStorage.getItem("user_type");
  const { getData, postData, postFileData } = useApi();
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classes, setClasses] = useState<Classes[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [currentSection, setCurrentSection] = useState<string | null>("basic");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [error1, setError1] = useState("");
  const [errordate, setErordate] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [messages, setMessages] = useState<
    { text: string; type: "question" | "answer" }[]
  >([]);
  const [allHobbies, setAllHobbies] = useState<Hobby[]>([]);
  const [alllanguage, setAllLanguage] = useState<Language[]>([]);

  const [selectedHobby, setSelectedHobby] = useState<any>("");
  const [selectedLanguage, setSelectedLanguage] = useState<any>("");
  const [selectedproficiency, setSelectedproficiency] = useState<any>("");
  const [selectedgender, setSelectedgender] = useState<any>("");
  const [selectedInstitute, setSelectedInstitute] = useState<any>("");
  const [selectCourse, setSelectedCourse] = useState<any>("");
  const [selectSubject, setSelectedSubject] = useState<any>("");
  const [selectedInstituteType, setSelectedInstituteType] = useState<any>("");
  const [selectedBoard, setSelectedBoard] = useState<any>("");
  const [selectedAcademicState, setSelectedAcademicState] = useState<any>("");
  const [selectedClass, setSelectedClass] = useState<any>("");
  const [selectedLearningStyle, setSelectedLearningStyle] = useState<any>("");
  const [selectedAcademicYear, setSelectedAcademicYear] = useState<any>("");

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedstate, setSelectedState] = useState(null);
  const [stateOptions, setStateOptions] = useState<Option[]>([]);
  const [fullName, setFullName] = useState(false);
  const [genderError, setGenderError] = useState(false);
  const [motherNameError, setMotherNameError] = useState(false);
  const [fName, setFName] = useState(false);
  const [gName, setgName] = useState(false);
  const [phnumber, setphnumber] = useState(false);
  const [distic, setdisct] = useState(false);
  const [preferenceError, setpreferenceError] = useState(false);
  const [pincode, setpincode] = useState(false);
  const [per, setper] = useState(false);
  const [checked, setchecked] = useState(false);
  const [closemodel, setclosemodel] = useState(false);
  const [answeredData, setAnsweredData] = useState<any>();
  // const [open, setOpen] = useState(true);

  const errordata = [
    "Please enter a valid full name only characters allowed.",
    "",
    "",
    "Please enter a valid mother name only characters allowed.",
    "Please enter a valid father name only characters allowed.",
    "Please enter a valid guardian name only characters allowed.",
    "",
    "",
    "",
    "Mobile number should be 10 digits",
    "WhatsApp number should be 10 digits",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "Please enter a valid district name only characters allowed.",
    "Please enter a valid city name only characters allowed.",
    "Invalid Pincode. It must be 6 digits only.",
    "",
    "",
    "",
    "",
    "Please enter a valid preference only characters allowed.",
    "Please enter a valid percentage.",
  ];
  const profileURL = QUERY_KEYS_STUDENT.STUDENT_GET_PROFILE;
  const callAPI = async () => {
    if (usertype === "student") {
      getData(`${profileURL}/${StudentId}`)
        .then((data: any) => {
          if (data.status === 200) {
            //  navigate("/main/Dashboard");
            setAnsweredData(data.data);
          }
        })
        .catch((e: any) => {
          // toast.error(e?.message, {
          //     hideProgressBar: true,
          //     theme: "colored",
          //     });
        });
    }
  };

  useEffect(() => {
    callAPI();
  }, []);

  const initialQuestions: { [key: string]: string[] } = {
    basic: [
      "What is your full name?",
      "What is your gender?",
      "What is your DOB?",
      "What is your mother's name?",
      "What is your father's name?",
      "What is your guardian's name?",
      "What is your main learning goal or interest for visiting our application?",
      "Upload your profile picture",
      "Please select your mobile number country code",
      "What is your mobile number?",
      "What is your WhatsApp number?",
      "Hi! Please provide your academic information! What is your institute type?",
      "Please select your board",
      "Please select your state",
      "Please select your class",
      "Please select your course",
      "Please select your institution",
      "What is your learning style?",
      "Please select year",
      "Please select your current country of residence",
      "Which state do you currently reside in?",
      "Which district do you currently live in?",
      "Which city do you live in?",
      "What is your Pin code?",
      "What is your first address?",
      "What is your second address?",
      "Hi, Please provide your subject preference information! what is your course name to which your subject belongs?",
      "Select your preference subject name",
      "What is your preference?",
      "Add your score in percentage",
      "Hi, Please choose your hobbies",
      "Select your known language",
      "What is your proficiency in the selected language?",
      "Thanks for providing your personal information",
    ],
  };

  const sectionOrder = ["basic"];

  const mapping: Mapping = {
    // Basic Info
    "What is your full name?": ["0", "basic_info", "first_name", "last_name"],
    "What is your gender?": ["1", "basic_info", "gender"],
    "What is your DOB?": ["2", "basic_info", "dob"],
    "What is your mother's name?": ["3", "basic_info", "mother_name"],
    "What is your father's name?": ["4", "basic_info", "father_name"],
    "What is your guardian's name?": ["5", "basic_info", "guardian_name"],
    "What is your main learning goal or interest for visiting our application?":
      ["6", "basic_info", "aim"],
    "Upload your profile picture": ["7", "basic_info", "pic_path"],

    // Address
    "What is your first address?": ["24", "address", "address1"],
    "What is your second address?": ["25", "address", "address2"],
    "Which city do you live in?": ["22", "address", "city"],
    "Which district do you currently live in?": ["21", "address", "district"],
    "Which state do you currently reside in?": ["20", "address", "state"],
    "Please select your current country of residence": [
      "19",
      "address",
      "country",
    ],
    "What is your Pin code?": ["23", "address", "pincode"],

    // Contact
    "Please select your mobile number country code": [
      "8",
      "contact",
      "mobile_isd_call",
      "mobile_isd_watsapp",
    ],
    "What is your mobile number?": ["9", "contact", "mobile_no_call"],
    "What is your WhatsApp number?": ["10", "contact", "mobile_no_watsapp"],

    //Subject
    "Hi, Please provide your subject preference information! what is your course name to which your subject belongs?":
      ["26", "subject_preference", "course_name"],
    "Select your preference subject name": [
      "27",
      "subject_preference",
      "subject_name",
    ],
    "What is your preference?": ["28", "subject_preference", "preference"],
    "Add your score in percentage": [
      "29",
      "subject_preference",
      "score_in_percentage",
    ],

    //Language Known
    "Select your known language": ["31", "language_known", "language_id"],
    "What is your proficiency in the selected language?": [
      "32",
      "language_known",
      "proficiency",
    ],

    //Hobby
    "Hi, Please choose your hobbies": ["30", "hobby", "hobby_id"],

    // Academic Information
    "Hi! Please provide your academic information! What is your institute type?":
      ["11", "academic_history", "institution_type"],
    // School-specific
    "Please select your board": ["12", "academic_history", "board"],
    "Please select your class": ["14", "academic_history", "class_id"],
    "Please select your state?": [
      "13",
      "academic_history",
      "state_for_stateboard",
    ], // This is for state board-specific question

    // College-specific
    "Please select your course": ["15", "academic_history", "course_id"],
    "What is your institution name?": [
      "16",
      "academic_history",
      "institution_name",
    ],
    "What is your learning style?": [
      "17",
      "academic_history",
      "learning_style",
    ],
    "Please select year": ["18", "academic_history", "year"],
  };

  const adjustQuestionsForInstitutionType = (institutionType: string) => {
    let adjustedQuestions = [...initialQuestions[currentSection!]];
    let adjustedMapping = { ...mapping };
    let board = answeredData?.academic_history?.board;

    if (institutionType === "school") {
      // Remove college-specific questions
      if (board === "state_board") {
        adjustedQuestions = adjustedQuestions.filter(
          (question) =>
            question !== "Please select your course" &&
            question !== "Please select your institution" &&
            question !== "What is your learning style?" &&
            question !== "Please select year"
        );
      } else {
        adjustedQuestions = adjustedQuestions.filter(
          (question) =>
            question !== "Please select your course" &&
            question !== "Please select your institution" &&
            question !== "What is your learning style?" &&
            question !== "Please select year" &&
            question !== "Please select your state"
        );
      }

      // Remove college-specific mappings
      delete adjustedMapping["Please select your course"];
      delete adjustedMapping["What is your institution name?"];
      delete adjustedMapping["What is your learning style?"];
      delete adjustedMapping["Please select year"];
    } else if (institutionType === "college") {
      // Remove school-specific questions
      adjustedQuestions = adjustedQuestions.filter(
        (question) =>
          question !== "Please select your board" &&
          question !== "Please select your class" &&
          question !== "Please select your state"
      );

      // Remove school-specific mappings
      delete adjustedMapping["Please select your board"];
      delete adjustedMapping["Please select your class"];
    }

    return { adjustedQuestions, adjustedMapping };
  };

  const getSubject = async () => {
    getData("/subject/list")
      .then((response: any) => {
        if (response.status === 200) {
          const filteredData = response?.data?.filter(
            (item: any) => item?.is_active === 1
          );
          setSubjects(filteredData || []);
        }
      })
      .catch((e) => {
        toast.error(e?.message, {
          hideProgressBar: true,
          theme: "colored",
        });
      });
  };
  const chatBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentSection) {
      if (answeredData) {
        const institutionType = answeredData.academic_history.institution_type;
        const { adjustedQuestions } =
          adjustQuestionsForInstitutionType(institutionType);

        let filteredQuestions;

        if (institutionType) {
          filteredQuestions = adjustedQuestions.filter((question: string) => {
            if (question !== "Upload your profile picture") {
              const keys: any = mapping[question];
              if (!keys) return true; // If no mapping exists, keep the question

              const [index, section, ...fields] = keys;
              const sectionData = answeredData[section];

              return !fields.every((field: any) => sectionData[field]); // Remove the question if all fields have values
            }
          });
        } else {
          filteredQuestions = initialQuestions[currentSection].filter(
            (question: string) => {
              if (question !== "Upload your profile picture") {
                const keys: any = mapping[question];
                if (!keys) return true; // If no mapping exists, keep the question

                const [index, section, ...fields] = keys;
                const sectionData = answeredData[section];

                return !fields.every((field: any) => sectionData[field]); // Remove the question if all fields have values
              }
            }
          );
        }

        setCurrentQuestionIndex(Number(mapping[filteredQuestions?.[0]]?.[0]));
        setMessages([{ text: filteredQuestions[0], type: "question" }]);
      } else {
        setMessages([
          { text: initialQuestions[currentSection][0], type: "question" },
        ]);
      }
    }

    getData("/class/list")
      .then((response: any) => {
        if (response.status === 200) {
          const filteredData = response?.data?.filter(
            (item: any) => item?.is_active
          );
          setClasses(filteredData || []);
        }
      })
      .catch((error) => {
        toast.error(error?.message, {
          hideProgressBar: true,
          theme: "colored",
        });
      });

    getData("/institution/list")
      .then(async (response: any) => {
        if (response.status === 200) {
          const filteredData = await response?.data?.filter(
            (item: any) => item?.is_active === 1
          );
          setInstitutes(filteredData || []);
        }
      })
      .catch((error) => {
        toast.error(error?.message, {
          hideProgressBar: true,
          theme: "colored",
        });
      });

    getData("/course/list")
      .then((response: any) => {
        if (response.status === 200) {
          const filteredData = response?.data?.filter(
            (item: any) => item?.is_active === 1
          );
          setCourses(filteredData || []);
        }
      })
      .catch((error) => {
        toast.error(error?.message, {
          hideProgressBar: true,
          theme: "colored",
        });
      });

    getData("hobby/list")
      .then((data: any) => {
        if (data?.status === 200) {
          const filteredData = data?.data?.filter(
            (item: any) => item?.is_active === 1
          );
          setAllHobbies(filteredData || []);
          // setAllHobbies(data?.data);
        }
      })
      .catch((e) => {
        toast.error(e?.message, {
          hideProgressBar: true,
          theme: "colored",
        });
      });

    getData("language/list")
      .then((data: any) => {
        if (data?.status === 200) {
          const filteredData = data?.data?.filter(
            (item: any) => item?.is_active === 1
          );
          setAllLanguage(filteredData || []);
          // setAllLanguage(data?.data);
        }
      })
      .catch((e) => {
        toast.error(e?.message, {
          hideProgressBar: true,
          theme: "colored",
        });
      });

    getSubject();
  }, [currentSection, answeredData]);

  useEffect(() => {
    // Scroll to the bottom of the chat box whenever messages update
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      // chatBoxRef.current = chatBoxRef.current.scrollIntoView();
    }
  }, [messages]);

  const parseDate = (dateStr: string | number | Date) => {
    if (typeof dateStr === "string") {
      // Check if the date string is in DD/MM/YYYY format
      const parts = dateStr?.split("/");
      if (parts.length === 3) {
        const [day, month, year] = parts?.map(Number);
        // Create a new Date object using year, month (0-indexed), and day
        const date = new Date(year, month - 1, day);
        if (isNaN(date?.getTime())) {
          return null;
        }
        return date?.toISOString();
      } else {
        return null;
      }
    }

    // If dateStr is already a Date object or a number, use it directly
    const date = new Date(dateStr);
    if (isNaN(date?.getTime())) {
      return null;
    }
    return date.toISOString();
  };

  const saveAnswersforBasic = (answers: string[]) => {
    const birthdate = parseDate(answers[2]);
    const fullName = answers?.[0];
    let nameParts: string[] = fullName?.split(" ");
    const firstname = nameParts?.[0];
    const lastname = nameParts?.[1];
    let payload = {
      student_login_id: StudentId,
      first_name: answeredData?.basic_info?.first_name || firstname,
      last_name: answeredData?.basic_info?.last_name || lastname,
      // gender: answers[1],
      gender: answeredData?.basic_info?.gender || answers[1] || selectedgender,
      dob: answeredData?.basic_info?.dob || birthdate,
      father_name: answeredData?.basic_info?.father_name || answers[3],
      mother_name: answeredData?.basic_info?.mother_name || answers[4],
      guardian_name: answeredData?.basic_info?.guardian_name || answers[5],
      aim: answeredData?.basic_info?.aim || answers[6],
      pic_path: answeredData?.basic_info?.pic_path || answers[7],
    };

    postData(`${"student/add"}`, payload)
      .then((data: any) => {
        if (data.status === 200) {
          const formData = new FormData();
          const nfile: any = uploadedFile;
          formData.append("file", nfile);

          if (formData.has("file")) {
            postFileData(`${"upload_file/upload"}`, formData)
              .then((data: any) => {
                if (data?.status === 200) {
                  // toast.success(data?.message, {
                  //   hideProgressBar: true,
                  //   theme: "colored",
                  // });
                } else if (data?.status === 404) {
                  // toast.error(data?.message, {
                  //   hideProgressBar: true,
                  //   theme: "colored",
                  // });
                } else {
                  // toast.error(data?.message, {
                  //   hideProgressBar: true,
                  //   theme: "colored",
                  // });
                }
              })
              .catch((e) => {
                // toast.error(e?.message, {
                //   hideProgressBar: true,
                //   theme: "colored",
                // });
              });
          }
          // toast.success("Basic information saved successfully", {
          //   hideProgressBar: true,
          //   theme: "colored",
          // });
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
  };

  const saveAnswersforContact = (answer: string[]) => {
    const contfullPhone = answer[8];
    let phoneNum = contfullPhone?.split(" ");
    const contfullPhonewtsp = answer[9];
    let phoneNumwtsp = contfullPhonewtsp?.split(" ");
    let email = localStorage.getItem("userid");

    let payload = {
      student_id: StudentId,
      mobile_isd_call: answeredData?.contact?.mobile_isd_call || answer[8],
      mobile_no_call: answeredData?.contact?.mobile_no_call || answer[9],
      mobile_isd_watsapp:
        answeredData?.contact?.mobile_isd_watsapp || answer[8],
      mobile_no_watsapp: answeredData?.contact?.mobile_no_watsapp || answer[10],
      email_id: answeredData?.contact?.email_id || email,
    };

    postData(`${"student_contact/add"}`, payload)
      .then((data: any) => {
        if (data?.status === 200) {
          // toast.success(data?.message, {
          //   hideProgressBar: true,
          //   theme: "colored",
          // });
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
  };

  const saveAnswerforAddress = (answers: string[]) => {
    const Address = answers[15];
    let addressParts = Address?.split(",");

    const payload = {
      student_id: StudentId,
      address1: answeredData?.address?.address1 || answers[24],
      address2: answeredData?.address?.address2 || answers[25],
      country: answeredData?.address?.country || answers[19],
      state: answeredData?.address?.state || answers[20],
      city: answeredData?.address?.city || answers[22],
      district: answeredData?.address?.district || answers[21],
      pincode: answeredData?.address?.pincode || answers[23],
      address_type: "current",
    };
    postData("/student_address/add", payload).then((response) => {
      if (response.status === 200) {
        // toast.success("Address information saved successfully", {
        //   hideProgressBar: true,
        //   theme: "colored",
        // });
      } else {
        toast.error(response?.message, {
          hideProgressBar: true,
          theme: "colored",
        });
      }
    });
  };

  const saveAnswersforacadmichistory = (answers: string[]) => {
    const payload = {
      student_id: StudentId,
      institution_type:
        answeredData?.academic_history?.institution_type ||
        selectedInstituteType,
      board: answeredData?.academic_history?.board || selectedBoard,
      state_for_stateboard:
        answeredData?.academic_history?.state_for_stateboard ||
        selectedAcademicState,
      institute_id:
        answeredData?.academic_history?.institute_id ||
        selectedInstitute?.toString() ||
        "95",
      course_id:
        answeredData?.academic_history?.course_id ||
        selectCourse?.toString() ||
        "18",
      learning_style:
        answeredData?.academic_history?.learning_style || selectedLearningStyle,
      class_id:
        answeredData?.academic_history?.class_id ||
        answers[14]?.toString() ||
        "",
      year: answeredData?.academic_history?.year || answers[18] || "",
    };

    postData("/new_student_academic_history/add", payload).then((response) => {
      if (response.status === 200) {
        // toast.success("Academic hinstory information saved successfully", {
        //   hideProgressBar: true,
        //   theme: "colored",
        // });
      } else {
        toast.error(response?.message, {
          hideProgressBar: true,
          theme: "colored",
        });
      }
    });
  };

  const saveAnswerforsubjectpreference = (answers: string[]) => {
    const payload = {
      student_id: StudentId,
      course_id: answeredData?.subject_preference?.course_name || selectCourse,
      subject_id: answeredData?.subject_preference?.id || selectSubject,
      preference: answeredData?.subject_preference?.preference || answers[28],
      score_in_percentage:
        answeredData?.subject_preference?.score_in_percentage || answers[29],
    };
    postData("/subject_preference/add", payload).then((response) => {
      if (response.status === 200) {
        // toast.success("Subject Preference information saved successfully", {
        //   hideProgressBar: true,
        //   theme: "colored",
        // });
      } else {
        toast.error(response?.message, {
          hideProgressBar: true,
          theme: "colored",
        });
      }
    });
  };
  const proficiency = [
    {
      lable: "Read",
      value: "read",
    },
    {
      lable: "Write",
      value: "write",
    },
    {
      lable: "Both",
      value: "both",
    },
  ];
  const gender = [
    {
      lable: "Male",
      value: "male",
    },
    {
      lable: "Female",
      value: "female",
    },
  ];
  const hobbyOptions = allHobbies.map((option) => ({
    value: option.id,
    label: option.hobby_name,
  }));
  const courseSelectOptions = courses.map((option) => ({
    value: option.id,
    label: option.course_name,
  }));
  const instituteSelectOptions = institutes.map((option) => ({
    value: option.id,
    label: option.institution_name,
  }));
  const languageOptions = alllanguage.map((option) => ({
    value: option.id,
    label: option.language_name,
  }));
  const proficiencyOptions = proficiency.map((option) => ({
    value: option.value,
    label: option.lable,
  }));
  const genderOptions = gender.map((option) => ({
    value: option.value,
    label: option.lable,
  }));
  const subjectOptions = subjects.map((option) => ({
    value: option.id,
    label: option.subject_name,
  }));
  const classOptions = classes.map((option) => ({
    value: option.id,
    label: option.class_name,
  }));
  const institutionTypeOptions = [
    {
      label: "School",
      value: "school",
    },
    {
      label: "College",
      value: "college",
    },
  ];
  const boardOptions = [
    {
      label: "CBSE",
      value: "cbse",
    },
    {
      label: "ICSE",
      value: "icse",
    },
    {
      label: "State Board",
      value: "state_board",
    },
  ];
  const learningStyleOptions = [
    {
      label: "Online",
      value: "online",
    },
    {
      label: "Offline",
      value: "offline",
    },
    {
      label: "Any",
      value: "any",
    },
  ];

  const academicStateOptions = State.getStatesOfCountry("IN").map((state) => ({
    value: state.isoCode,
    label: state.name,
  }));

  const saveanswerForHobbeis = (answers: string[]) => {
    let payload = {
      student_id: StudentId,
      hobby_id: answeredData?.hobby?.hobby_id || selectedHobby,
    };

    postData("student_hobby/add", payload).then((response) => {
      if (response.status === 200) {
        // toast.success("Your hobbies saved successfully", {
        //   hideProgressBar: true,
        //   theme: "colored",
        // });
      } else {
        toast.error(response?.message, {
          hideProgressBar: true,
          theme: "colored",
        });
      }
    });
  };

  const saveAnswerForLanguage = (answers: string[]) => {
    const payload = {
      student_id: StudentId,
      language_id:
        answeredData?.language_known?.language_id || selectedLanguage,
      proficiency:
        answeredData?.language_known?.proficiency || selectedproficiency,
    };
    postData("student_language_known/add", payload).then((response) => {
      if (response.status === 200) {
        // toast.success("Your language saved successfully", {
        //   hideProgressBar: true,
        //   theme: "colored",
        // });
      } else {
        toast.error(response?.message, {
          hideProgressBar: true,
          theme: "colored",
        });
      }
    });
  };

  const viewProfile = () => {
    toast.success("Your profile saved successfully", {
      hideProgressBar: true,
      theme: "colored",
    });
    onCancel();
    navigate("/main/StudentProfile");
  };

  const proceedToNextSection = (currentSection: string) => {
    const nextSection = sectionOrder[sectionOrder.indexOf(currentSection) + 1];
    if (nextSection) {
      setMessages([
        ...messages,
        {
          text: `Do you want to add ${nextSection} information?`,
          type: "question",
        },
      ]);
      setCurrentSection(null);
      setAnswers([]);
    } else {
      alert("Thank you for completing the profile information!");
    }
  };

  const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = e.target.value;
    setAnswers(updatedAnswers);
    if (currentQuestionIndex === 0) {
      const fullNameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
      if (!fullNameRegex.test(updatedAnswers[0])) {
        setFullName(true);
        return;
      } else {
        setFullName(false);
      }
    }
    if (currentQuestionIndex === 1) {
      const gender = updatedAnswers[1].toLowerCase();
      if (gender !== "male" && gender !== "female") {
        // You can set an error state here if needed
        setGenderError(true);
        return;
      } else {
        setGenderError(false);
      }
    }
    if (currentQuestionIndex === 3) {
      const nameRegex = /^[a-zA-Z\s]+$/;
      if (!nameRegex.test(updatedAnswers[3])) {
        setMotherNameError(true);
        return;
      } else {
        setMotherNameError(false);
      }
    }
    if (currentQuestionIndex === 4) {
      const nameRegex = /^[a-zA-Z\s]+$/;
      if (!nameRegex.test(updatedAnswers[4])) {
        setFName(true);
        return;
      } else {
        setFName(false);
      }
    }
    if (currentQuestionIndex === 5) {
      const nameRegex = /^[a-zA-Z\s]+$/;
      if (!nameRegex.test(updatedAnswers[5])) {
        setgName(true);
        return;
      } else {
        setgName(false);
      }
    }
    if (currentQuestionIndex === 9) {
      // Regular expression for exactly 10 digits
      const phoneRegex = /^\d{10}$/;

      if (!phoneRegex.test(updatedAnswers[9])) {
        setphnumber(true);
        return;
      } else {
        setphnumber(false);
      }
    }
    if (currentQuestionIndex === 10) {
      // Regular expression for exactly 10 digits
      const phoneRegex = /^\d{10}$/;

      if (!phoneRegex.test(updatedAnswers[10])) {
        setphnumber(true);
        return;
      } else {
        setphnumber(false);
      }
    }
    if (currentQuestionIndex === 21) {
      // Regular expression for exactly 10 digits
      const disticRegex = /^[a-zA-Z\s]+$/;

      if (!disticRegex.test(updatedAnswers[21])) {
        setdisct(true);
        return;
      } else {
        setdisct(false);
      }
    }
    if (currentQuestionIndex === 22) {
      // Regular expression for exactly 10 digits
      const disticRegex = /^[a-zA-Z\s]+$/;

      if (!disticRegex.test(updatedAnswers[22])) {
        setdisct(true);
        return;
      } else {
        setdisct(false);
      }
    }
    if (currentQuestionIndex === 23) {
      const pincodeRegex = /^\d{6}$/;

      if (!pincodeRegex.test(updatedAnswers[23])) {
        // setpincode(true);
        setpincode(true);
      } else {
        // setpincode(false);
        setpincode(false); // Clear the error if valid
      }
    }
    if (currentQuestionIndex === 28) {
      const nameRegex = /^[a-zA-Z\s]+$/;
      if (!nameRegex.test(updatedAnswers[28])) {
        setpreferenceError(true);
        return;
      } else {
        setpreferenceError(false);
      }
    }
    if (currentQuestionIndex === 29) {
      // Regular expression for exactly 6 digits (adjust the length as per your requirement)
      const regex = /^(100(\.0{1,2})?|[0-9]?[0-9](\.[0-9]{1,2})?)$/;

      if (!regex.test(updatedAnswers[29])) {
        setper(true);
        return;
      } else {
        setper(false);
      }
    }

    // if (currentQuestionIndex === 28) {
    //   // Regular expression for exactly 6 digits (adjust the length as per your requirement)
    //   const regex = /^(100(\.0{1,2})?|[0-9]?[0-9](\.[0-9]{1,2})?)$/;

    //   if (!regex.test(updatedAnswers[28])) {
    //     setper(true);
    //     return;
    //   } else {
    //     setper(false);
    //   }
    // }
  };
  const handleSkip = () => {
    setError1("");
    const currentQuestions = initialQuestions[currentSection!];
    const updatedMessages = [
      ...messages,
      { text: "", type: "answer" as "answer" },
    ];
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setMessages([
        ...updatedMessages,
        {
          text: currentQuestions[currentQuestionIndex + 1],
          type: "question" as "question",
        },
      ]);
    } else {
      setMessages(updatedMessages);
      proceedToNextSection(currentSection!);
      setCurrentQuestionIndex(0);
    }
  };
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file: any = e.target.files[0];

      // Check file size (3MB = 3 * 1024 * 1024 bytes)
      if (file.size > 3 * 1024 * 1024) {
        setError1("File size must be less than 3MB");
        return;
      }
      if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
        setError1("Only JPG and PNG files are allowed");
        return;
      }
      setError1("");
      setUploadedFile(e.target.files[0]);
      const updatedAnswers = [...answers];
      updatedAnswers[currentQuestionIndex] = e.target.files[0].name; // Store the file name as answer

      setAnswers(updatedAnswers);
      const currentQuestions = initialQuestions[currentSection!];
      const updatedMessages = [
        ...messages,
        { text: e.target.files[0].name, type: "answer" as "answer" },
      ];

      if (currentQuestionIndex < currentQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setMessages([
          ...updatedMessages,
          {
            text: currentQuestions[currentQuestionIndex + 1],
            type: "question" as "question",
          },
        ]);
      } else {
        setMessages(updatedMessages);
        proceedToNextSection(currentSection!);
        setCurrentQuestionIndex(0);
      }
    }
  };
  let datecheck: any;
  let hitcount = 1;

  const handleclickdate = () => {
    // if (currentQuestionIndex === 13) {
    //   datecheck = dayjs(datecheck).format("DD/MM/YYYY");
    // }
    if (datecheck) {
      const updatedAnswers = [...answers];
      updatedAnswers[currentQuestionIndex] = datecheck;
      setAnswers(updatedAnswers);
      saveAnswersforacadmichistory(updatedAnswers);
      const currentQuestions = initialQuestions[currentSection!];
      const updatedMessages = [
        ...messages,
        { text: datecheck, type: "answer" as "answer" },
      ];

      if (currentQuestionIndex < currentQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setMessages([
          ...updatedMessages,
          {
            text: currentQuestions[currentQuestionIndex + 1],
            type: "question" as "question",
          },
        ]);
      } else {
        setMessages(updatedMessages);
        proceedToNextSection(currentSection!);
        setCurrentQuestionIndex(0);
      }
    }
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    // setBasicInfo((values) => ({ ...values, dob: newDate }));
    // setOpen(false);
    // setErordate("")
    datecheck = dayjs(newDate).format(
      currentQuestionIndex === 18 ? "YYYY" : "DD/MM/YYYY"
    );

    if (hitcount % 2 === 0) {
      if (currentQuestionIndex === 14) {
        if (datecheck > answers[13]) {
          const updatedAnswers = [...answers];
          updatedAnswers[currentQuestionIndex] = datecheck;
          setAnswers(updatedAnswers);
          const currentQuestions = initialQuestions[currentSection!];
          const updatedMessages = [
            ...messages,
            { text: datecheck, type: "answer" as "answer" },
          ];

          if (currentQuestionIndex < currentQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setMessages([
              ...updatedMessages,
              {
                text: currentQuestions[currentQuestionIndex + 1],
                type: "question" as "question",
              },
            ]);
          } else {
            setMessages(updatedMessages);
            proceedToNextSection(currentSection!);
            setCurrentQuestionIndex(0);
          }
        } else {
          // setErordate("The course completion date cannot be earlier than the date of joining.")
          // toast.error(
          //   "Date of joining should be less than to the starting date of academic course",
          //   {
          //     hideProgressBar: true,
          //     theme: "colored",
          //   }
          // );
        }
      } else {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex] = datecheck;
        setAnswers(updatedAnswers);
        const currentQuestions = initialQuestions[currentSection!];
        const updatedMessages = [
          ...messages,
          { text: datecheck, type: "answer" as "answer" },
        ];

        if (currentQuestionIndex < currentQuestions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setMessages([
            ...updatedMessages,
            {
              text: currentQuestions[currentQuestionIndex + 1],
              type: "question" as "question",
            },
          ]);
        } else {
          setMessages(updatedMessages);
          proceedToNextSection(currentSection!);
          setCurrentQuestionIndex(0);
        }
      }
    } else {
      hitcount++;
    }
  };

  const answerSaveandGotoNextquestoin = (
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    const currentQuestions = initialQuestions[currentSection!];
    if (answers[currentQuestionIndex]?.trim() !== "") {
      const updatedMessages = [
        ...messages,
        { text: answers[currentQuestionIndex], type: "answer" as "answer" },
      ];

      if (currentQuestionIndex < currentQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setMessages([
          ...updatedMessages,
          {
            text: currentQuestions[currentQuestionIndex + 1],
            type: "question" as "question",
          },
        ]);

        if (answers.length === 10) {
          saveAnswersforBasic([...answers, e.currentTarget.value]);
        } else if (answers.length === 11) {
          saveAnswersforContact([...answers, e.currentTarget.value]);
        } else if (answers.length === 19) {
          saveAnswersforacadmichistory([...answers, e.currentTarget.value]);
        } else if (answers.length === 26) {
          saveAnswerforAddress([...answers, e.currentTarget.value]);
        } else if (answers.length === 30) {
          saveAnswerforsubjectpreference([...answers, e.currentTarget.value]);
        } else if (selectedproficiency !== "") {
          saveanswerForHobbeis([...answers, e.currentTarget.value]);
          saveAnswerForLanguage([...answers, e.currentTarget.value]);
        }
      } else {
        setMessages(updatedMessages);
        proceedToNextSection(currentSection!);
        setCurrentQuestionIndex(0);
      }
    }
  };
  useEffect(() => {
    if (selectedproficiency !== "") {
      saveanswerForHobbeis([...answers]);
      saveAnswerForLanguage([...answers]);
    }
  }, [selectedproficiency]);

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (
        fullName ||
        genderError ||
        motherNameError ||
        fName ||
        gName ||
        phnumber ||
        distic ||
        pincode ||
        per ||
        preferenceError ||
        errordate
      ) {
        return; // Stop further execution if full name validation fails
      }
      e.preventDefault();

      if (currentQuestionIndex === 10 || currentQuestionIndex === 9) {
        if (answers[currentQuestionIndex].length === 10) {
          answerSaveandGotoNextquestoin(e);
        } else {
          toast.error("Please enter valid 10 digit mobile number", {
            hideProgressBar: true,
            theme: "colored",
          });
        }
      } else if (currentQuestionIndex === 23) {
        if (answers[currentQuestionIndex].length === 6) {
          answerSaveandGotoNextquestoin(e);
          setError1("");
        } else {
          setError1("Please enter valid 6 digit pincode");
          // toast.error("Please enter valid 6 digit pincode", {
          //   hideProgressBar: true,
          //   theme: "colores",
          // });
        }
      } else {
        answerSaveandGotoNextquestoin(e);
      }
    }
  };

  const handlePhoneChange = (value: string, country: any) => {
    setPhone(value);
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = "+" + value;
    setAnswers(updatedAnswers);
    const currentQuestions = initialQuestions[currentSection!];
    const updatedMessages = [
      ...messages,
      { text: "+" + value, type: "answer" as "answer" },
    ];

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setMessages([
        ...updatedMessages,
        {
          text: currentQuestions[currentQuestionIndex + 1],
          type: "question" as "question",
        },
      ]);
    } else {
      setMessages(updatedMessages);
      proceedToNextSection(currentSection!);
      setCurrentQuestionIndex(0);
    }
  };

  const handleDropdownChangehobby = (e: any) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = e.label;
    setSelectedHobby(e.value);
    setAnswers(updatedAnswers);
    const currentQuestions = initialQuestions[currentSection!];
    const updatedMessages = [
      ...messages,
      { text: e.label, type: "answer" as "answer" },
    ];

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setMessages([
        ...updatedMessages,
        {
          text: currentQuestions[currentQuestionIndex + 1],
          type: "question" as "question",
        },
      ]);
    } else {
      setMessages(updatedMessages);
      proceedToNextSection(currentSection!);
      setCurrentQuestionIndex(0);
    }
  };

  const handleDropdownChangelanguage = (e: any) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = e.label;
    setSelectedLanguage(e.value);
    setAnswers(updatedAnswers);
    const currentQuestions = initialQuestions[currentSection!];
    const updatedMessages = [
      ...messages,
      { text: e.label, type: "answer" as "answer" },
    ];

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setMessages([
        ...updatedMessages,
        {
          text: currentQuestions[currentQuestionIndex + 1],
          type: "question" as "question",
        },
      ]);
    } else {
      setMessages(updatedMessages);
      proceedToNextSection(currentSection!);
      setCurrentQuestionIndex(0);
    }
  };

  const handleDropdownChangeproficiency = (e: any) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = e.label;
    setSelectedproficiency(e.value);
    setAnswers(updatedAnswers);
    const currentQuestions = initialQuestions[currentSection!];
    const updatedMessages = [
      ...messages,
      { text: e.label, type: "answer" as "answer" },
    ];

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setMessages([
        ...updatedMessages,
        {
          text: currentQuestions[currentQuestionIndex + 1],
          type: "question" as "question",
        },
      ]);
      // answerSaveandGotoNextquestoin(e)
    } else {
      setMessages(updatedMessages);
      proceedToNextSection(currentSection!);
      setCurrentQuestionIndex(0);
    }
  };
  const handleDropdownChangegender = (e: any) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = e.label;
    setSelectedgender(e.value);
    setAnswers(updatedAnswers);
    const currentQuestions = initialQuestions[currentSection!];
    const updatedMessages = [
      ...messages,
      { text: e.label, type: "answer" as "answer" },
    ];

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setMessages([
        ...updatedMessages,
        {
          text: currentQuestions[currentQuestionIndex + 1],
          type: "question" as "question",
        },
      ]);
      // answerSaveandGotoNextquestoin(e)
    } else {
      setMessages(updatedMessages);
      proceedToNextSection(currentSection!);
      setCurrentQuestionIndex(0);
    }
  };

  const handleDropdownChangeInstituteType = (e: any) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = e.label;
    setSelectedInstituteType(e.value);
    setAnswers(updatedAnswers);
    const currentQuestions = initialQuestions[currentSection!];
    const updatedMessages = [
      ...messages,
      { text: e.label, type: "answer" as "answer" },
    ];

    if (currentQuestionIndex < currentQuestions.length - 1) {
      if (e.value === "school")
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      else setCurrentQuestionIndex(15);
      setMessages([
        ...updatedMessages,
        {
          text: currentQuestions[
            e.value === "school" ? currentQuestionIndex + 1 : 15
          ],
          type: "question" as "question",
        },
      ]);
    } else {
      setMessages(updatedMessages);
      proceedToNextSection(currentSection!);
      setCurrentQuestionIndex(0);
    }
  };
  const handleDropdownChangeBoard = (e: any) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = e.label;
    setSelectedBoard(e.value);
    setAnswers(updatedAnswers);
    const currentQuestions = initialQuestions[currentSection!];
    const updatedMessages = [
      ...messages,
      { text: e.label, type: "answer" as "answer" },
    ];

    if (currentQuestionIndex < currentQuestions.length - 1) {
      if (e.value === "state_board")
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      else setCurrentQuestionIndex(14);
      setMessages([
        ...updatedMessages,
        {
          text: currentQuestions[
            e.value === "state_board" ? currentQuestionIndex + 1 : 14
          ],
          type: "question" as "question",
        },
      ]);
    } else {
      setMessages(updatedMessages);
      proceedToNextSection(currentSection!);
      setCurrentQuestionIndex(0);
    }
  };
  const handleDropdownChangeAcademicState = (e: any) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = e.label;
    setSelectedAcademicState(e.value);
    setAnswers(updatedAnswers);
    const currentQuestions = initialQuestions[currentSection!];
    const updatedMessages = [
      ...messages,
      { text: e.label, type: "answer" as "answer" },
    ];

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setMessages([
        ...updatedMessages,
        {
          text: currentQuestions[currentQuestionIndex + 1],
          type: "question" as "question",
        },
      ]);
    } else {
      setMessages(updatedMessages);
      proceedToNextSection(currentSection!);
      setCurrentQuestionIndex(0);
    }
  };
  const handleDropdownChangeClass = (e: any) => {

    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = e.value;
    setSelectedClass(e.value);
    setAnswers(updatedAnswers);
    saveAnswersforacadmichistory(updatedAnswers);
    const currentQuestions = initialQuestions[currentSection!];
    const updatedMessages = [
      ...messages,
      { text: e.label, type: "answer" as "answer" },
    ];

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(19);
      setMessages([
        ...updatedMessages,
        {
          text: currentQuestions[19],
          type: "question" as "question",
        },
      ]);
    } else {
      setMessages(updatedMessages);
      proceedToNextSection(currentSection!);
      setCurrentQuestionIndex(0);
    }
  };
  const handleDropdownChangeLearningStyle = (e: any) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = e.label;
    setSelectedLearningStyle(e.value);
    setAnswers(updatedAnswers);
    const currentQuestions = initialQuestions[currentSection!];
    const updatedMessages = [
      ...messages,
      { text: e.label, type: "answer" as "answer" },
    ];

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setMessages([
        ...updatedMessages,
        {
          text: currentQuestions[currentQuestionIndex + 1],
          type: "question" as "question",
        },
      ]);
    } else {
      setMessages(updatedMessages);
      proceedToNextSection(currentSection!);
      setCurrentQuestionIndex(0);
    }
  };

  const handleDropdownChangecourse = (e: any) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = e.label;
    setSelectedCourse(e.value);
    setAnswers(updatedAnswers);
    const currentQuestions = initialQuestions[currentSection!];
    const updatedMessages = [
      ...messages,
      { text: e.label, type: "answer" as "answer" },
    ];

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setMessages([
        ...updatedMessages,
        {
          text: currentQuestions[currentQuestionIndex + 1],
          type: "question" as "question",
        },
      ]);
    } else {
      setMessages(updatedMessages);
      proceedToNextSection(currentSection!);
      setCurrentQuestionIndex(0);
    }
  };

  const handleDropdownChangesubject = (e: any) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = e.label;
    setSelectedSubject(e.value);
    setAnswers(updatedAnswers);
    const currentQuestions = initialQuestions[currentSection!];
    const updatedMessages = [
      ...messages,
      { text: e.label, type: "answer" as "answer" },
    ];

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setMessages([
        ...updatedMessages,
        {
          text: currentQuestions[currentQuestionIndex + 1],
          type: "question" as "question",
        },
      ]);
    } else {
      setMessages(updatedMessages);
      proceedToNextSection(currentSection!);
      setCurrentQuestionIndex(0);
    }
  };

  const handleDropdownChangeInstitute = (e: any) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = e.label;
    setSelectedInstitute(e.value);
    setAnswers(updatedAnswers);
    const currentQuestions = initialQuestions[currentSection!];
    const updatedMessages = [
      ...messages,
      { text: e.label, type: "answer" as "answer" },
    ];

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setMessages([
        ...updatedMessages,
        {
          text: currentQuestions[currentQuestionIndex + 1],
          type: "question" as "question",
        },
      ]);
    } else {
      setMessages(updatedMessages);
      proceedToNextSection(currentSection!);
      setCurrentQuestionIndex(0);
    }
  };

  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const handleCountryChange = (selectedOption: any) => {
    setSelectedCountry(selectedOption);
    if (selectedOption) {
      const states = State.getStatesOfCountry(selectedOption.value);
      const stateOptions = states.map((state) => ({
        value: state.isoCode,
        label: state.name,
      }));
      setStateOptions(stateOptions);
    } else {
      setStateOptions([]);
    }
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = selectedOption.label;
    setAnswers(updatedAnswers);
    const currentQuestions = initialQuestions[currentSection!];
    const updatedMessages = [
      ...messages,
      { text: selectedOption.label, type: "answer" as "answer" },
    ];

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setMessages([
        ...updatedMessages,
        {
          text: currentQuestions[currentQuestionIndex + 1],
          type: "question" as "question",
        },
      ]);
    } else {
      setMessages(updatedMessages);
      proceedToNextSection(currentSection!);
      setCurrentQuestionIndex(0);
    }
  };

  const handleStateChange = async (selectedOption: any) => {
    setSelectedState(selectedOption);
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = selectedOption.label;
    setAnswers(updatedAnswers);
    const currentQuestions = initialQuestions[currentSection!];
    const updatedMessages = [
      ...messages,
      { text: selectedOption.label, type: "answer" as "answer" },
    ];

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setMessages([
        ...updatedMessages,
        {
          text: currentQuestions[currentQuestionIndex + 1],
          type: "question" as "question",
        },
      ]);
    } else {
      setMessages(updatedMessages);
      proceedToNextSection(currentSection!);
      setCurrentQuestionIndex(0);
    }
  };
  const handleChange = (themes: any) => {
    setchecked(!checked);

    document?.documentElement?.setAttribute("data-bs-theme", themes);
    setNamecolor(themes);
    localStorage.setItem("theme", themes);
  };
  const handlecancel = () => {
    setclosemodel(false);
  };
  const handleok = () => {
    onCancel();
    setclosemodel(false);
    // navigate("/main/Dashboard");
  };
  const handleOpen = () => {
    // setOpen(true);
  };

  // code for loacal store set quest and answer

  // useEffect(() => {
  //   const savedMessages = localStorage.getItem('messages');
  //   const savedIndex = localStorage.getItem('currentQuestionIndex');
  //   const answers = localStorage.getItem('answers');

  //   if (savedMessages) {
  //     setMessages(JSON.parse(savedMessages));
  //   }
  //   if (savedIndex !== null) {
  //     setCurrentQuestionIndex(JSON.parse(savedIndex));
  //   }
  //   if (answers) {
  //     setAnswers(JSON.parse(answers));
  //   }
  //   if (selectedInstitute) {
  //     setSelectedInstitute(JSON.parse(selectedInstitute));
  //   }
  //   if (selectCourse) {
  //     setSelectedCourse(JSON.parse(selectCourse));
  //   }
  //   if (selectSubject) {
  //     setSelectedSubject(JSON.parse(selectSubject));
  //   }
  //   if (selectedHobby) {
  //     setSelectedHobby(JSON.parse(selectedHobby));
  //   }if (selectedLanguage) {
  //     setSelectedLanguage(JSON.parse(selectedLanguage));
  //   }if (selectedproficiency) {
  //     setSelectedproficiency(JSON.parse(selectedproficiency));
  //   }
  // }, []);
  // useEffect(()=>{
  //   if(messages){
  //     localStorage.setItem('messages', JSON.stringify(messages));
  //     localStorage.setItem('currentQuestionIndex', JSON.stringify(currentQuestionIndex));
  //     localStorage.setItem('answers', JSON.stringify(answers));
  //     localStorage.setItem('selectedInstitute', JSON.stringify(selectedInstitute));
  //     localStorage.setItem('selectCourse', JSON.stringify(selectCourse));
  //     localStorage.setItem('selectSubject', JSON.stringify(selectSubject));
  //     localStorage.setItem('setSelectedHobby', JSON.stringify(selectedHobby));
  //     localStorage.setItem('selectedLanguage', JSON.stringify(selectedLanguage));
  //     localStorage.setItem('selectedproficiency', JSON.stringify(selectedproficiency));
  //   }

  // },[messages,currentQuestionIndex,answers,selectedInstitute,selectCourse,selectSubject,selectedHobby,selectedLanguage,selectedproficiency])
  return (
    <>
      <Dialog
        open={isOpen}
        // className="dialog"
        // open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            position: "fixed",
            bottom: 50,
            // left: 0,
            right: 50,
            margin: 0,
            width: "400px",
            backgroundColor: chatdialog(namecolor),
          },
        }}
      >
        {/* <Button
   onClick={() => handleClose({}, 'backdropClick')}  // Adjusted to pass the expected arguments
   style={{ position: 'absolute', top: 10, right: 10 }}
   aria-label="close"
 > */}
        <Button
          onClick={() => setclosemodel(true)}
          style={{ position: "absolute", top: 10, left: 0 }}
          aria-label="close"
        >
          <CloseIcon />
        </Button>

        <div
          style={{
            position: "fixed",
            right: 50,
            margin: "2px",
            padding: "5px",
          }}
        >
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={() => handleChange(checked ? "light" : "dark")}
              />
            }
            label=""
          />
        </div>
        <div style={{ marginTop: "25px" }}>
          <DialogTitle id="alert-dialog-title">
            <p style={{ color: inputfieldtext(namecolor) }}>
              Add your information for better services
            </p>
          </DialogTitle>
          <DialogContent>
            <div
              className="chat-box"
              ref={chatBoxRef}
              style={{
                height: "400px",
                overflowY: "scroll",
                paddingBottom: "80px",
                scrollbarWidth: "none", // For Firefox
                msOverflowStyle: "none", // For Internet Explorer and Edge
              }}
            >
              {messages.map((message, index) => {
                if (message.text) {
                  return (
                    <div
                      key={index}
                      className={`message-wrapper d-flex mb-3 ${
                        message.type === "question"
                          ? "justify-content-start"
                          : "justify-content-end"
                      }`}
                    >
                      <div
                        className={`message-bubble p-3 ${
                          message.type === "question" ? "left" : "right"
                        }`}
                        style={{
                          maxWidth: "80%",
                          backgroundColor:
                            message.type === "question"
                              ? chattextbgleft(namecolor)
                              : chattextbgright(namecolor),
                          color:
                            message.type === "question"
                              ? chattextleft(namecolor)
                              : chattextright(namecolor),
                          borderRadius: "15px",
                          padding: "10px",
                          wordBreak: "break-word",
                        }}
                      >
                        {message.text}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </DialogContent>
          {currentSection && (
            <>
              <div className="chatinput-body px-4">
                {(fullName ||
                  genderError ||
                  motherNameError ||
                  fName ||
                  gName ||
                  phnumber ||
                  distic ||
                  pincode ||
                  per ||
                  preferenceError ||
                  errordate) && (
                  <p
                    style={{
                      color: "red",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                  >
                    {errordata[currentQuestionIndex]}
                  </p>
                )}
                {error1 && (
                  <p
                    style={{
                      color: "red",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                  >
                    {error1}
                  </p>
                )}
                {currentQuestionIndex === 15 || currentQuestionIndex === 26 ? (
                  <Select
                    className="dropdown-wrapper"
                    onChange={handleDropdownChangecourse}
                    options={courseSelectOptions}
                    placeholder="Select an option"
                    menuPlacement="top"
                    value={selectCourse}
                  />
                ) : currentQuestionIndex === 11 ? (
                  <Select
                    className="dropdown-wrapper"
                    onChange={handleDropdownChangeInstituteType}
                    options={institutionTypeOptions}
                    placeholder="Select an option"
                    menuPlacement="top"
                    value={selectedInstituteType}
                  />
                ) : currentQuestionIndex === 8 ? (
                  <PhoneInput
                    country={""}
                    value={phone}
                    onChange={handlePhoneChange}
                    inputProps={{
                      name: "phone",
                      required: true,
                      autoFocus: true,
                      readOnly: true,
                    }}
                    placeholder=""
                    enableSearch={true}
                    disableDropdown={false}
                    preferredCountries={["us", "in"]}
                  />
                ) : currentQuestionIndex === 7 ? (
                  <>
                    <div
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleFileUpload}
                        style={{ paddingLeft: "2px" }} // Adjust padding to make space for the button
                      />
                      <p
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "10px", // Adjust this value to move the button horizontally
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                          color: chattextbgright(namecolor),
                          margin: 0,
                        }}
                        onClick={handleSkip}
                      >
                        Skip
                      </p>
                    </div>
                  </>
                ) : currentQuestionIndex === 12 ? (
                  <Select
                    className="dropdown-wrapper"
                    onChange={handleDropdownChangeBoard}
                    options={boardOptions}
                    placeholder="Select an option"
                    menuPlacement="top"
                    value={selectedBoard}
                  />
                ) : currentQuestionIndex === 16 ? (
                  <Select
                    className="dropdown-wrapper"
                    onChange={handleDropdownChangeInstitute}
                    options={instituteSelectOptions}
                    placeholder="Select an option"
                    menuPlacement="top"
                    value={selectedInstitute}
                  />
                ) : currentQuestionIndex === 13 ? (
                  <Select
                    className="dropdown-wrapper"
                    onChange={handleDropdownChangeAcademicState}
                    options={academicStateOptions}
                    placeholder="Select an option"
                    menuPlacement="top"
                    value={selectedAcademicState}
                  />
                ) : currentQuestionIndex === 14 ? (
                  <Select
                    className="dropdown-wrapper"
                    onChange={handleDropdownChangeClass}
                    options={classOptions}
                    placeholder="Select an option"
                    menuPlacement="top"
                    value={selectedClass}
                  />
                ) : currentQuestionIndex === 17 ? (
                  <Select
                    className="dropdown-wrapper"
                    onChange={handleDropdownChangeLearningStyle}
                    options={learningStyleOptions}
                    placeholder="Select an option"
                    menuPlacement="top"
                    value={selectedLearningStyle}
                  />
                ) : currentQuestionIndex === 27 ? (
                  <Select
                    className="dropdown-wrapper"
                    onChange={handleDropdownChangesubject}
                    options={subjectOptions}
                    placeholder="Select an option"
                    menuPlacement="top"
                    value={selectSubject}
                  />
                ) : currentQuestionIndex === 2 ||
                  currentQuestionIndex === 18 ? (
                  <>
                    <div style={{ display: "flex" }}>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          position: "relative",
                        }}
                      >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            //  open={open}
                            // open={true}
                            views={
                              currentQuestionIndex === 18
                                ? ["year"]
                                : ["day", "month", "year"]
                            }
                            label={
                              currentQuestionIndex === 18
                                ? "Year"
                                : "Date of Birth"
                            }
                            onChange={handleDateChange}
                            // onAccept={() => setOpen(false)} // Close on date selection
                            // onClose={() => setOpen(false)}  // Close on outside click
                            disableFuture
                            format={
                              currentQuestionIndex === 18
                                ? "YYYY"
                                : "DD/MM/YYYY"
                            }
                            // value={datecheck}
                            slotProps={{
                              field: {
                                readOnly: true,
                              },
                              textField: {
                                sx: {
                                  "& .MuiInputLabel-root": {
                                    // paddingLeft: '0px',
                                    color: chatdatetext(namecolor), // Change the label text color
                                    backgroundColor: "transperent",
                                  },
                                  "& .MuiInputBase-root": {
                                    // flexDirection: 'row-reverse',
                                    color: chatdatetext(namecolor), // Change the label text color
                                    backgroundColor: "transperent",
                                    paddingLeft: "100px",
                                    paddingRight: "50px",
                                  },
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    // borderColor: 'transperent',
                                  },
                                  "& .MuiInputAdornment-root": {
                                    // color: chatdatetext(namecolor), // Change the color of the calendar icon
                                  },
                                },
                              },
                              inputAdornment: {
                                sx: {
                                  "& .MuiSvgIcon-root": {
                                    color: chatcalandericon(namecolor), // Ensure the icon color is changed
                                  },
                                },
                                // onClick: handleOpen
                              },
                            }}
                          />
                          <button
                            className="chat_search_btn"
                            style={{
                              position: "absolute",
                              right: "10px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              border: "none",
                              background: "none",
                              cursor: "pointer",
                            }}
                            type="button"
                            onClick={handleclickdate}
                          >
                            {" "}
                            <SendIcon className="mainsearch" />
                          </button>
                        </LocalizationProvider>
                      </div>
                    </div>
                  </>
                ) : currentQuestionIndex === 30 ? (
                  <Select
                    className="dropdown-wrapper"
                    onChange={handleDropdownChangehobby}
                    options={hobbyOptions}
                    placeholder="Select an option"
                    menuPlacement="top"
                    value={selectedHobby}
                  />
                ) : currentQuestionIndex === 19 ? (
                  <Select
                    className="dropdown-wrapper"
                    options={countryOptions}
                    onChange={handleCountryChange}
                    placeholder="Select a country"
                    menuPlacement="top"
                    value={selectedCountry}
                  />
                ) : currentQuestionIndex === 20 && stateOptions?.length > 0 ? (
                  <Select
                    className="dropdown-wrapper"
                    options={stateOptions}
                    placeholder="Select a state"
                    onChange={handleStateChange}
                    isDisabled={!selectedCountry}
                    menuPlacement="top"
                    value={selectedstate}
                  />
                ) : currentQuestionIndex === 31 ? (
                  <Select
                    className="dropdown-wrapper"
                    onChange={handleDropdownChangelanguage}
                    options={languageOptions}
                    placeholder="Select an option"
                    menuPlacement="top"
                    value={selectedLanguage}
                  />
                ) : currentQuestionIndex === 32 ? (
                  <Select
                    className="dropdown-wrapper"
                    onChange={handleDropdownChangeproficiency}
                    options={proficiencyOptions}
                    placeholder="Select an option"
                    menuPlacement="top"
                    value={selectedproficiency}
                  />
                ) : currentQuestionIndex === 1 ? (
                  <Select
                    className="dropdown-wrapper"
                    onChange={handleDropdownChangegender}
                    options={genderOptions}
                    placeholder="Select an option"
                    menuPlacement="top"
                    value={selectedgender}
                  />
                ) : currentQuestionIndex + 1 ===
                  initialQuestions.basic.length ? (
                  <Button
                    onClick={viewProfile}
                    style={{ display: "block", margin: "0 auto" }}
                  >
                    View Profile
                  </Button>
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type your answer and press enter"
                    value={answers[currentQuestionIndex] || ""}
                    onChange={handleAnswerChange}
                    onKeyPress={handleKeyPress}
                  />
                )}
              </div>
            </>
          )}
          {/* <Button onClick={onCancel} autoFocus>
      Cancel
    </Button> */}

          {/* </DialogActions> */}
        </div>
      </Dialog>
      <ChatDialogClose
        isOpen={closemodel}
        onCancel={handlecancel}
        onDeleteClick={() => handleok()}
        title="Close chat?"
      />
    </>
  );
};
