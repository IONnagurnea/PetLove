
const apiKey = process.env.REACT_APP_PHONE_VALIDATION_KEY;
const apiURL = 'https://phonevalidation.abstractapi.com/v1/?api_key=' + apiKey;


export const phoneValidation = async(phoneNumber) => {
    try {
      const response = await (await fetch(`${apiURL}&phone=${phoneNumber}`)).json();
      //console.log(response);
      return response.valid
    } catch (error) {
      throw error
    }
};