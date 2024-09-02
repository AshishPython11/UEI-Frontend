import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { hasSubMenu } from "../../utils/helpers";
import { QUERY_KEYS_MENU } from "../../utils/const";
import useApi from "../../hooks/useAPI";
import NotFound from "../../Pages/NotFound/NotFound";

const Protected = (props: { Component: any, menuName?: string }) => {
  const { Component, menuName } = props;
  const navigate = useNavigate();
 

  useEffect(() => {
    // console.log("props", props)
    let logintoken = localStorage.getItem("token");
    if (!logintoken) {
      navigate("/");
    }
  }, []);
  const usertype:any = localStorage?.getItem('user_type')
  const isDashboard = () => {
    const currentURL = window.location.href;
    const parts = currentURL.split("/"); 
    const mName = parts[parts.length - 1];
    const MnameExist = (mName?.toLowerCase() === "dashboard" || (usertype === 'admin' ?  mName.toLowerCase() === "adminprofile" : mName.toLowerCase() === "studentprofile" )|| mName.toLowerCase() === "changepassword" || (usertype === 'admin' ? "" : mName.toLowerCase() === "chat") || (usertype === 'admin' ?  mName.toLowerCase() === "uploadpdf":"") || (usertype === 'student' ?  mName.toLowerCase() === "recentchat" : "") )
    return MnameExist

  }

  const isAllowed = () => {
    const menuList = localStorage.getItem("menulist1") ? JSON.parse(localStorage.getItem("menulist1") as string) : []
    // console.log("menuName -->", props, menuList)
    return hasSubMenu(menuList, menuName);
  }
  return (
    <>
      {(isAllowed() || isDashboard()) ? <Component /> : <NotFound />}
      {/* <Component />  */}
    </>
  );
};

export default Protected;