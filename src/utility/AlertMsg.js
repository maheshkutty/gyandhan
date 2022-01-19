import react, { useState } from "react";
import Alert from '@mui/material/Alert';

export default function errorMsg({type, flag, msg}) {
  if(type == "success"){
    if(flag == true)
      return <Alert severity="success">{msg}</Alert>
    else
      return null;
  }
  else{
    if(flag == true)
      return <Alert severity="error">{msg}</Alert>
    else
      return null;
  }
}
