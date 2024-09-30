import React, { useContext, useEffect, useState } from "react";
import "./MainContent.css";
import { Bar, Line } from "react-chartjs-2";
import Chart from "react-apexcharts";
import "chart.js/auto";
import { PieChart } from "@mui/x-charts/PieChart";

// import { Dataset } from '@mui/icons-material';
// import Box from '@mui/material/Box';
import useApi from "../../hooks/useAPI";
// import Button from '@mui/material/Button';

import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  QUERY_KEYS,
  QUERY_KEYS_ADMIN_BASIC_INFO,
  QUERY_KEYS_STUDENT,
} from "../../utils/const";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import CircularProgress from "@mui/material/CircularProgress";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import PerfectScrollbar from "react-perfect-scrollbar";
import { toast } from "react-toastify";
import logo from "../../assets/img/g-logo-white.svg";
import personImage from "../../assets/img/profile.png";
import robotImage from "../../assets/img/robot.png";
import { hasSubMenu } from "../../utils/helpers";
import FullScreenLoader from "../../Pages/Loader/FullScreenLoader";
import { tuple } from "yup";
import NameContext from "../../Pages/Context/NameContext";
import Teacher from "../../Pages/Uploadpdf/Uploadpdf";
import { ProfileDialog } from "../Dailog/ProfileComplation";
import "../../../node_modules/react-perfect-scrollbar/dist/css/styles.css";
import ThemeSidebar from "../ThemeSidebar/ThemeSidebar";
// import "../react-perfect-scrollbar/dist/css/styles.css";

function MainContent() {
  const context = useContext(NameContext);
  const navigate = useNavigate();
  const { setProPercentage }: any = context;
  const [userName, setUserName] = useState("");
  let StudentId = localStorage.getItem("_id");
  let menuList = localStorage.getItem("menulist1");
  let menudata: any = [];
  if (menuList !== null) {
    menudata = JSON.parse(menuList);
  }
  const profileURL = QUERY_KEYS_STUDENT.STUDENT_GET_PROFILE;
  const profileURLadmin = QUERY_KEYS_ADMIN_BASIC_INFO.ADMIN_GET_PROFILE;
  const [profileDatas, setProfileDatas] = useState<any>({});
  const [basicinfoPercentage, setbasicinfoPercentage] = useState<number>(0);
  const [addressPercentage, setaddressPercentage] = useState<number>(0);
  const [languagePercentage, setlanguagePercentage] = useState<number>(0);
  const [academichistoryPercentage, setacademichistoryPercentage] =
    useState<number>(0);
  const [contactPercentage, setcontactPercentage] = useState<number>(0);
  const [hobbyPercentage, sethobbyPercentage] = useState<number>(0);
  const [subjectPercentage, setsubjectPercentage] = useState<number>(0);
  const [overallProfilePercentage, setoverallProfilePercentage] =
    useState<number>(0);
  const [desctiptionPercentage, setdesctiptionPercentage] = useState<number>(0);
  const [profileImage, setprofileImage] = useState<any>();
  const [dataCompleted, setDataCompleted] = useState(false);
  const [themeMode, setThemeMode] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [studentCourse, setStudentCourse] = useState("");

  const usertype: any = localStorage.getItem("user_type");
  // const userdata = JSON.parse(localStorage?.getItem("userdata") || "/{/}/");
  const userdata = JSON.parse(localStorage?.getItem("userdata") || "{}");

  const chatlisturl = QUERY_KEYS.CHAT_LIST;
  const barChartOptions = {
    chart: {
      id: "chart5",
      height: 295,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 5,
        horizontal: false,
        columnWidth: "50%",
      },
    },
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["#00E396"], // Green border for the bars
    },
    colors: ["#00E396"],
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#009FFD"],
        inverseColors: true,
        // opacityFrom: 0.85,
        // opacityTo: 0.85,
        stops: [50, 80],
      },
    },
  };

  const barChartSeries = [
    {
      name: "Data",
      data: [10, 40, 35, 55, 30, 25, 30], // The values based on the chart
    },
  ];

  const radialChartOptions = {
    chart: {
      id: "chart1",
    },
    plotOptions: {
      radialBar: {
        startAngle: -115, // Starts from the left
        endAngle: 115, // Ends on the right (half-circle gauge)
        hollow: {
          size: "70%", // Creates the hollow center
        },
        dataLabels: {
          name: {
            show: false, // Hides the name label
          },
          value: {
            fontSize: "22px",
            show: true,
            formatter: function (val: any) {
              return val + "%"; // Display the percentage value in the center
            },
          },
        },
        track: {
          background: "#e7e7e7", // Gray background for the unused portion
          strokeWidth: "97%",
          margin: 5, // Margin between the track and the bar
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#FF0080"], // Gradient from yellow to red
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round" as "round",
    },
    labels: ["Progress"], // Label (hidden as per the dataLabels.name.show: false)
  };

  var lineChartOptions = {
    chart: {
      id: "chart2",
      sparkline: {
        enabled: !0,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
      curve: "smooth" as "smooth",
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#02c27a"],
        shadeIntensity: 1,
        type: "vertical",
        opacityFrom: 0.8,
        opacityTo: 0.1,
        stops: [0, 100, 100, 100],
      },
    },

    colors: ["#02c27a"],
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  };

  var secondLineChartOptions = {
    chart: {
      id: "chart8",
      zoom: {
        enabled: false, // Disables zoom functionality
      },
      sparkline: {
        enabled: !0,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        gradientToColors: ["#7DFF50"],
        shadeIntensity: 1,
        type: "vertical",
        opacityFrom: 0.8,
        opacityTo: 0.1,
        stops: [0, 100, 100, 100],
      },
    },

    colors: ["#7DFF50"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight" as "straight",
      width: 2,
      colors: ["#7DFF50"],
    },
    markers: {
      size: 5,
      colors: ["#7DFF50"],
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
      labels: {
        show: false, // Hides the x-axis values
      },
    },
    yaxis: {
      show: false, // Hides the y-axis values
    },
    grid: {
      show: false, // Hides grid lines
    },
  };

  useEffect(() => {
    if (usertype === "admin") {
      setUserName("admin");
      setDataCompleted(false);
    } else if (usertype === "student") {
      setUserName("student");
      // setUserName('teacher')
    } else if (usertype === "teacher") {
      setUserName("teacher");
    } else {
      setUserName("admin");
    }
  }, [usertype]);

  const profileData: any = sessionStorage.getItem("profileData");

  let basicinfo: any = {};
  if (profileData !== null) {
    basicinfo = JSON.parse(profileData);
  }

  const { getData, loading } = useApi();
  const [stats, setStats] = useState({
    institutionCount: 0,
    studentCount: 0,
    subjectCount: 0,
    entityCount: 0,
    departmentCount: 0,
    courseCount: 0,
  });
  const [stats1, setStats1] = useState<any>({
    Student_Profile: 0,
    Student_null: 0,
  });
  const [student, setStudent] = useState({
    chatHistory: 0,
    chatCount: 0,
  });

  const barData = {
    labels: [
      "Entities",
      "Institute",
      "Student",
      "Course",
      "Subject",
      "Department",
    ],
    datasets: [
      {
        label: "Dataset 1",
        backgroundColor: "#3498DB",
        borderColor: "#3498DB",
        borderWidth: 1,
        data: [
          stats.entityCount,
          stats.institutionCount,
          stats.studentCount,
          stats.courseCount,
          stats.subjectCount,
          stats.departmentCount,
        ],
      },
    ],
  };
  const lineData = {
    labels: [
      "Entities",
      "Institute",
      "Student",
      "Course",
      "Subject",
      "Department",
    ],
    datasets: [
      {
        label: "Dataset 2",
        backgroundColor: "#3498DB",
        borderColor: "#3498DB",
        data: [
          stats.entityCount,
          stats.institutionCount,
          stats.studentCount,
          stats.courseCount,
          stats.subjectCount,
          stats.departmentCount,
        ],
      },
    ],
  };

  const countKeysWithValue = (obj: any): number => {
    return Object.keys(obj).filter(
      (key) => obj[key] !== null && obj[key] !== undefined && obj[key] !== ""
    ).length;
  };

  const callAPIStudent = async () => {
    if (usertype === "student") {
      getData(`${profileURL}/${StudentId}`)
        .then((data: any) => {
          if (data.data) {
            setProfileDatas(data?.data);
            //   let basic_info = data.data.basic_info;
            let basic_info = {
              // aim: data?.data?.basic_info?.aim,
              dob: data?.data?.basic_info?.dob,
              father_name: data?.data?.basic_info?.father_name,
              first_name: data?.data?.basic_info?.first_name,
              gender: data?.data?.basic_info?.gender,
              id: data?.data?.basic_info?.id,
              // is_active: data?.data?.basic_info?.is_active,
              // is_kyc_verified: data?.data?.basic_info?.is_kyc_verified,
              // last_modified_datetime: data?.data.basic_info?.last_modified_datetime,
              last_name: data?.data?.basic_info?.last_name,
              mother_name: data?.data?.basic_info?.mother_name,
              // student_registration_no: data?.data?.basic_info?.student_registration_no
            };
            let address = {
              address1: data?.data?.address?.address1,
              country: data?.data?.address?.country,
              state: data?.data?.address?.state,
              city: data?.data?.address?.city,
              district: data?.data?.address?.district,
              pincode: data?.data?.address?.pincode,
            };
            let language = {
              language_id: data?.data?.language_known?.language_id,
              proficiency: data?.data?.language_known?.proficiency,
            };
            let academic_history = data?.data?.academic_history;
            //   let contact = data.data.contact;
            let contact = {
              // email_id: data?.data?.contact?.email_id,
              id: data?.data?.contact?.id,
              // is_active: data?.data?.contact?.is_active,
              mobile_isd_call: data?.data?.contact?.mobile_isd_call,
              mobile_no_call: data?.data?.contact?.mobile_no_call,
              // mobile_no_watsapp: data?.data?.contact?.mobile_no_watsapp,
            };
            let subject_preference = data?.data?.subject_preference;
            //   let hobby = data.data.hobby;

            let totalPercentage = 0;
            let sectionCount = 0;

            if (basic_info && Object.keys(basic_info).length > 0) {
              if (data.data.pic_path !== "") {
                getData(`${"upload_file/get_image/" + data.data.pic_path}`)
                  .then((imgdata: any) => {
                    setprofileImage(imgdata.data);
                  })
                  .catch((e) => {
                    // Handle error
                  });
              }
              let totalcount = Object.keys(basic_info).length;
              let filledCount = countKeysWithValue(basic_info);
              let percentage = (filledCount / totalcount) * 100;
              setbasicinfoPercentage(percentage);
              totalPercentage += percentage;
              sectionCount++;
            } else {
              sectionCount++;
            }

            if (address && Object.keys(address).length > 0) {
              let totalcount = Object.keys(address).length;
              let filledCount = countKeysWithValue(address);
              let percentage = (filledCount / totalcount) * 100;
              setaddressPercentage(percentage);
              totalPercentage += percentage;
              sectionCount++;
            } else {
              sectionCount++;
            }

            if (language && Object.keys(language).length > 0) {
              let totalhobbycount = 0;
              let filledhobbyCount = 0;
              // if (hobby && Object.keys(hobby).length > 0) {
              //   totalhobbycount = Object.keys(hobby).length;
              //   filledhobbyCount = countKeysWithValue(hobby);
              // }
              let totalcount = Object.keys(language).length + totalhobbycount;
              let filledCount = countKeysWithValue(language) + filledhobbyCount;
              let percentage = (filledCount / totalcount) * 100;
              setlanguagePercentage(percentage);
              totalPercentage += percentage;
              sectionCount++;
            } else {
              sectionCount++;
            }

            if (academic_history && Object.keys(academic_history).length > 0) {
              if (academic_history?.institution_type === "school") {
                if (academic_history?.class_id) {
                  getData(`class/get/${academic_history?.class_id}`).then(
                    (response) =>
                      setStudentClass(
                        response.data.class_name
                          .replace("_", " ")
                          .charAt(0)
                          .toUpperCase() +
                        response.data.class_name.replace("_", " ").slice(1)
                      )
                  );
                }
                delete academic_history?.course_id;
                delete academic_history?.institute_id;
                delete academic_history?.institution_name;
                delete academic_history?.learning_style;
                delete academic_history?.university_name;
                delete academic_history?.year;
                academic_history?.board !== "state_board" &&
                  delete academic_history?.state_for_stateboard;
              } else {
                if (academic_history?.course_id) {
                  getData(`class/get/${academic_history?.course_id}`).then(
                    (response) =>
                      setStudentCourse(
                        response.data.course_name?.replace("_", " ")
                          .charAt(0)
                          .toUpperCase() +
                        response.data.course_name.replace("_", " ").slice(1)
                      )
                  );
                }
                delete academic_history?.board;
                delete academic_history?.class_id;
                delete academic_history?.state_for_stateboard;
              }
              let totalcount = Object.keys(academic_history).length;
              let filledCount = countKeysWithValue(academic_history);
              let percentage = (filledCount / totalcount) * 100;
              setacademichistoryPercentage(percentage);
              totalPercentage += percentage;
              sectionCount++;
            } else {
              sectionCount++;
            }

            if (contact && Object.keys(contact).length > 0) {
              let totalcount = Object.keys(contact).length;
              let filledCount = countKeysWithValue(contact);
              let percentage = (filledCount / totalcount) * 100;
              setcontactPercentage(percentage);
              totalPercentage += percentage;
              sectionCount++;
            } else {
              sectionCount++;
            }

            if (
              subject_preference &&
              Object.keys(subject_preference)?.length > 0
            ) {
              let totalcount = Object.keys(subject_preference)?.length;
              let filledCount = countKeysWithValue(subject_preference);
              let percentage = (filledCount / totalcount) * 100;
              setsubjectPercentage(percentage);
              totalPercentage += percentage;
              sectionCount++;
            } else {
              sectionCount++;
            }

            if (sectionCount > 0) {
              let overallPercentage = totalPercentage / sectionCount;
              // setoverallProfilePercentage(overallPercentage); // Set the overall percentage
              overallPercentage = Math.round(overallPercentage);
              const nandata = 100 - overallPercentage;

              localStorage.setItem(
                "Profile_completion",
                JSON.stringify(overallPercentage)
              );
              if (overallPercentage !== 100) {
                setDataCompleted(true);
              }
              setStats1({
                Student_Profile: overallPercentage,
                Student_null: nandata,
              });
              setProPercentage(overallPercentage);
            }
          }
        })
        .catch((e) => {
          toast.error(e?.message, {
            hideProgressBar: true,
            theme: "colored",
          });
        });
    }
  };

  const fetchStudentData = async () => {
    if (usertype === "student") {
      try {
        const [chatHistory, chatCount] = await Promise.all([
          getData(`${chatlisturl}/${userdata?.id}`),
          getData("/chat/api/chat-count/" + StudentId),
        ]);
        const chatstarred =
          chatHistory?.data?.filter((chat: any) => chat?.flagged) || [];
        setStudent({
          // chatHistory: chatHistory?.data?.length || 0,
          chatHistory: chatstarred?.length || 0,
          chatCount: chatHistory?.data?.length || 0,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const callAPIAdmin = async () => {
    if (usertype === "admin") {
      getData(`${profileURLadmin}/${StudentId}`)
        .then((data: any) => {
          if (data?.data) {
            // setProfileData(data?.data)
            // let basic_info = data?.data?.basic_info
            let basic_info = {
              dob: data?.data?.basic_info?.dob,
              father_name: data?.data?.basic_info?.father_name,
              first_name: data?.data?.basic_info?.first_name,
              gender: data?.data?.basic_info?.gender,
              id: data?.data?.basic_info?.id,
              last_modified_datetime:
                data?.data.basic_info?.last_modified_datetime,
              last_name: data?.data?.basic_info?.last_name,
              mother_name: data?.data?.basic_info?.mother_name,
              admin_registration_no:
                data?.data?.basic_info?.admin_registration_no,
              department_id: data?.data?.basic_info?.department_id,
              guardian_name: data?.data?.basic_info?.guardian_name,
            };
            // let address = data?.data?.address
            let address = {
              address1: data?.data?.address?.address1,
              country: data?.data?.address?.country,
              state: data?.data?.address?.state,
              city: data?.data?.address?.city,
              district: data?.data?.address?.district,
              pincode: data?.data?.address?.pincode,
            };
            // let language = data?.data?.language_known
            let language = {
              language_id: data?.data?.language_known?.language_id,
              proficiency: data?.data?.language_known?.proficiency,
            };
            let description = data?.data?.admin_description;
            // let contact = data?.data?.contact
            let contact = {
              // email_id: data?.data?.contact?.email_id,
              id: data?.data?.contact?.id,
              // is_active: data?.data?.contact?.is_active,
              mobile_isd_call: data?.data?.contact?.mobile_isd_call,
              mobile_no_call: data?.data?.contact?.mobile_no_call,
              // mobile_no_watsapp: data?.data?.contact?.mobile_no_watsapp,
            };
            // let profession = data?.data?.profession
            let profession = {
              course_id: data?.data?.profession?.course_id,
              subject_id: data?.data?.profession?.subject_id,
              institution_id: data?.data?.profession?.institution_id,
            };
            let hobby = data?.data?.hobby;
            let totalPercentage = 0;
            let sectionCount = 0;
            if (basic_info && Object.keys(basic_info)?.length > 0) {
              if (data?.data?.pic_path !== "") {
                getData(`${"upload_file/get_image/" + data?.data?.pic_path}`)
                  .then((imgdata: any) => {
                    // setprofileImage(imgdata?.data)
                  })
                  .catch((e) => { });
              }

              let totalcount = Object.keys(basic_info)?.length;
              let filledCount = countKeysWithValue(basic_info);
              let percentage = (filledCount / totalcount) * 100;
              totalPercentage += percentage;
              sectionCount++;
            } else {
              sectionCount++;
            }
            if (address && Object.keys(address)?.length > 0) {
              let totalcount = Object.keys(address)?.length;
              let filledCount = countKeysWithValue(address);
              let percentage = (filledCount / totalcount) * 100;
              totalPercentage += percentage;
              sectionCount++;
            } else {
              sectionCount++;
            }
            if (language && Object.keys(language).length > 0) {
              let totalhobbycount = 0;
              let filledhobbyCount = 0;
              if (hobby && Object.keys(hobby).length > 0) {
                totalhobbycount = Object.keys(hobby).length;
                filledhobbyCount = countKeysWithValue(hobby);
              }
              let totalcount = Object.keys(language).length + totalhobbycount;
              let filledCount = countKeysWithValue(language) + filledhobbyCount;
              let percentage = (filledCount / totalcount) * 100;
              totalPercentage += percentage;
              sectionCount++;
            } else {
              sectionCount++;
            }
            if (description && Object.keys(description).length > 0) {
              let totalcount = Object.keys(description).length;
              let filledCount = countKeysWithValue(description);
              let percentage = (filledCount / totalcount) * 100;
              totalPercentage += percentage;
              sectionCount++;
            } else {
              sectionCount++;
            }
            if (contact && Object.keys(contact).length > 0) {
              let totalcount = Object.keys(contact).length;
              let filledCount = countKeysWithValue(contact);
              let percentage = (filledCount / totalcount) * 100;
              totalPercentage += percentage;
              sectionCount++;
            } else {
              sectionCount++;
            }
            if (profession && Object.keys(profession).length > 0) {
              let totalcount = Object.keys(profession).length;
              let filledCount = countKeysWithValue(profession);
              let percentage = (filledCount / totalcount) * 100;
              totalPercentage += percentage;
              sectionCount++;
            } else {
              sectionCount++;
            }
            // console.log("---- ddd eee",sectionCount)
            if (sectionCount > 0) {
              let overallPercentage = totalPercentage / sectionCount;
              // setoverallProfilePercentage(overallPercentage); // Set the overall percentage
              overallPercentage = Math.round(overallPercentage);
              const nandata = 100 - overallPercentage;

              // console.log("overallPercentage sss", nandata,overallPercentage);
              localStorage.setItem(
                "Profile_completion",
                JSON.stringify(overallPercentage)
              );
              setProPercentage(overallPercentage);
              // console.log("---- ddd",overallPercentage)
              // if(overallPercentage !== 100){
              //     setDatacomplated(true)
              // }
            }
          }
        })
        .catch((e) => {
          // toast.error(e?.message, {
          //   hideProgressBar: true,
          //   theme: "colored",
          // });
        });
    }
  };
  const handlecancel = () => {
    setDataCompleted(false);
  };
  const handleOk = (userName: string) => {
    userName === "admin"
      ? navigate("/main/adminprofile")
      : navigate("/main/StudentProfile");
  };

  useEffect(() => {
    if (userName !== "admin") {
      callAPIStudent();
      fetchStudentData();
      const newTheme = localStorage.getItem("theme");
      setThemeMode(newTheme || "light");
    }

    callAPIAdmin();

    const fetchData = async () => {
      if (usertype === "admin") {
        try {
          const [
            institutionRes,
            studentRes,
            subjectRes,
            entityRes,
            departmentRes,
            courseRes,
          ] = await Promise.allSettled([
            getData("/institution/list"),
            getData("/student/list"),
            getData("/subject/list"),
            getData("/entity/list"),
            getData("/department/list"),
            getData("/course/list"),
          ]);
          const institutionCount =
            institutionRes?.status === "fulfilled"
              ? institutionRes?.value?.data?.length || 0
              : 0;
          const studentCount =
            studentRes?.status === "fulfilled"
              ? studentRes?.value?.data?.length || 0
              : 0;
          const subjectCount =
            subjectRes?.status === "fulfilled"
              ? subjectRes?.value?.data?.length || 0
              : 0;
          const entityCount =
            entityRes?.status === "fulfilled"
              ? entityRes?.value?.data?.length || 0
              : 0;
          const departmentCount =
            departmentRes?.status === "fulfilled"
              ? departmentRes?.value?.data?.length || 0
              : 0;
          const courseCount =
            courseRes?.status === "fulfilled"
              ? courseRes?.value?.data?.length || 0
              : 0;

          setStats({
            institutionCount,
            studentCount,
            subjectCount,
            entityCount,
            departmentCount,
            courseCount,
          });

          // setStats({
          //     institutionCount: institutionRes?.data?.length || 0,
          //     studentCount: studentRes?.data?.length || 0 ,
          //     subjectCount: subjectRes?.data?.length || 0,
          //     entityCount: entityRes?.data?.length || 0,
          //     departmentCount: departmentRes?.data?.length || 0,
          //     courseCount: courseRes?.data?.length || 0 ,
          // });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    // const fetchstucount = async () => {
    //     getData("hobby/list")
    //     .then((data: any) => {
    //       if (data?.status === 200) {
    //         const filteredData = data?.data?.filter((item:any) => item?.is_active === 1);
    //         // setAllHobbies(filteredData ||[]);
    //         // setAllHobbies(data?.data);
    //       }
    //     })
    //     .catch((e) => {
    //       toast.error(e?.message, {
    //         hideProgressBar: true,
    //         theme: "colored",
    //       });
    //     });
    // }

    fetchData();

    // fetchstucount();
  }, []);

  const pieData = [
    { id: 0, value: stats.entityCount, label: "Entity" },
    { id: 1, value: stats.institutionCount, label: "Institute" },
    { id: 2, value: stats.studentCount, label: "Student" },
    { id: 3, value: stats.courseCount, label: "Course" },
    { id: 4, value: stats.subjectCount, label: "Subject" },
    { id: 5, value: stats.departmentCount, label: "Department" },
  ];

  const pieData1 = [
    { id: 0, value: stats1?.Student_Profile, label: `Profile completed` },
    { id: 1, value: stats1?.Student_null, label: `Pending Profile` },
    //`${stats1.Student_Profile}% Profile`
  ];

  const EntityExists = hasSubMenu(menudata, "Entity");
  const InstitutionsExists = hasSubMenu(menudata, "Institute");
  const StudentsExists = hasSubMenu(menudata, "Student");
  const CoursesExists = hasSubMenu(menudata, "Course");
  const SubjectsExists = hasSubMenu(menudata, "Subject");
  const DepartmentExists = hasSubMenu(menudata, "Department");

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div
          style={{
            backgroundColor: "white",
            padding: "5px",
            border: "1px solid #ccc",
          }}
        >
          <p>{dataPoint.label}</p>
          <p>{`Points: ${dataPoint.value}`}</p>
          <p>{`Rank: ${dataPoint.rank}`}</p>
        </div>
      );
    }
    return null;
  };
  return (
    <>
      {loading && <FullScreenLoader />}
      {/* {basicinfo!==null && basicinfo?.basic_info && userName === 'admin' ?  */}
      {userName === "admin" ? (
        <>
          <main className="main-content">
            <section className="row">
              {menuList == null || menuList?.length === 0 ? (
                <>
                  <div className="col-xl-2 col-md-4 col-sm-6 mb-2">
                    <div className="stat-item">
                      <p>Entities</p>
                      <h2>{stats.entityCount}</h2>
                    </div>
                  </div>
                  <div className="col-xl-2 col-md-4 col-sm-6 mb-2">
                    <div className="stat-item">
                      <p>Institutions</p>
                      <h2>{stats.institutionCount}</h2>
                    </div>
                  </div>
                  <div className="col-xl-2 col-md-4 col-sm-6 mb-2">
                    <div className="stat-item">
                      <p>Students</p>
                      <h2>{stats.studentCount}</h2>
                    </div>
                  </div>
                  <div className="col-xl-2 col-md-4 col-sm-6 mb-2">
                    <div className="stat-item">
                      <p>Courses</p>
                      <h2>{stats.courseCount}</h2>
                    </div>
                  </div>
                  <div className="col-xl-2 col-md-4 col-sm-6 mb-2">
                    <div className="stat-item">
                      <p>Subjects</p>
                      <h2>{stats.subjectCount}</h2>
                    </div>
                  </div>
                  <div className="col-xl-2 col-md-4 col-sm-6 mb-2">
                    <div className="stat-item">
                      <p>Departments</p>
                      <h2>{stats.departmentCount}</h2>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to={InstitutionsExists ? "/main/Institute" : "#"}
                    className="col-xl-2 col-md-4 col-sm-6 mb-2 mx-3 stat-item"
                  >
                    <div>
                      <p>Institutions</p>
                      <h2>{stats.institutionCount}</h2>
                    </div>
                  </Link>
                  <Link
                    to={StudentsExists ? "/main/Student" : "#"}
                    className="col-xl-2 col-md-4 col-sm-6 mb-2 mx-3 stat-item"
                  >
                    <div>
                      <p>Students</p>
                      <h2>{stats.studentCount}</h2>
                    </div>
                  </Link>
                  <Link
                    to={CoursesExists ? "/main/Course" : "#"}
                    className="col-xl-2 col-md-4 col-sm-6 mb-2 mx-3 stat-item"
                  >
                    <div>
                      <p>Courses</p>
                      <h2>{stats.courseCount}</h2>
                    </div>
                  </Link>
                  <Link
                    to={SubjectsExists ? "/main/Subject" : "#"}
                    className="col-xl-2 col-md-4 col-sm-6 mb-2 mx-3 stat-item"
                  >
                    <div>
                      <p>Subjects</p>
                      <h2>{stats.subjectCount}</h2>
                    </div>
                  </Link>
                  <Link
                    to={DepartmentExists ? "/main/Department" : "#"}
                    className="col-xl-2 col-md-4 col-sm-6 mb-2 mx-3 stat-item"
                  >
                    <div>
                      <p>Departments</p>
                      <h2>{stats.departmentCount}</h2>
                    </div>
                  </Link>
                </>
              )}
            </section>
            <section className="charts">
              <div className="chart">
                <Bar data={barData} />
              </div>
              <div className="chart">
                <Line data={lineData} />
              </div>
              <div className="chart">
                <PieChart
                  className="pie"
                  series={[
                    {
                      data: pieData,
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: {
                        innerRadius: 30,
                        additionalRadius: -30,
                        color: "gray",
                      },
                    },
                  ]}
                  width={450}
                  height={200}
                />
              </div>
            </section>
          </main>
        </>
      ) : userName === "student" ? (
        <>
          {/* <main className="main-content">
            <section className="stats stats12">
              <Link
                to={stats1.Student_Profile === 100 ? "/main/Chat" : ""}
                className="stat-item"
              >
                <div>
                  <p>Starred Chat</p>
                  <h2>{student.chatHistory}</h2>
                </div>
              </Link>
              <Link
                to={stats1.Student_Profile === 100 ? "/main/Chat" : ""}
                className="stat-item stats3"
              >
                <div>
                  <p>Chat</p>
                  <h2>{student.chatCount}</h2>
                </div>
              </Link>
            </section>
            <section className="piecharts">
              <div className="chart">
                <div style={{ marginBottom: "20px" }}>
                  <span
                    style={{
                      fontSize: "1.2rem",
                      color: "#7f8c8d",
                      fontFamily: "sans-serif",
                    }}
                  >
                    Student profile completion
                  </span>
                  <br />
                </div>

                <PieChart
                  className="pie"
                  series={[
                    {
                      data: pieData1,
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: {
                        innerRadius: 30,
                        additionalRadius: -30,
                        color: "gray",
                      },
                      valueFormatter: (v, { dataIndex }) => {
                        const { value } = pieData1[dataIndex];
                        return `${value}%`;
                      },
                      cx: 110,
                    },
                  ]}
                  slotProps={{
                    legend: {
                      hidden: true, // Show the legend
                    },
                  }}
                  // width={450}
                  height={200}
                />
                <span className="chart_content">
                  <div
                    style={{
                      width: "20px",
                      height: " 20px",
                      backgroundColor: "#02b2af",
                      marginRight: "10px",
                    }}
                  ></div>
                  Profile completion {stats1?.Student_Profile} %
                </span>
              </div>
            </section>
          </main> */}
          <main className="main-wrapper">
            <div className="main-content">
              {/* <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                <div className="breadcrumb-title pe-3">Dashboard</div>
                <div className="ps-3">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0 p-0">
                      <li className="breadcrumb-item">
                        <a href="#">
                          <i className="bx bx-home-alt"></i>
                        </a>
                      </li>
                      <li
                        // className="breadcrumb-item"
                        aria-current="page"
                      >
                        Report
                      </li>
                    </ol>
                  </nav>
                </div>
                <div className="ms-auto">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="btn btn-outline-primary rounded-pill px-lg-4"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#staticBackdrop"
                    >
                      Settings
                    </button>
                  </div>
                </div>
              </div> */}

              <div className="row mt-lg-5">
                <div className="col-xxl-3 col-xl-6 d-flex align-items-stretch">
                  <div className="card w-100 overflow-hidden rounded-4 shadow-none desk-card">
                    <div className="card-header bg-primary-20 border-bottom-0">
                      <div className="row">
                        <div className="col-12">
                          <div className="d-flex align-items-center gap-lg-3 gap-2 mobile-profile">
                            <img
                              src={personImage}
                              className="rounded-circle bg-grd-info p-1"
                              width="100"
                              height="100"
                              alt="user"
                            />
                            <div className="w-100">
                              <div className="d-flex justify-content-between align-items-start">
                                <div className="">
                                  <h4 className="fw-semibold mb-0 fs-4 mb-0">
                                    {profileDatas?.basic_info?.first_name
                                      ? `${profileDatas?.basic_info?.first_name}`
                                      : ""}
                                  </h4>
                                  <small className="mb-lg-3 mb-1 d-block">
                                    {studentClass || studentCourse}
                                  </small>
                                </div>
                                <a href="" className="text-dark link-underline">
                                  Edit Profile
                                </a>
                              </div>

                              <div className="d-flex justify-content-between gap-2 flex-wrap align-items-center">
                                <i>Student Standard <span className="d-lg-block"> Account </span></i>
                                <button className="btn btn-primary rounded-pill btn-sm  text-nowrap px-lg-3">
                                  Upgrade <KeyboardArrowRightIcon />
                                </button>
                              </div>

                              {/* <div className="">
                                <div
                                  className="progress mb-0"
                                  style={{ height: "5px" }}
                                >
                                  <div
                                    className="progress-bar bg-grd-success"
                                    role="progressbar"
                                    style={{
                                      width: `${stats1?.Student_Profile}%`,
                                    }}
                                    aria-valuenow={25}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  ></div>
                                </div>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body position-relative p-4">
                      <div className="d-flex align-items-center justify-content-between gap-2 mb-3">
                        <div>
                          <h6 className="mb-0 fw-normal fs-14">Status</h6>
                        </div>

                        <div className="form-check form-switch mb-0 ">
                          <input
                            className="form-check-input fs-5 m-0"
                            type="checkbox"
                            id="status"
                            checked={true}
                          />
                        </div>
                      </div>

                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="flex-grow-1">
                          <h6 className="mb-0 fw-normal fs-14">Chat History</h6>
                        </div>
                        <div style={{ color: `#9943EC` }}>
                          {student?.chatCount}
                        </div>
                      </div>

                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="flex-grow-1">
                          <h6 className="mb-0 fw-normal fs-14">Saved Chat</h6>
                        </div>
                        <div style={{ color: `#9943EC` }}>
                          {student?.chatHistory}
                        </div>
                      </div>

                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="flex-grow-1">
                          <h6 className="mb-0 fw-normal fs-14">
                            Profile Completed
                          </h6>
                        </div>
                        <div
                          style={{ color: `#9943EC` }}
                        >{`${stats1?.Student_Profile}%`}</div>
                      </div>

                      <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="flex-grow-1">
                          <h6 className="mb-0 fw-normal fs-14">Adhar KYC</h6>
                        </div>
                        <div style={{ color: `#9943EC` }}>Pending</div>
                      </div>

                      {/* <div className="d-flex align-items-center gap-3">
                        <div className="flex-grow-1">
                          <h6 className="mb-0 fw-normal">
                            Student Standard Account
                          </h6>
                        </div>
                        <div style={{ color: `#9943EC` }}>Upgrade</div>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="col-xxl-3 col-xl-6 d-flex align-items-stretch ">
                  <div className="card w-100 rounded-4 shadow-none desk-card">
                    <div className="card-body">
                      <div className="d-flex align-items-start justify-content-between mb-3 gap-4">
                        <div className="">
                          <h5 className="mb-2 fw-semibold fs-6">
                            Your Preferred Subject
                          </h5>
                          <small className="fs-12">
                            Learning journey with our comprehensive lesson
                            exercise courses,{" "}
                          </small>
                        </div>
                        <a
                          href=""
                          className="fw-semibold text-nowrap text-dark"
                        >
                          See All
                        </a>
                      </div>
                      <div className="d-flex flex-column justify-content-between gap-4">
                        <div className="d-flex align-items-center gap-4  show-seprate">
                          <a
                            href="#"
                            className="d-flex gap-0 flex-grow-1 flex-column text-start nav-link"
                          >
                            <p className="mb-0 ">
                              {profileDatas?.subject_preference?.subject_name
                                ? `${profileDatas?.subject_preference?.subject_name}`
                                : ""}
                            </p>
                            {/* <small className="text-success">Completed</small> */}
                          </a>
                          <div className="">
                            <p className="mb-0 fs-6">
                              {profileDatas?.subject_preference
                                ?.score_in_percentage
                                ? profileDatas?.subject_preference
                                  ?.score_in_percentage
                                : ""}
                            </p>
                          </div>
                          <div className="">
                            <p className="mb-0 data-attributes">
                              {/* <span data-peity='{ "fill": ["#0d6efd", "rgb(0 0 0 / 10%)"], "innerRadius": 14, "radius": 18 }'>
                                7/7
                              </span> */}
                              <CircularProgress
                                size={"30px"}
                                thickness={5}
                                variant="determinate"
                                value={
                                  profileDatas?.subject_preference
                                    ?.score_in_percentage || 0
                                }
                              />
                            </p>
                          </div>
                        </div>

                        {/* <div className="d-flex align-items-center gap-4">
                          <a
                            href="#"
                            className="d-flex gap-0 flex-grow-1 flex-column text-start nav-link"
                          >
                            <p className="mb-0">Economics</p>
                            <small className="text-primary">Inprogress</small>
                          </a>
                          <div className="">
                            <p className="mb-0 fs-6">45%</p>
                          </div>
                          <div className="">
                            <p className="mb-0 data-attributes">
                              <span data-peity='{ "fill": ["#0d6efd", "rgb(0 0 0 / 10%)"], "innerRadius": 14, "radius": 18 }'>
                                3/7
                              </span>
                            </p>
                          </div>
                        </div> */}

                        {/* <div className="d-flex align-items-center gap-4">
                          <a
                            href="#"
                            className="d-flex gap-0 flex-grow-1 flex-column text-start nav-link"
                          >
                            <p className="mb-0">History</p>
                            <small className="text-primary">Inprogress</small>
                          </a>
                          <div className="">
                            <p className="mb-0 fs-6">65%</p>
                          </div>
                          <div className="">
                            <p className="mb-0 data-attributes">
                              <span data-peity='{ "fill": ["#0d6efd", "rgb(0 0 0 / 10%)"], "innerRadius": 14, "radius": 18 }'>
                                5/7
                              </span>
                            </p>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-6 d-flex align-items-stretch mb-xl-4">
                  <div className="chat-wrapper desk-chat-wrapper  shadow-none rounded-5">
                    <div className="chat-header d-flex align-items-center start-0 rounded-top-5">
                      <div>
                        <img src={robotImage} className="chatroboimg" alt="" />
                      </div>
                      <div className="chat-top-header-menu ms-auto">
                        <Link
                          to={"/main/Chat/recentChat"}
                          className="btn-outline-light btn-circle rounded-circle d-flex gap-2 wh-48"
                        >
                          <OpenInFullOutlinedIcon sx={{ fontSize: "24px" }} />
                        </Link>
                      </div>
                    </div>
                    {/* <div className="chat-content ms-0 rounded-top-4"> */}
                    <PerfectScrollbar className="chat-content ms-0 rounded-top-5">
                      <div className="chat-content-rightside">
                        <div className="d-flex ms-auto">
                          <div className="flex-grow-1 me-2">
                            <div className="chat-right-msg">
                              <span className="anstext">
                                <SearchOutlinedIcon sx={{ fontSize: "18px" }} />{" "}
                                Question
                              </span>
                              <p className="mb-0">
                                Give me a description of each one
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="chat-content-leftside">
                        <div className="d-flex">
                          <img
                            src={logo}
                            width="38"
                            height="38"
                            style={{ backgroundColor: "#9943ec" }}
                            // className="rounded-circle p-2 bg-primary"
                            className="rounded-circle p-2"
                            alt=""
                          />
                          <div className="flex-grow-1 ms-2">
                            <div className="chat-left-msg">
                              <span className="anstext">
                                <DescriptionOutlinedIcon
                                  sx={{ fontSize: "14px" }}
                                />{" "}
                                Answer
                              </span>
                              <div className="mb-4">
                                <p>
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit. Cupiditate alias iste
                                  minima! Illo blanditiis minima aspernatur id
                                  iste a! Dolore similique voluptate earum
                                  dolorem pariatur. Pariatur sint aliquam
                                  reiciendis minima.
                                </p>
                              </div>
                              <ul className="ansfooter">
                                <li>
                                  <ThumbUpAltOutlinedIcon
                                    sx={{ fontSize: "14px" }}
                                  />
                                </li>
                                <li>
                                  <ThumbDownOutlinedIcon
                                    sx={{ fontSize: "14px" }}
                                  />
                                </li>
                                <li>
                                  <ContentCopyOutlinedIcon
                                    sx={{ fontSize: "14px" }}
                                  />{" "}
                                  <span>Copy</span>
                                </li>
                                <li>
                                  <VolumeUpOutlinedIcon
                                    sx={{ fontSize: "14px" }}
                                  />{" "}
                                  <span>Read</span>
                                </li>
                                <li>
                                  <CachedOutlinedIcon
                                    sx={{ fontSize: "14px" }}
                                  />{" "}
                                  <span>Regenerate</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="chat-content-rightside">
                        <div className="d-flex ms-auto">
                          <div className="flex-grow-1 me-2">
                            <div className="chat-right-msg">
                              <span className="anstext">
                                <SearchOutlinedIcon sx={{ fontSize: "18px" }} />{" "}
                                Question
                              </span>
                              <p className="mb-0">
                                Give me a description of each one
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* </div> */}
                    </PerfectScrollbar>
                    <div className="chat-footer d-flex align-items-center start-0 rounded-bottom-5 bg-white border-0 ">
                      <div className="flex-grow-1 pe-2">
                        <div className="input-group">
                          {/* <span className="input-group-text">
                            <MicOutlinedIcon />
                          </span> */}
                          <input
                            type="text"
                            className="form-control rounded-pill"
                            placeholder="Type a message"
                          />
                        </div>
                      </div>
                      <div className="chat-footer-menu">
                        <a
                          href="#"
                          className="btn-outline-light btn-circle rounded-circle d-flex gap-2 wh-48"
                        >
                          <SendOutlinedIcon />
                        </a>
                      </div>
                    </div>
                    <div className="overlay chat-toggle-btn-mobile"></div>
                  </div>
                </div>

                <div className="col-xl-6 d-flex align-items-stretch">
                  <div className="row mt-4 mt-lg-0">
                    <div className="col-lg-12 d-flex align-items-stretch">
                      <div className="card w-100 rounded-4 desk-card ">
                        <div className="card-body">
                          <div className="text-center">
                            <h6 className="mb-0">Study Chart</h6>
                          </div>
                          <div className="mt-4">
                            <Chart
                              options={barChartOptions}
                              series={barChartSeries}
                              type="bar"
                              height={"280px"}
                            />
                          </div>
                          <p>Your Total Time Spend & Study Chart</p>
                          <div className="d-flex align-items-center gap-3 mt-4">
                            <div className="">
                              <h1 className="mb-0 text-primary">79h 2m </h1>
                              <small>time spend</small>
                            </div>
                            <div className="d-flex align-items-center align-self-end">
                              <p className="mb-0 text-success">34.5%</p>
                              <span className="text-success">
                                <ExpandLessOutlinedIcon />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 d-flex align-items-stretch">
                      <div className="card w-100 rounded-4 desk-card">
                        <div className="card-body">
                          <div className="d-flex align-items-start justify-content-between mb-1">
                            <div className="">
                              <h5 className="mb-0">20</h5>
                              <p className="mb-0">Topics Attended</p>
                            </div>
                            <div className="dropdown">
                              <a
                                href="#"
                                className="dropdown-toggle-nocaret options dropdown-toggle"
                                data-bs-toggle="dropdown"
                              >
                                {" "}
                                <span className="fs-5">
                                  <MoreVertOutlinedIcon />
                                </span>
                              </a>
                              <ul className="dropdown-menu">
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Action
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Another action
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Something else here
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="chart-container2">
                            <Chart
                              options={radialChartOptions}
                              series={[78]}
                              type="radialBar"
                              height={"200px"}
                            />
                          </div>
                          <div className="text-center">
                            <p className="mb-0 font-12">
                              You have attended 20 of 30 classes
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 d-flex align-items-stretch">
                      <div className="card w-100 rounded-4 desk-card">
                        <div className="card-body">
                          <div className="d-flex align-items-start justify-content-between mb-3">
                            <div className="">
                              <h5 className="mb-0">12</h5>
                              <p className="mb-0">Assignment</p>
                            </div>
                            <div className="dropdown">
                              <a
                                href="#"
                                className="dropdown-toggle-nocaret options dropdown-toggle"
                                data-bs-toggle="dropdown"
                              >
                                <span className="fs-5">
                                  <MoreVertOutlinedIcon />
                                </span>
                              </a>
                              <ul className="dropdown-menu">
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Action
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Another action
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Something else here
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="chart-container2">
                            <Chart
                              options={lineChartOptions}
                              series={[
                                {
                                  data: [4, 10, 25, 12, 25, 18, 40, 22, 7],
                                },
                              ]}
                              type="area"
                              height={"100%"}
                            />
                          </div>
                          <div className="text-center">
                            <p className="mb-0 font-12">
                              {" "}
                              You have done{" "}
                              <span className="text-success me-1">12</span>
                              assignments out of 67
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6  d-flex align-items-stretch">
                  <div className="card w-100 rounded-4 desk-card">
                    <div className="card-body">
                      <Chart
                        options={secondLineChartOptions}
                        series={[
                          {
                            name: "",
                            data: [4, 10, 25, 12, 25, 18, 40, 22, 7],
                          },
                        ]}
                        type="area"
                      />
                      <div className="d-flex align-items-center gap-3 mt-4">
                        <div className="">
                          <h1 className="mb-0">36.7%</h1>
                        </div>
                        <div className="d-flex align-items-center align-self-end gap-2">
                          <span className="text-success">
                            <TrendingUpOutlinedIcon />
                          </span>
                          <p className="mb-0 text-success">34.5%</p>
                        </div>
                      </div>
                      <p className="mb-4">Study Growth</p>
                      <div className="d-flex flex-column gap-3">
                        <div className="">
                          <p className="mb-1">
                            Cliks <span className="float-end">2589</span>
                          </p>
                          <div className="progress" style={{ height: "5px" }}>
                            <div
                              className="progress-bar bg-grd-primary"
                              style={{ width: "65%" }}
                            ></div>
                          </div>
                        </div>
                        <div className="">
                          <p className="mb-1">
                            Likes <span className="float-end">6748</span>
                          </p>
                          <div className="progress" style={{ height: "5px" }}>
                            <div
                              className="progress-bar bg-grd-warning"
                              style={{ width: "55%" }}
                            ></div>
                          </div>
                        </div>
                        <div className="">
                          <p className="mb-1">
                            Upvotes <span className="float-end">9842</span>
                          </p>
                          <div className="progress" style={{ height: "5px" }}>
                            <div
                              className="progress-bar bg-grd-info"
                              style={{ width: "45%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <ThemeSidebar themeMode={themeMode} setThemeMode={setThemeMode} />
        </>
      ) : (
        // :
        // userName === 'teacher' ?

        //    <>
        //   <main className="main-content">

        //       <Teacher/>
        //     </main>
        //    </>

        <></>
      )}
      <ProfileDialog
        isOpen={dataCompleted}
        onCancel={handlecancel}
        onOkClick={() => handleOk(userName)}
        title="Your profile is incomplete"
      />
    </>
  );
}

export default MainContent;
