// React
import React, { memo, useState, useEffect } from "react"
import { useIntl } from "react-intl"

// design-system
import { LoadingIndicatorPage } from "@strapi/helper-plugin"
import { BaseHeaderLayout, Stack} from '@strapi/design-system';
import { Select, Option } from "@strapi/design-system/Select"

// Utils
import { getTrad } from "../../utils"

// Api
import apiRequests from "../../api"

const Header = () => {
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
        ) : (
            <LoadingIndicatorPage />
        )  
    );
}
export default Header;