// Yup Validation
import * as Yup from "yup"

// Utils
import { getTrad } from "../../utils"

const ValidationSchema = (formatMessage) => {
    const msg = {
        string: {
          isRequired: formatMessage({
            id: getTrad("form.validation.string.isRequired"),
            defaultMessage: "Text cannot be empty"
          }),
          isMax: formatMessage({
            id: getTrad("form.validation.string.isMax"),
            defaultMessage: "Text is to long"
          })
        }
    }

    return Yup.object().shape({
      category_name: Yup
          .string()
          .required(msg.string.isRequired)
          .max(125, msg.string.isMax),

      category_desc: Yup
          .string()
          .max(2000, msg.string.isMax),
    })
};
export default ValidationSchema