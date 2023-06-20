// Yup Validation
import * as Yup from "yup"

// Utils
import { getTrad } from "../../utils"

const ValidationSchema = (formatMessage) => {
   
    return Yup.object().shape({
        setX: Yup
          .number()
          .required(),
        setY: Yup
          .number()
          .required(),
        ID: Yup
          .number()
          .required(),
        locale: Yup
          .string()
          .required(),
    })
};
export default ValidationSchema