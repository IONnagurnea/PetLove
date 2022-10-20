import { useState, useEffect } from "react";

export const usePasswordValidation = ({
  
    userPassword = "",
    confirmUserPassword = "",
    requiredLength = 8,
  
}) => {
const [validLength, setValidLength] = useState(null);
const [hasNumber, setHasNumber] = useState(null);
const [upperCase, setUpperCase] = useState(null);
const [lowerCase, setLowerCase] = useState(null);
const [specialChar, setSpecialChar] = useState(null);
const [match, setMatch] = useState(null);
  
useEffect(() => {
  
setValidLength(userPassword.length >= requiredLength ? true : false);
setUpperCase(userPassword.toLowerCase() !== userPassword);
setLowerCase(userPassword.toUpperCase() !== userPassword);
setHasNumber(/\d/.test(userPassword));
setMatch(userPassword && userPassword === confirmUserPassword);
setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(userPassword));
  
}, [userPassword, confirmUserPassword, requiredLength]);
  
return [validLength, hasNumber, upperCase, lowerCase, match, specialChar];
};