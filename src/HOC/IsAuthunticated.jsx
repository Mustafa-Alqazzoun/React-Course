import { Navigate } from "react-router";

const IsAuthenticated = (WrappedComponent) => {
    
  return (props) => {
    let authunticated=localStorage.getItem("loggedInUser")
    if (authunticated!=null ||authunticated!=""){
        authunticated =JSON.parse(localStorage.getItem("loggedInUser"))?.isLoggedIn;

    }
    console.log(authunticated,"component")
    if (!authunticated) {
      return <Navigate to={"/"} replace />;
    }
    return <WrappedComponent {...props} />;
  };
};
export default IsAuthenticated;
