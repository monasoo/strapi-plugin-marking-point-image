// React
import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";

// Strapi
import { Dialog, DialogBody, DialogFooter } from "@strapi/design-system/Dialog";
import {
  Accordion,
  AccordionToggle,
  AccordionContent,
} from "@strapi/design-system/Accordion";
import { Table, Thead, Tbody, Tr, Td, Th } from "@strapi/design-system/Table";
import { Divider } from "@strapi/design-system/Divider";
import { Stack } from "@strapi/design-system/Stack";
import Trash from "@strapi/icons/Trash";
import { Flex } from "@strapi/design-system/Flex";
import ExclamationMarkCircle from "@strapi/icons/ExclamationMarkCircle";
import {
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Typography,
  Button,
  TextInput,
  Textarea,
  Box,
  Alert,
  Avatar,
  Badge,
} from "@strapi/design-system";
import { Radio, RadioGroup } from "@strapi/design-system";

// Lodash
import { isNull, first } from "lodash";

// Utils
import { getTrad } from "../../utils";

// Api
import apiRequests from "../../api";

// Validation Schema
import validationSchema from "./validation";

const Modal = ({
  setShowModal,
  image = {},
  locale = null,
  x = null,
  y = null,
  img = null,
  crudAction,
}) => {
  const { formatMessage } = useIntl();
  const [selected, setSelected] = useState();
  const isUpdate = Object.keys(image).length > 0;

  const [imgID, setimgID] = useState(null);
  const [Prod, setProd] = useState([]);
  const [Bt, setBt] = useState(false);

  const getProduct = async () => {
    const ID = img.split("-");
    console.log(ID);
    setimgID(parseInt(ID[1]));
    const product = await apiRequests.getProdInCate(locale, ID[1]);
    console.log(product);
    setProd(product);
  };

  useEffect(async () => {
    await getProduct();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    //alert("Position SET : " + ID[1]);
    console.log(selected);

    if (await validateFields()) {
      const fields = {
        setX: x,
        setY: y,
        imgID: imgID,
        locale: locale,
      };
      try {
        await crudAction(
          selected ? { id: parseInt(selected), ...fields } : { ...fields }
        );
        setShowModal(false);
      } catch (e) {
        console.log("error", e);
      }
    }
  };

  const validateFields = async () => {
    const fields = {
      setX: x,
      setY: y,
      ID: imgID,
      locale: locale,
    };
    const validationSuccess = await validationSchema(formatMessage)
      .isValid(fields)
      .then((valid) => valid);
    if (!validationSuccess) {
      alert("error select x,y");
    }
    return validationSuccess;
  };

  return (
    <ModalLayout
      onClose={() => setShowModal(false)}
      labelledBy="title"
      as="form"
      onSubmit={handleSubmit}
    >
      <ModalHeader>
        <Typography fontWeight="bold" textColor="neutral800" as="h2" id="title">
          {isUpdate
            ? formatMessage({
                id: getTrad("modal.image.form.header.title.update"),
                defaultMessage: "Select Product ",
              })
            : formatMessage({
                id: getTrad("modal.image.form.header.title.create"),
                defaultMessage: "Select Product ",
              })}
          {imgID} Position SET X: {x}% Y: {y}%
        </Typography>
      </ModalHeader>

      <ModalBody>
        <Box>
          <Table>
            <Thead>
              <Tr>
                <Th>
                  <Typography variant="sigma">Select Product</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">ID</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Image</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Product Name</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">x,y</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Status</Typography>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {Prod.map((prod) => {

                return (
                  <>
                    {prod.image_marking_images.length > 0 && (
                      <Tr>
                        <Td>
                          <Typography variant="sigma">
                            {
                              <input
                                type="radio"
                                onChange={(e) => setSelected(e.target.value)}
                                id={prod.id}
                                value={prod.id}
                                name="radio-buttons"
                              />
                            }
                          </Typography>
                        </Td>
                        <Td>
                          <Typography variant="sigma">{prod.id}</Typography>
                        </Td>
                        <Td>
                          <Typography variant="sigma">
                            {prod.product_image !== null && (
                              <Avatar
                                src={prod.product_image[0].url}
                                alt="marvin frachet"
                                preview
                              />
                            )}
                          </Typography>
                        </Td>
                        <Td>
                          <Typography variant="sigma">
                            {prod.product_name}
                          </Typography>
                        </Td>
                        <Td>
                          <Typography variant="sigma">
                            {prod.setX + "%" ?? "null"} ,{" "}
                            {prod.setY + "%" ?? "null"}
                          </Typography>
                        </Td>
                        <Td>
                          <Typography variant="sigma">
                          {prod.publishedAt ? (<Badge size="M" active>Published</Badge>) : (<Badge size="M">Draft</Badge>)} | {prod.setX > 0 || prod.setY > 0 ? <Badge size="M" active>PIN</Badge> : <Badge size="M">Not SET</Badge>}
                          </Typography>
                        </Td>
                      </Tr>
                    )}
                  </>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      </ModalBody>

      <ModalFooter
        startActions={
          <Button onClick={() => setShowModal(false)} variant="tertiary">
            {formatMessage({
              id: getTrad("modal.image.form.cta.cancel"),
              defaultMessage: "Cancel",
            })}
          </Button>
        }
        endActions={
            <>
            {Prod.length > 0 && (
            <Button type="submit">
              {formatMessage({
                id: getTrad("modal.image.form.cta.create"),
                defaultMessage: "Pin On Image",
              })}
            </Button>
            )}
            </>
        }
      />
    </ModalLayout>
  );
};

const MarkImageModal = ({ setShowModal, locale, x, y, img, createpin }) => (
  <Modal
    setShowModal={setShowModal}
    locale={locale}
    x={x}
    y={y}
    img={img}
    crudAction={createpin}
  />
);
export { MarkImageModal };
