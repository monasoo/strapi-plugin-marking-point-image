// React
import React, { useState, useEffect, useRef } from "react";
import { useIntl } from "react-intl";

// Strapi
import Plus from "@strapi/icons/Plus";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import {
  Typography,
  Flex,
  Link,
  Pencil,
  LinkButton,
  Badge,
} from "@strapi/design-system";
import { Button } from "@strapi/design-system/Button";
import { EmptyStateLayout } from "@strapi/design-system/EmptyStateLayout";
import {
  Accordion,
  AccordionToggle,
  AccordionContent,
  AccordionGroup,
  Box,
  Avatar,
} from "@strapi/design-system";
import {
  Card,
  CardHeader,
  CardAction,
  CardBody,
  CardContent,
  CardTitle,
} from "@strapi/design-system";
import { Table, Thead, Tbody, Tr, Td, Th } from "@strapi/design-system";
import { Select, Option, Stack, BaseHeaderLayout } from "@strapi/design-system";
// Components
import Illo from "../Illo";
import { MarkImageModal } from "../IamgeModal";

// Utils
import { getTrad } from "../../utils";

// Api
import apiRequests from "../../api";

const Imagelist = ({ locale }) => {
  const ROW_COUNT = 6;
  const COL_COUNT = 10;
  const { formatMessage } = useIntl();

  const [Imagelist, setImagelistData] = useState([]);
  const [Catelist, setCatelistData] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const [currentCate, setCurrentCate] = useState("null");
  const [Prodlist, setProdlistData] = useState([]);

  const [showCreateImageModal, setShowCreateImageModal] = useState(false);

  const setCatelist = async () => {
    const categories = await apiRequests.getCategories(locale);
    setCatelistData(categories);
  };

  const setImagelist = async (currentCate) => {
    setCurrentCate(currentCate);
    const lists = await apiRequests.getImageList(locale, currentCate);

    setIsLoading(true);
    setImagelistData(lists);
    setIsLoading(false);
  };

  const Productlist = async (imgID) => {
    const prod = await apiRequests.getProdInCate(locale, imgID);
    setProdlistData(prod);
  };

  /* useEffect(async () => {
      await setCatelist()
    }, [currentCate]) */

  const createPinImage = async (data) => {
    await apiRequests.createPinOnImage(data.id, data);
    await Productlist(imgID);
  };

  useEffect(async () => {
    await setCatelist();
    await setImagelist(currentCate);
  }, [locale]);

  const isLoading = !!IsLoading;

  const [imgID, setimgID] = useState(null);
  const [expandedID, setExpandedID] = useState(null);
  const handleToggle = (id) => () => {
    setExpandedID((s) => (s === id ? null : id));
    const ID = id.split("-");
    setX(0);
    setY(0);
    Productlist(ID[1]);
    setimgID(ID[1]);
  };

  const [x, setX] = useState();
  const [y, setY] = useState();
  const handleEventClick = (event) => {
    var image = document.getElementById("img");

    var showX = event.nativeEvent.offsetX;
    var showY = event.nativeEvent.offsetY;

    const c = showX / image.clientWidth;
    const left = c * 100 - 2;

    const d = showY / image.clientHeight;
    const top = d * 100 - 4;

    setX(left.toFixed(2));
    setY(top.toFixed(2));

    setShowCreateImageModal(true);
  };

  const handleMouseMove = (event) => {
    setX(event.clientX);
    setY(event.clientY);
  };

  const MrakStyles = (x, y) => {
    const customStyles = {
      background: "green",
      position: "absolute",
      height: "3vw",
      maxHeight: "36px",
      width: "3vw",
      maxWidth: "36px",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      //cursor: "pointer",
      borderRadius: "9999px",
      transitionProperty: "all",
      transitionTimingFunction: "cubic-bezier(.4,0,.2,1)",
    };
    return Object.assign(customStyles, { top: y + "%", left: x + "%" });
  };

  let ImageAccordion = {
    rows: Imagelist.map((list) => {
      return (
        <>
          {list.image_marking_categories.length > 0 && (
            <Accordion
              expanded={expandedID === "acc-" + list.id}
              onToggle={handleToggle("acc-" + list.id)}
              id={"acc-" + list.id}
              size="S"
            >
              <AccordionToggle title={list.image_name} togglePosition="left" />
              <AccordionContent>
                <Box padding={3}>
                  <Card id="first">
                    <CardHeader>
                      <CardAction position="end">
                        <Link
                          to={`/content-manager/collectionType/api::image-marking-image.image-marking-image/${list.id}?plugins[i18n][locale]=${locale}`}
                        >
                          Edit
                        </Link>
                      </CardAction>

                      <CardContent width="100%">
                        {list.image.url !== null && (
                          <img
                            style={{ width: "100%" }}
                            src={list.image.url}
                            onMouseDown={handleEventClick.bind(this)}
                            id={"img"}
                          />
                        )}

                        {Prodlist.map((prod) => {
                          return (
                            <>
                              {prod.image_marking_images.length > 0 && (
                                <div style={MrakStyles(prod.setX, prod.setY)}>
                                  <span>{prod.id}</span>
                                </div>
                              )}
                            </>
                          );
                        })}
                      </CardContent>
                    </CardHeader>
                    <CardBody>
                      <CardContent>
                        <CardTitle>
                          {list.image_desc} Position Last SET X:{" "}
                          {x + "%" ?? "No result"} Y: {y + "%" ?? "No result"}
                        </CardTitle>
                      </CardContent>
                    </CardBody>
                  </Card>
                </Box>

                <Box padding={3}>
                  <Flex
                    justifyContent="center"
                    height="48px"
                    width="100%"
                    background="neutral150"
                  >
                    <Box>
                      <Link
                        startIcon={<Plus />}
                        to={`/content-manager/collectionType/api::image-marking-product.image-marking-product/create?plugins[i18n][locale]=${locale}`}
                      >
                        Add Product
                      </Link>
                    </Box>
                  </Flex>

                  <Table colCount={COL_COUNT} rowCount={ROW_COUNT}>
                    <Thead>
                      <Tr>
                        <Th>
                          <Typography variant="sigma">ID</Typography>
                        </Th>
                        <Th>
                          <Typography variant="sigma">Image</Typography>
                        </Th>
                        <Th>
                          <Typography variant="sigma">Product</Typography>
                        </Th>
                        <Th>
                          <Typography variant="sigma">X,Y</Typography>
                        </Th>
                        <Th>
                          <Typography variant="sigma">Status</Typography>
                        </Th>
                        <Th>
                          <Typography variant="sigma">Action</Typography>
                        </Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {Prodlist.map((prod) => {
                        return (
                          <>
                            {prod.image_marking_images.length > 0 && (
                              <Tr>
                                <Td>
                                  <Typography variant="sigma">
                                    {prod.id}
                                  </Typography>
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
                                    {prod.publishedAt ? (
                                      <Badge size="M" active>
                                        Published
                                      </Badge>
                                    ) : (
                                      <Badge size="M">Draft</Badge>
                                    )}{" "}
                                    |{" "}
                                    {prod.setX ? (
                                      <Badge size="M" active>
                                        PIN
                                      </Badge>
                                    ) : (
                                      <Badge size="M">Not SET</Badge>
                                    )}
                                  </Typography>
                                </Td>
                                <Td>
                                  <Typography variant="sigma">
                                    <Link
                                      to={`/content-manager/collectionType/api::image-marking-product.image-marking-product/${prod.id}?plugins[i18n][locale]=${locale}`}
                                    >
                                      Edit
                                    </Link>
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
              </AccordionContent>
            </Accordion>
          )}
        </>
      );
    }),
  };

  return !isLoading ? (
    <>
      {Imagelist.length === 0 ? (
        <EmptyStateLayout
          icon={<Illo />}
          content={formatMessage({
            id: getTrad("empty.image"),
            defaultMessage: "You don't have any Image yet...",
          })}
          action={
            <Link
              startIcon={<Plus />}
              variant="secondary"
              to={`/content-manager/collectionType/api::image-marking-image.image-marking-image?page=1&pageSize=10&sort=image_name:ASC&plugins[i18n][locale]=${locale}`}
            >
              {formatMessage({
                id: getTrad("empty.image.bt"),
                defaultMessage: "Add your first Image : " + locale,
              })}
            </Link>
          }
          shadow={"none"}
        />
      ) : (
        <Box padding={8} background="neutral0">
          <BaseHeaderLayout
            primaryAction={
              <Stack horizontal spacing={1}>
                <Select
                  id="cate-select"
                  value={currentCate}
                  defaultValue={currentCate}
                  onChange={setImagelist}
                >
                  <Option value={"null"}>{"ALL"}</Option>
                  {Catelist.map((cate, index) => (
                    <Option key={index} value={cate.id}>
                      {cate.category_name}
                    </Option>
                  ))}
                </Select>
              </Stack>
            }
          />

          <AccordionGroup
            footer={
              <Flex
                justifyContent="center"
                height="48px"
                background="neutral150"
              >
                <Link
                  startIcon={<Plus />}
                  to={`/content-manager/collectionType/api::image-marking-image.image-marking-image?page=1&pageSize=10&sort=image_name:ASC&plugins[i18n][locale]=${locale}`}
                >
                  Add & Edit Image
                </Link>
              </Flex>
            }
          >
            {ImageAccordion.rows}
          </AccordionGroup>
        </Box>
      )}

      {showCreateImageModal && (
        <MarkImageModal
          setShowModal={setShowCreateImageModal}
          locale={locale}
          x={x}
          y={y}
          img={expandedID}
          createpin={createPinImage}
        />
      )}
    </>
  ) : (
    <LoadingIndicatorPage />
  );
};
export default Imagelist;
