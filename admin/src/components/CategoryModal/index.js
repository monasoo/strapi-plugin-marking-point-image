
// React
import React, { useState } from "react"
import { useIntl } from "react-intl"

// Strapi
import { Dialog, DialogBody, DialogFooter } from "@strapi/design-system/Dialog"
import { Accordion, AccordionToggle, AccordionContent } from "@strapi/design-system/Accordion"
import { Table, Thead, Tbody, Tr, Td, Th } from "@strapi/design-system/Table"
import { Divider } from "@strapi/design-system/Divider"
import { Stack } from "@strapi/design-system/Stack"
import Trash from "@strapi/icons/Trash"
import { Flex } from "@strapi/design-system/Flex"
import ExclamationMarkCircle from "@strapi/icons/ExclamationMarkCircle"
import {
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Typography,
  Button,
  TextInput,
  Textarea,
  Box
} from "@strapi/design-system"

// Lodash
import { isNull, first } from "lodash"

// Utils
import { getTrad } from "../../utils"

// Validation Schema
import validationSchema from "./validation"

const Modal = ({ setShowModal, crudAction, category = {}, locale = null }) => {

    const { formatMessage } = useIntl()
    const isUpdate = (Object.keys(category).length > 0)

    const [id] = useState(category.id || null)
    const [category_name, setName] = useState(category.category_name || "")
    const [category_desc, setDesc] = useState(category.category_desc || "")

    const [nameValidation, setNameValidation] = useState([])
    const [descValidation, setDescValidation] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (await validateFields()) {
          const fields = {
            category_name: category_name,
            category_desc: category_desc,
            locale: locale
          }
    
          try {
            await crudAction((id) ? { id: id, ...fields } : { ...fields })
            setShowModal(false)
          } catch (e) {
            console.log("error", e)
          }
        }
        
    };

    const handleValidation = async (field, setValueValidation) => {
      const key = Object.keys(field)[0]
      const result = await validateField(field, key)
      const isValid = isNull(result) ? [] : result
  
      setValueValidation(isValid)
    }

    const validateField = async (field, key) => {
      return await validationSchema(formatMessage)
        .validateAt(key, field)
        .then(() => null)
        .catch((err) => err.errors)
    }

    const validateFields = async () => {
      const fields = {
        category_name: category_name,
        category_desc: category_desc,
      }
  
      const validationSuccess = await validationSchema(formatMessage).isValid(fields).then((valid) => valid)
  
      if (!validationSuccess) {
        setNameValidation(await validateField({ category_name: category_name }, "category_name"))
        setDescValidation(await validateField({ category_desc: category_desc }, "category_desc"))
      }
  
      return validationSuccess
    }

    return (
        <ModalLayout
            onClose={() => setShowModal(false)}
            labelledBy="title"
            as="form"
            onSubmit={handleSubmit}
        >
            <ModalHeader>
                <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
                {(isUpdate)
                    ? formatMessage({
                    id: getTrad("modal.cate.form.header.title.update"),
                    defaultMessage: "Update Category"
                    })
                    : formatMessage({
                    id: getTrad("modal.cate.form.header.title.create"),
                    defaultMessage: "Create new Category"
                    })}
                </Typography>
            </ModalHeader>

            <ModalBody>
                <Box>
                <TextInput
                    label={formatMessage({
                    id: getTrad("modal.cate.form.field.name.label"),
                    defaultMessage: "Name"
                    })}
                    name="category_name"
                    error={first(nameValidation)}
                    onChange={e => {
                      handleValidation({ category_name: e.target.value }, setNameValidation, nameValidation)
                      setName(e.target.value)
                    }}
                    value={category_name}
                />
                </Box>
                <Box paddingTop={4}>
                  <Textarea
                    label={formatMessage({
                      id: getTrad("modal.cate.form.field.description.label"),
                      defaultMessage: "Description"
                    })}
                    name="category_desc"
                    error={first(descValidation)}
                    onChange={e => {
                      handleValidation({ category_desc: e.target.value }, setDescValidation, descValidation)
                      setDesc(e.target.value)
                    }}
                    style={{ minHeight: "200px", height: "auto" }}
                    value={category_desc}
                  />
                </Box>
            </ModalBody> 

            <ModalFooter 
             startActions={
                <Button onClick={() => setShowModal(false)} variant="tertiary">
                  {formatMessage({
                    id: getTrad("modal.cate.form.cta.cancel"),
                    defaultMessage: "Cancel"
                  })}
                </Button>
              }
              endActions={
                (isUpdate)
                  ? <Button type="submit">
                    {formatMessage({
                      id: getTrad("modal.cate.form.cta.update"),
                      defaultMessage: "Update Category"
                    })}
                  </Button>
                  : <Button type="submit">
                    {formatMessage({
                      id: getTrad("modal.cate.form.cta.create"),
                      defaultMessage: "Create new Category"
                    })}
                  </Button>
              }
            />  

        </ModalLayout>
    )
}

const CreateCategoryModal = ({ setShowModal, createCategory, locale }) => <Modal setShowModal={setShowModal} crudAction={createCategory} locale={locale} />
export { CreateCategoryModal }
