//  Important Notice:
//  This code snippet serves as a login validator for Discord integration.
//  If Discord authentication is not required for your project, feel free to delete
//  this code block. However, if you intend to use Discord login, it is crucial to keep
//  this part of the code to ensure proper functionality.
//  Make sure to fully understand the implications of removing this block before making any decision.
//  For information on setting up and using Discord login, refer to the relevant documentation.
//  Keep this code section up-to-date as needed to ensure compatibility with future updates.
//  Any questions or issues related to this specific code section can be clarified
//  by contacting the development team or consulting additional resources.
//  Thank you for your attention and happy coding!

import React from "react";
import {
  CircularProgress,
  Card,
  CardBody,
  CardFooter,
  Chip,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function Redi() {
  const router = useRouter();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));

      if (value >= 90) {
        router.push("/");
      }
    }, 200);

    return () => clearInterval(interval);
  }, [value, router]);

  const { t } = useTranslation();

  return (
    <>
      <center>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <Card className="w-[240px] h-[240px] border-none bg-gradient-to-br from-violet-500 to-fuchsia-500">
            <CardBody className="justify-center items-center pb-0">
              <CircularProgress
                classNames={{
                  svg: "w-36 h-36 drop-shadow-md",
                  indicator: "stroke-success",
                  track: "stroke-white/10",
                  value: "text-3xl font-semibold text-white",
                }}
                value={value}
                strokeWidth={4}
                showValueLabel={true}
              />
            </CardBody>
            <CardFooter className="justify-center items-center pt-0">
              <Chip
                classNames={{
                  base: "border-1 border-white/30",
                  content: "text-white/90 text-lg font-semibold",
                }}
                variant="bordered"
              >
                {t("redi.ok")}
              </Chip>
            </CardFooter>
          </Card>
        </div>
      </center>
    </>
  );
}
