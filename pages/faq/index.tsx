import React from "react";
import NavBar from "@/components/Navbar";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { parse } from "cookie";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useTranslation } from "react-i18next";

interface FaqProps {
  user: {
    username: string;
    avatar: string;
    id: string;
  } | null;
  cone: any;
  token: string | null;
}

const Faq: React.FC<FaqProps> = ({ user, cone, token }) => {
  const itemClasses = {
    base: "py-0 w-full",
    title: "font-normal text-medium",
    trigger:
      "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
    indicator: "text-medium",
    content: "text-small px-2",
  };

  const { t } = useTranslation();

  return (
    <>
      <NavBar user={user} cone={cone} token={token} />
      <center>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-4xl font-bold tracking-tight sm:text-6xl mb-3 relative">
            <h1>Hong APP - FAQ</h1>
          </div>
          <p className="mb-5">{t("faq.subtitle")}</p>
          <Accordion
            showDivider={false}
            className="p-2 flex flex-col gap-1 w-full max-w-[300px]"
            variant="shadow"
            itemClasses={itemClasses}
          >
            <AccordionItem
              key="1"
              aria-label={`${t("faq.titulo")}`}
              startContent={<i className="fa-solid fa-user-shield"></i>}
              subtitle={<p className="flex">{t("faq.sub1")}</p>}
              title={`${t("faq.titulo")}`}
            >
              <blockquote>{t("faq.conteudo1")}</blockquote>
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label={`${t("faq.titulo2")}`}
              startContent={<i className="fas fa-lock-alt"></i>}
              subtitle={`${t("faq.sub2")}`}
              title={`${t("faq.titulo2")}`}
            >
              <blockquote>{t("faq.conteudo2")}</blockquote>
            </AccordionItem>
          </Accordion>
        </div>
      </center>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookies = parse(context.req.headers.cookie || "");
  const user = cookies.discordUser
    ? JSON.parse(decodeURIComponent(cookies.discordUser))
    : null;
  const cone = cookies.discordCone
    ? JSON.parse(decodeURIComponent(cookies.discordCone))
    : null;
  const token = cookies.discordToken || null;

  return {
    props: {
      user,
      cone,
      token,
    },
  };
};

export default Faq;
