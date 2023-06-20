import React, { memo, useState, useEffect } from 'react';
import { useIntl } from "react-intl"

// design-system
import { LoadingIndicatorPage } from "@strapi/helper-plugin"
import { Plus, IconButton, Pencil, Trash } from "@strapi/icons"
import { BaseHeaderLayout, Layout , Button, Box, ContentLayout, Stack} from '@strapi/design-system';
import { Select, Option } from "@strapi/design-system/Select"
import { Tabs, Tab, TabGroup, TabPanels, TabPanel } from "@strapi/design-system/Tabs"

// components
import Imagelist from "../../components/imagelist"
import Category from "../../components/Category"
import Header from "../../components/header"
// Utils
import { getTrad } from "../../utils"
// Api
import apiRequests from "../../api"


const HomePage = () => {
 /*  const [IsLoading, setIsLoading] = useState(true)
  const [locales, setLocales] = useState([])
  const [currentLocale, setCurrentLocale] = useState(null)

  const getLocales = async () => {
    const locales = await apiRequests.getLocales()
    const defaultLocale = locales.filter(locale => locale.isDefault)[0]
    setLocales(locales)
    setCurrentLocale(defaultLocale.code)
    setIsLoading(false)
  }

  useEffect(async () => {
    await getLocales()
  }, [])

  const isLoading = !(!IsLoading) */

  const { formatMessage } = useIntl();
  const [config, setConfig] = useState([])
  const [locales, setLocales] = useState([])
  const [currentLocale, setCurrentLocale] = useState(null)
  const [configIsLoading, setConfigIsLoading] = useState(true)
  const [localeIsLoading, setLocaleIsLoading] = useState(true)

  const getLocales = async () => {
    const locales = await apiRequests.getLocales()
    const defaultLocale = locales.filter(locale => locale.isDefault)[0]
    setLocales(locales)
    setCurrentLocale(defaultLocale.code)
    setLocaleIsLoading(false)
  }

  const getConfig = async () => {
    const config = await apiRequests.getConfig()
    setConfig(config)
    setConfigIsLoading(false)
  }

  useEffect(async () => {
    await getConfig()
    await getLocales()
  }, [])

  const isLoading = !(!configIsLoading && !localeIsLoading)

  return (
    (!isLoading) ? (
    <>
    <Layout>
      {/* <Header /> */}
      <BaseHeaderLayout 
            title="Image Marking"
            primaryAction={
            <Stack horizontal spacing={4}>
              {(config.localization) && (
              <Select
                id="lang-select"
                value={currentLocale}
                defaultValue={currentLocale}
                onChange={setCurrentLocale}
                >
                {locales.map((locale, index) => (
                  <Option key={index} value={locale.code}>{locale.code.toUpperCase()}</Option>
                ))}
              </Select>
              )}
            </Stack>}
        />

      <ContentLayout>
        <TabGroup id="tabs" label={"Overview"}>
            <Tabs>
              <Tab>
                {formatMessage({
                  id: getTrad("tab.image"),
                  defaultMessage: "Image Marking"
                })}
              </Tab>
              <Tab>
                {formatMessage({
                  id: getTrad("tab.cate"),
                  defaultMessage: "Category"
                })}
              </Tab>
            </Tabs>

          <TabPanels>  
            <TabPanel>    
              <Box background="neutral100" >
                <Imagelist locale={currentLocale} />
              </Box>
            </TabPanel>
            <TabPanel>    
              <Box background="neutral100">
                <Category locale={currentLocale} />
              </Box>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </ContentLayout>
    </Layout>
    </>
    ) : (
      <LoadingIndicatorPage />
    )  
  );
};

export default memo(HomePage);
