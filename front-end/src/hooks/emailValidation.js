const apiKey = process.env.REACT_APP_EMAIL_VALIDATION_KEY;
const apiURL = 'https://emailvalidation.abstractapi.com/v1/?api_key=' + apiKey;


export const emailValidation = async(email) => {
    try {
      const response = await (await fetch(`${apiURL}&email=${email}`)).json();
      return response.is_valid_format.value
    } catch (error) {
      throw error
    }
};