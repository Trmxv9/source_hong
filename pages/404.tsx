import React from "react";
import { useRouter } from "next/router";
import { Button, Chip } from "@nextui-org/react";
import { useTranslation } from "react-i18next";

const Custom404 = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const handleVoltar = () => {
    router.back();
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-6xl font-bold  mb-4">{t("error.404")}</h1>
          <div className="mb-8">
            <h1 className="font-bold  text-6xl mb-5">
              <i className="fas fa-sad-tear text-orange-200  fa-lg"></i>
            </h1>{" "}
            <Chip
              variant="shadow"
              classNames={{
                base: "bg-gradient-to-br from-indigo-500 text-lg mr-2 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                content: "drop-shadow shadow-black text-white",
              }}
            >
              {t("error.pageNotFound")}
            </Chip>
          </div>
          <Button onClick={handleVoltar} color="danger" variant="shadow">
            {t("error.returnHome")}
          </Button>
        </div>
      </div>
    </>
  );
};

export default Custom404;
