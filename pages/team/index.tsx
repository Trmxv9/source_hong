import React from "react";
import NavBar from "@/components/Navbar";
import { Card, CardBody, CardFooter, Image, Link } from "@nextui-org/react";
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
  const list = [
    {
      title: "Kaio Trmx",
      img: "/images/founder.jpg",
      job: "Founder",
      link: "https://instagram.com/trmxhn",
    },
  ];
  return (
    <>
      <NavBar user={user} cone={cone} token={token} />
      <center>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-4xl font-bold tracking-tight sm:text-6xl mb-3 relative">
            <h1>Hong APP - {t("navbar.equipe")}</h1>
          </div>
          <p className="mb-5">{t("equipe.titulo")}</p>
          <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
            {list.map((item, index) => (
              <Link href={item.link} target="_blank" key={index}>
                <Card shadow="sm" isPressable>
                  <CardBody className="overflow-visible p-0">
                    <Image
                      shadow="sm"
                      radius="lg"
                      width="100%"
                      alt={item.title}
                      className="w-full object-cover h-[140px]"
                      src={item.img}
                    />
                  </CardBody>
                  <CardFooter className="text-small gap-3 justify-between">
                    <b>{item.title}</b>
                    <p className="text-default-500">{item.job}</p>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
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
