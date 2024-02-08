import React from "react";
import { Select, SelectItem, Avatar } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string | undefined) => {
    if (lang) {
      i18n.changeLanguage(lang);
      localStorage.setItem("preferredLanguage", lang);
    }
  };

  const { t } = useTranslation();

  return (
    <div>
      <Select className="max-w-xs mt-5" label={`${t("idioma.titulo")}`}>
        <SelectItem
          key="pt"
          onClick={() => changeLanguage("pt")}
          startContent={
            <Avatar
              alt="pt"
              className="w-6 h-6"
              src="https://flagcdn.com/br.svg"
            />
          }
        >
          {t("idioma.pt")}
        </SelectItem>
        <SelectItem
          key="en"
          onClick={() => changeLanguage("en")}
          startContent={
            <Avatar
              alt="en"
              className="w-6 h-6"
              src="https://flagcdn.com/us.svg"
            />
          }
        >
          {t("idioma.en")}
        </SelectItem>
      </Select>
    </div>
  );
};

export default LanguageSelector;
