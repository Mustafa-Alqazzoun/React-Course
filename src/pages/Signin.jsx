import {  useState } from "react";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { UserContext } from "../Context/UserContext";
function SignIn() {
  const navigate = useNavigate();
//   const {user,updateUser}=useContext(UserContext)
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    email:""
  });
  const handleLogin = async () => {
    console.log(formValues,"form")
    try {
    //   const response = await axios.post(
    //     "https://fakestoreapi.com/auth/login",
    //     JSON.stringify(formValues),{
    //         headers: { 'Content-Type': 'application/json' },

    //     }
    //   );
    const token= "S4c7JmsM7J775trpIzmBvRUHL6bTJDpOi77Zm5O9FHomtyuOZiixvpAIdLfghzHtS4c7JmsM7J775trpIzmBvRUHL6bTJDpOi77Zm5O9FHomtyuOZiixvpAIdLfghzHt"
    localStorage.setItem("loggedInUser", JSON.stringify({
        userName:formValues.username,email:formValues.email, isLoggedIn:true
    }))
    // updateUser({userName:formValues.username,email:formValues.email,isLoggedIn:true})
     navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    //async function
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <Box
      component="form"
      sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          name="username"
          id="outlined-required"
          label="User Name"
          onChange={handleChange}
        />
  <TextField
          name="email"
          id="outlined-required"
          label="Email"
          onChange={handleChange}
        />
        <TextField  name="password" label="Password" onChange={handleChange} />
      </div>
      <Button onClick={handleLogin}>Log In</Button>
    </Box>
  );
}
export default SignIn;
