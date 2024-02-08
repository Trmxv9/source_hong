import React from "react";
import NavBar from "@/components/Navbar";
import {
  User,
  Link,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { parse } from "cookie";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useTranslation } from "react-i18next";

interface EquipeProps {
  user: {
    username: string;
    avatar: string;
    id: string;
  } | null;
  cone: any;
  token: string | null;
}

const Equipe: React.FC<EquipeProps> = ({ user, cone, token }) => {
  const { t } = useTranslation();

  return (
    <>
      <NavBar user={user} cone={cone} token={token} />
      <center>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-4xl font-bold tracking-tight sm:text-6xl mb-3 relative">
            <h1>Hong APP - {t("blog.page")}</h1>
          </div>
          <p className="mb-5">{t("blog.title")}</p>

          <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3">
              <User
                name="Kaio Trmx"
                description={
                  <Link
                    href="https://instagram.com/trmxhn"
                    size="sm"
                    target="_blank"
                    color="secondary"
                    isExternal
                  >
                    @trmxhn
                  </Link>
                }
                avatarProps={{
                  src: "/images/founder.jpg",
                }}
              />
            </CardHeader>
            <Divider />
            <CardBody>
              <blockquote>{t("blog.text")}</blockquote>
            </CardBody>
            <Divider />
            <CardFooter>
              <Link
                isExternal
                showAnchorIcon
                href="https://github.com/Trmxv9/source_hong"
              >
                {t("blog.source")}
              </Link>
            </CardFooter>
          </Card>
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

export default Equipe;
