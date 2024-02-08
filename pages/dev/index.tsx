import React from "react";
import { Accordion, AccordionItem, Snippet, Link } from "@nextui-org/react";
import NavBar from "@/components/Navbar";
import { parse } from "cookie";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useTranslation } from "react-i18next";

interface DevProps {
  user: {
    username: string;
    avatar: string;
    id: string;
  } | null;
  cone: any;
  token: string | null;
}

const Dev: React.FC<DevProps> = ({ user, cone, token }) => {
  const { t } = useTranslation();
  return (
    <>
      <NavBar user={user} cone={cone} token={token} />
      <center>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-4xl font-bold tracking-tight sm:text-6xl mb-3 relative">
            <h1>Hong APP - Dev</h1>
          </div>
          <p>{t("dev.titulo")}</p>

          <Accordion
            motionProps={{
              variants: {
                enter: {
                  y: 0,
                  opacity: 1,
                  height: "auto",
                  transition: {
                    height: {
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      duration: 1,
                    },
                    opacity: {
                      easings: "ease",
                      duration: 1,
                    },
                  },
                },
                exit: {
                  y: -10,
                  opacity: 0,
                  height: 0,
                  transition: {
                    height: {
                      easings: "ease",
                      duration: 0.25,
                    },
                    opacity: {
                      easings: "ease",
                      duration: 0.3,
                    },
                  },
                },
              },
            }}
          >
            <AccordionItem key="1" aria-label="Next.js" title="Next.js">
              <p className="mb-4">{t("dev.ac.titulo1")}</p>
              <Snippet>npx create-next-app@latest</Snippet>
              <div className="mt-4">
                <Link
                  isBlock
                  showAnchorIcon
                  target="_blank"
                  href="https://nextjs.org/docs/getting-started/installation"
                  color="success"
                >
                  {t("saiba_mais")}
                </Link>
              </div>
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="NextUI"
              title="NextUI & Frame Motion"
            >
              <p className="mb-4">{t("dev.ac.titulo2")}</p>
              <Snippet>npm i @nextui-org/react framer-motion</Snippet>
              <div className="mt-4">
                <Link
                  isBlock
                  showAnchorIcon
                  target="_blank"
                  href="https://nextui.org/docs/guide/installation"
                  color="success"
                >
                  {t("saiba_mais")}
                </Link>
              </div>
            </AccordionItem>
            <AccordionItem key="3" aria-label="TMDB - Key" title="TMDB - Key">
              <div className="mt-4">
                <Link
                  isBlock
                  showAnchorIcon
                  target="_blank"
                  href="https://developer.themoviedb.org/docs/getting-started"
                  color="success"
                >
                  {t("saiba_mais")}
                </Link>
              </div>
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

export default Dev;
