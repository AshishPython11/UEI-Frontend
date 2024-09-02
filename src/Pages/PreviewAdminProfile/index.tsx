import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import useApi from "../../hooks/useAPI";
import { QUERY_KEYS_ADMIN_BASIC_INFO } from "../../utils/const";
import { toast } from "react-toastify";
import images_man from "../../assets/img/images_man.png";
import images_female from "../../assets/img/images_female.png";

// import { QUERY_STUDENT_PROFILE_KEYS } from '../../utils/const';
interface PreviewAdminProfileProps {
  editProfile: () => void;
  handleStep: React.Dispatch<React.SetStateAction<number>>;
  isEdit1:boolean;
  isEditfun: () => void;
}

const PreviewAdminProfile: React.FC<PreviewAdminProfileProps> = ({ editProfile, handleStep,isEdit1,isEditfun }) => {
  // console.log("isEdit",isEdit1)
  let AdminId = localStorage.getItem("_id");
  var userId = localStorage.getItem('userid');
  const profileURL = QUERY_KEYS_ADMIN_BASIC_INFO.ADMIN_GET_PROFILE;
  const [profileData, setProfileData] = useState<any>({})
  const [basicinfoPercentage, setbasicinfoPercentage] = useState<number>(0)
  const [addressPercentage, setaddressPercentage] = useState<number>(0)
  const [languagePercentage, setlanguagePercentage] = useState<number>(0)
  const [desctiptionPercentage, setdesctiptionPercentage] = useState<number>(0)
  const [contactPercentage, setcontactPercentage] = useState<number>(0)
  // const [hobbyPercentage, sethobbyPercentage]=useState<number>(0)
  const [professionPercentage, setprofessionPercentage] = useState<number>(0)
  const [profileImage, setprofileImage] = useState<any>()
  const [per, setper] = useState(false)
  const { getData,loading } = useApi()



  const countKeysWithValue = (obj: any): number => {
    return Object.keys(obj).filter(key => obj[key] !== null && obj[key] !== undefined && obj[key] !== '').length;
  };
  const callAPI = async () => {
    getData(`${profileURL}/${AdminId}`).then((data: any) => {
      // console.log(data.data)
      if (data.data) {
        setProfileData(data?.data)
        // let basic_info = data?.data?.basic_info
        let basic_info = {
          // aim: data?.data?.basic_info?.aim,
          dob: data?.data?.basic_info?.dob,
          father_name: data?.data?.basic_info?.father_name,
          first_name: data?.data?.basic_info?.first_name,
          gender: data?.data?.basic_info?.gender,
          id: data?.data?.basic_info?.id,
          // is_active: data?.data?.basic_info?.is_active,
          // is_kyc_verified: data?.data?.basic_info?.is_kyc_verified,
          last_modified_datetime: data?.data.basic_info?.last_modified_datetime,
          last_name: data?.data?.basic_info?.last_name,
          mother_name: data?.data?.basic_info?.mother_name,
          admin_registration_no: data?.data?.basic_info?.admin_registration_no,
          department_id: data?.data?.basic_info?.department_id,
          guardian_name:data?.data?.basic_info?.guardian_name
      };
        let address = data?.data?.address
        let language = data?.data?.language_known
        let description = data?.data?.admin_description
        let contact = data?.data?.contact
        let profession = data?.data?.profession
        let hobby = data?.data?.hobby
        if (basic_info && Object.keys(basic_info)?.length > 0) {
          if(data?.data?.pic_path !== ""){

            getData(`${"upload_file/get_image/" + data?.data?.pic_path}`)
              .then((imgdata: any) => {
                setprofileImage(imgdata?.data)
              }).catch((e) => {
                
              });
          }

          let totalcount = Object.keys(basic_info)?.length
          let filledCount = countKeysWithValue(basic_info)
          let percentage = (filledCount / totalcount) * 100
          setbasicinfoPercentage(percentage)
        }
        if (address && Object.keys(address)?.length > 0) {
          let totalcount = Object.keys(address)?.length
          let filledCount = countKeysWithValue(address)
          let percentage = (filledCount / totalcount) * 100
          setaddressPercentage(percentage)
        }
        if (language && Object.keys(language).length > 0) {
          let totalhobbycount = 0
          let filledhobbyCount = 0
          if (hobby && Object.keys(hobby).length > 0) {
            totalhobbycount = Object.keys(hobby).length
            filledhobbyCount = countKeysWithValue(hobby)
          }
          let totalcount = Object.keys(language).length + totalhobbycount
          let filledCount = countKeysWithValue(language) + filledhobbyCount
          let percentage = (filledCount / totalcount) * 100
          setlanguagePercentage(percentage)
        }
        if (description && Object.keys(description).length > 0) {
          let totalcount = Object.keys(description).length
          let filledCount = countKeysWithValue(description)
          let percentage = (filledCount / totalcount) * 100
          setdesctiptionPercentage(percentage)
        }
        if (contact && Object.keys(contact).length > 0) {
          let totalcount = Object.keys(contact).length
          let filledCount = countKeysWithValue(contact)
          let percentage = (filledCount / totalcount) * 100
          setcontactPercentage(percentage)
        }
        if (profession && Object.keys(profession).length > 0) {
          let totalcount = Object.keys(profession).length
          let filledCount = countKeysWithValue(profession)
          let percentage = (filledCount / totalcount) * 100
          setprofessionPercentage(percentage)
        }
        setper(true)
      }
    }).catch(e => {
      toast.error(e?.message, {
        hideProgressBar: true,
        theme: "colored",
      });
    });
  }
  useEffect(() => {
    callAPI()
  }, [])

  const redirectOnClick = (step: number) => {
    handleStep(step);
    editProfile();
  }
  const initialStateper = {
    basicinfoPercentage: basicinfoPercentage,
    addressPercentage: addressPercentage,
    languagePercentage:languagePercentage,
    desctiptionPercentage:desctiptionPercentage,
    contactPercentage:contactPercentage,
    professionPercentage:professionPercentage,

};

if (isEdit1 && per) {
  // console.log("isEdit",isEdit1,initialStateper)
  const isProfileComplete = Object.values(initialStateper).every(value => value === 100);

  if (!isProfileComplete) {
    // toast.success("Your profile is not complete. Please complete your profile", {
    //   hideProgressBar: true,
    //   theme: "colored",
    // });
    isEditfun();
    setper(false)
  }else{
    // toast.success("You have completed your profile", {
    //   hideProgressBar: true,
    //   theme: "colored",
    // });
    isEditfun();
    setper(false)

  }
}
const handleMouseEnter = (event:any) => {
  event.target.style.color = 'blue';  // Example hover style
  event.target.style.fontSize= '.90rem'
};

const handleMouseLeave = (event:any) => {
  event.target.style.color = 'initial';  // Reset to initial style
  event.target.style.fontSize= '.77rem'
};
const getDefaultImage = (gender: string) => {
  if (gender === 'Male' || gender === 'male') {
    // return "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp";
    return images_man
  } else if (gender === 'Female' || gender === 'female') {
    // return "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp";
    return images_female
  } else {
    // return "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp";
    return images_man
  }
};
// console.log("images test",profileImage,profileData)
  return (
    <>
      <div className="profile_section">
        <div className="card">
          <div className="card-body">
            <React.Fragment>
              {profileData ?
                <section style={{ backgroundColor: '#eee' }}>
                  <div className="container py-5">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="card mb-4">
                          <div className="card-body text-center">
                            <img
                              // src={profileImage ? profileImage : 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'}
                              // src={
                              //   loading ? '' : profileImage
                              //     ? profileImage
                              //     : (profileData?.gender === "Male" || profileData?.gender === "male") ? "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" :(profileData?.gender === "female" || profileData?.gender === "Female") ? "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp" :"https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                              // }
                              src={loading ? '' : profileImage ? profileImage : getDefaultImage(profileData?.gender)}
                              // alt="avatar"
                              className="rounded-circle img"
                              width="150px"
                              height="150px"
                            />
                            <h5 className="my-3">{profileData?.first_name} {profileData?.last_name}</h5>
                            <p className="text-muted mb-1">{profileData?.gender}</p>
                            {profileData?.address && Object.keys(profileData?.address).length > 0 && <p className="text-muted mb-4">{profileData?.address?.address1} ,{profileData?.address?.address2} ,{profileData?.address?.district} ,{profileData?.address?.city} ,{profileData?.address?.state} ,{profileData?.address?.country} ,{profileData?.address?.pincode}</p>}

                            <p className="mb-4"><span className="text-primary font-italic me-1"></span> Profile Completion Status</p>
                            <p className="mb-1" style={{ fontSize: '.77rem', cursor: "pointer" }} onClick={() => redirectOnClick(0)} onMouseEnter={handleMouseEnter}
                              onMouseLeave={handleMouseLeave}>Basic Information</p>
                            <div className="progress rounded" style={{ height: '5px' }}>
                              <div className="progress-bar" role="progressbar" style={{ width: `${basicinfoPercentage}%` }} aria-valuenow={basicinfoPercentage} aria-valuemin={0} aria-valuemax={100}></div>
                            </div>
                            <p className="mt-4 mb-1" style={{ fontSize: '.77rem', cursor:"pointer" }} onClick={() => redirectOnClick(1)} onMouseEnter={handleMouseEnter}
                              onMouseLeave={handleMouseLeave}>Address</p>
                            <div className="progress rounded" style={{ height: '5px' }}>
                              <div className="progress-bar" role="progressbar" style={{ width: `${addressPercentage}%` }} aria-valuenow={addressPercentage} aria-valuemin={0} aria-valuemax={100}></div>
                            </div>
                            <p className="mt-4 mb-1" style={{ fontSize: '.77rem', cursor:"pointer" }} onClick={() => redirectOnClick(2)} onMouseEnter={handleMouseEnter}
                              onMouseLeave={handleMouseLeave}>Language Known</p>
                            <div className="progress rounded" style={{ height: '5px' }}>
                              <div className="progress-bar" role="progressbar" style={{ width: `${languagePercentage}%` }} aria-valuenow={languagePercentage} aria-valuemin={0} aria-valuemax={100}></div>
                            </div>
                            <p className="mt-4 mb-1" style={{ fontSize: '.77rem', cursor:"pointer" }} onClick={() => redirectOnClick(3)} onMouseEnter={handleMouseEnter}
                              onMouseLeave={handleMouseLeave}>Description</p>
                            <div className="progress rounded" style={{ height: '5px' }}>
                              <div className="progress-bar" role="progressbar" style={{ width: `${desctiptionPercentage}%` }} aria-valuenow={desctiptionPercentage} aria-valuemin={0} aria-valuemax={100}></div>
                            </div>
                            <p className="mt-4 mb-1" style={{ fontSize: '.77rem', cursor:"pointer" }} onClick={() => redirectOnClick(4)} onMouseEnter={handleMouseEnter}
                              onMouseLeave={handleMouseLeave}>Contact Details</p>
                            <div className="progress rounded mb-2" style={{ height: '5px' }}>
                              <div className="progress-bar" role="progressbar" style={{ width: `${contactPercentage}%` }} aria-valuenow={contactPercentage} aria-valuemin={0} aria-valuemax={100}></div>
                            </div>
                            <p className="mt-4 mb-1" style={{ fontSize: '.77rem', cursor:"pointer" }} onClick={() => redirectOnClick(5)}onMouseEnter={handleMouseEnter}
                              onMouseLeave={handleMouseLeave}>Profession</p>
                            <div className="progress rounded mb-2" style={{ height: '5px' }}>
                              <div className="progress-bar" role="progressbar" style={{ width: `${professionPercentage}%` }} aria-valuenow={professionPercentage} aria-valuemin={0} aria-valuemax={100}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-8">
                        <div className="card mb-4">
                          <div className="card-body">
                            <div className="row">
                              <div className="col-sm-3">
                                <p className="mb-0">Full Name</p>
                              </div>
                              <div className="col-sm-9">
                                <p className="text-muted mb-0">{profileData?.first_name} {profileData?.last_name}</p>
                              </div>
                            </div>
                            <hr />
                            <div className="row">
                              <div className="col-sm-3">
                                <p className="mb-0">Email</p>
                              </div>
                              <div className="col-sm-9">
                                <p className="text-muted mb-0"> 
                                {profileData?.contact?.email_id !== undefined  ? profileData?.contact?.email_id?.includes('@') ? profileData?.contact?.email_id :"" :  userId && userId?.includes('@') ? userId : ""}
                                  {/* {profileData?.contact?.email_id !== undefined ? profileData?.contact?.email_id : userId} */}
                                  </p>
                               
                              </div>
                            </div>
                            <hr />
                            <div className="row">
                              <div className="col-sm-3">
                                <p className="mb-0">Mobile</p>
                              </div>
                              <div className="col-sm-9">
                                <p className="text-muted mb-0">
                                {profileData?.contact?.mobile_no_call !== undefined  ? profileData?.contact?.mobile_isd_call + " " + profileData?.contact?.mobile_no_call :  userId && !userId?.includes('@') ? userId : ""}
                                  {/* {profileData?.contact?.mobile_isd_call} {profileData?.contact?.mobile_no_call} */}
                                  </p>
                              </div>
                            </div>
                            <hr />
                            <div className="row">
                              <div className="col-sm-3">
                                <p className="mb-0">Whatsapp</p>
                              </div>
                              <div className="col-sm-9">
                                <p className="text-muted mb-0">
                                {profileData?.contact?.mobile_no_watsapp !== undefined   ? profileData?.contact?.mobile_no_watsapp !== "" ? profileData?.contact?.mobile_isd_watsapp +" "+ profileData?.contact?.mobile_no_watsapp:"" :"" }
                                  {/* {profileData?.contact?.mobile_isd_watsapp} {profileData?.contact?.mobile_no_watsapp} */}
                                  </p>
                              </div>
                            </div>
                            <hr />
                            <div className="row">
                              <div className="col-sm-3">
                                <p className="mb-0">Address</p>
                              </div>
                              <div className="col-sm-9">
                                <p className="text-muted mb-0">{profileData?.address && Object.keys(profileData?.address)?.length > 0 && <p className="text-muted mb-4">{profileData?.address?.address1} ,{profileData?.address?.address2} ,{profileData?.address?.district} ,{profileData?.address?.city} ,{profileData?.address?.state} ,{profileData?.address?.country} ,{profileData?.address?.pincode}</p>}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                : <h1>Profile is Not Completed</h1>}
            </React.Fragment>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviewAdminProfile;
