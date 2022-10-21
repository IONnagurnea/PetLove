
const apiKey = "ddcfbfcbd8534a8f845402d08bf442c7"
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