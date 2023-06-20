
// React
import React, { useState, useEffect } from "react"
import { useIntl } from "react-intl"

// Strapi
import Plus from "@strapi/icons/Plus"
import { LoadingIndicatorPage } from "@strapi/helper-plugin"
import { Table, Thead, Tbody, Tr, Td, Th, TFooter } from '@strapi/design-system'; 
import { BaseCheckbox, Typography, VisuallyHidden, Avatar, Flex , Tag, Information,Link, Pencil, CardAsset, Box, Badge} from '@strapi/design-system';
import { Button } from "@strapi/design-system/Button"
import { EmptyStateLayout } from "@strapi/design-system/EmptyStateLayout"

// Lodash
import { truncate } from "lodash"

// Components
import Illo from "../Illo"
import { CreateCategoryModal, UpdateCateegoryModal, DeleteCateegoryModal } from "../CategoryModal"

// Utils
import { getTrad } from "../../utils"

// Api
import apiRequests from "../../api"

const Categorylist = ({ locale }) => {
    const ROW_COUNT = 6;
    const COL_COUNT = 10;
    const { formatMessage } = useIntl()

    const [Catelist, setCatelistData] = useState([])
    const [IsLoading, setIsLoading] = useState(true)

    const [showCreateCateModal, setShowCreateCateModal] = useState(false)

    const setCategorylist = async () => {
        setIsLoading(true)
        const categories = await apiRequests.getCategories(locale) 
        console.log(categories);
        setCatelistData(categories)
        setIsLoading(false)
    }

    const createCategory = async (data) => {
        await apiRequests.createCategory(data)
        await setCategorylist()
    }

    useEffect(async () => {
        await setCategorylist()
    }, [])
    
    useEffect(async () => {
        await setCategorylist()
    }, [locale])
    
    const isLoading = !(!IsLoading)


    let CategoryTable = {
        columns: <>
                <Th>
                    <Typography variant="sigma">
                    {formatMessage({
                        id: getTrad("modal.mark.form.field.image.label"),
                        defaultMessage: "IMAGE"
                    })}
                    </Typography>
                </Th>
                <Th>
                    <Typography variant="sigma">
                    {formatMessage({
                        id: getTrad("modal.mark.form.field.name.label"),
                        defaultMessage: "CATEGORY_NAME"
                    })}
                    </Typography>
                </Th>
                <Th>
                    <Typography variant="sigma">
                    {formatMessage({
                        id: getTrad("modal.mark.form.field.description.label"),
                        defaultMessage: "CATEGORY_DESC"
                    })}
                    </Typography>
                </Th>
                <Th>
                    <Typography variant="sigma">
                    {formatMessage({
                        id: getTrad("modal.mark.form.field.update.label"),
                        defaultMessage: "UPDATED_AT"
                    })}
                    </Typography>
                </Th>
                <Th>
                    <Typography variant="sigma">
                    {formatMessage({
                        id: getTrad("modal.mark.form.field.state.label"),
                        defaultMessage: "STATE"
                    })}
                    </Typography>
                </Th>
                <Th>
                    <Typography variant="sigma">
                    {formatMessage({
                        id: getTrad("modal.mark.form.field.action.label"),
                        defaultMessage: "Action"
                    })}
                    </Typography>
                </Th>
            </>,

            rows: Catelist.map((category) => {
                return (
                <Tr key={category.id}>
                    <Td>
                        {category.category_image.url !== null &&
                            <Avatar src={category.category_image.url} alt="marvin frachet" preview />
                        }
                    </Td>
                    <Td>
                    <Typography textColor="neutral800">{truncate(category.category_name, { length: 50 })}</Typography>
                    </Td>
                    <Td>
                    <Typography textColor="neutral800">{truncate(category.category_desc, { length: 50 })}</Typography>
                    </Td>
                    <Td>
                    <Typography textColor="neutral800">{truncate(category.updatedAt, { length: 50 })}</Typography>
                    </Td>
                    <Td>
                    <Typography textColor="neutral800">
                        {category.publishedAt !== null ? (
                            <Badge size="M" active>Published</Badge>
                        ) : (  
                            <Badge size="M">Draft</Badge>
                        )
                        }
                    </Typography>
                    </Td>

                    <Td>
                    <Typography textColor="neutral800">
                        <Link to={`/content-manager/collectionType/api::image-marking-category.image-marking-category/${category.id}?plugins[i18n][locale]=${locale}`} >Edit</Link>
                    </Typography>
                    </Td>
                </Tr>
                )
            })
    }

    return (
        (!isLoading) ? (
            <>
            {Catelist.length === 0 ? (
           
                <EmptyStateLayout
                    icon={<Illo />}
                    content={formatMessage({
                    id: getTrad("empty.cate"),
                    defaultMessage: "You don't have any Category yet..."
                    })}
                    action={
                        <Link
                        startIcon={<Plus />}
                        variant="secondary"
                        to={`/content-manager/collectionType/api::image-marking-category.image-marking-category?page=1&pageSize=10&sort=category_name:ASC&plugins[i18n][locale]=${locale}`}
                        >{formatMessage({
                        id: getTrad("empty.image.bt"),
                        defaultMessage: "Add your first Image : " + locale
                        })}</Link>
                    }
                    shadow={"none"}
                />
            ) : (  
            <Table colCount={COL_COUNT} rowCount={ROW_COUNT} footer={<TFooter icon={<Plus />}>{<Link to={`/content-manager/collectionType/api::image-marking-category.image-marking-category?page=1&pageSize=10&sort=category_name:ASC&plugins[i18n][locale]=${locale}`}>Add & Edit</Link>}</TFooter>}>
                <Thead>
                <Tr>
                    {CategoryTable.columns}
                </Tr>
                </Thead>
                <Tbody>
                    {CategoryTable.rows}
                </Tbody>
            </Table>
            )}

        {showCreateCateModal && <CreateCategoryModal setShowModal={setShowCreateCateModal} createCategory={createCategory} locale={locale} />}
         </>
        
        ) : (
            <LoadingIndicatorPage />
        )
    )
}
export default Categorylist
