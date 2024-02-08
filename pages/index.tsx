import React from "react";
import NavBar from "@/components/Navbar";
import { motion, HTMLMotionProps } from "framer-motion";
import {
  Chip,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  User,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { parse } from "cookie";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useTranslation } from "react-i18next";
import LanguageSelector from "@/components/LanguageSelector";
import swal from "sweetalert";

const childVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1 },
};

interface CardWithMotionProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

const CardWithMotion: React.FC<CardWithMotionProps> = ({
  children,
  ...rest
}) => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.3 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div variants={cardVariants} {...rest}>
      {children}
    </motion.div>
  );
};

const textVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delay: 0.5, duration: 0.2 } },
};

interface HomeProps {
  user: {
    username: string;
    avatar: string;
    id: string;
  } | null;
  cone: any;
  token: string | null;
}

const Home: React.FC<HomeProps> = ({ user, cone, token }) => {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  (lang: string | undefined) => {
    i18n.changeLanguage(lang);
  };

  const handleDropdownItemClick = () => {
    return swal({
      title: "Donate no PIX",
      text: "f424ad61-8ebe-4f83-8d3a-651ae5d80199",
    });
  };

  return (
    <>
      <NavBar user={user} cone={cone} token={token} />

      <center>
        <LanguageSelector />
        <div className="mx-auto max-w-2xl py-32 sm:py-32 lg:py-32">
          <div className="text-4xl font-bold tracking-tight sm:text-6xl mb-5 relative">
            <motion.h1 variants={textVariants}>Hong APP</motion.h1>
          </div>
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <motion.div
              className="relative rounded-full px-3 py-1 text-sm leading-6 text-[#fff] ring-1 ring-[#dbdbdb] hover:ring-[#aaa]"
              variants={childVariants}
            >
              {t("index.aviso")}
              <a href="/blog" className="font-semibold ml-2 text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                {t("leia_mais")} <span aria-hidden="true">&rarr;</span>
              </a>
            </motion.div>
          </div>

          <CardWithMotion
            className="max-w-[400px]"
            initial={{ scale: 0 }}
            animate={{
              x: 0,
              y: 0,
              scale: 1,
              rotate: 2,
            }}
          >
            {" "}
            <Card className="max-w-[400px]">
              <CardHeader className="flex gap-3">
                <User
                  name="Hong APP"
                  description={
                    <Link
                      href="https://instagram.com/hong.app"
                      size="sm"
                      target="_blank"
                      color="secondary"
                      isExternal
                    >
                      @hong.app
                    </Link>
                  }
                  avatarProps={{
                    src: "/icons/apple-touch-icon.png",
                  }}
                />
              </CardHeader>
              <Divider />
              <CardBody>
                <blockquote className="mb-3">
                  {t("index.nosso_site")}
                </blockquote>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-3">
                  <motion.div
                    className="relative inline-block"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ delay: 0.2, duration: 0.2 }}
                  >
                    <a href="https://nextjs.org/" target="_blank">
                      <Chip
                        variant="shadow"
                        classNames={{
                          base: "ml-1 bg-gradient-to-br from-indigo-500 to-black border-small border-white/50 ",
                          content: "drop-shadow shadow-black text-white",
                        }}
                      >
                        Next.js
                      </Chip>
                    </a>
                  </motion.div>

                  <motion.div
                    className="relative inline-block"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ delay: 0.3, duration: 0.2 }}
                  >
                    <a href="https://nextui.org/" target="_blank">
                      <Chip
                        variant="shadow"
                        classNames={{
                          base: "ml-1 bg-gradient-to-br from-indigo-500 to-black border-small border-white/50 ",
                          content: "drop-shadow shadow-black text-white",
                        }}
                      >
                        NextUI
                      </Chip>
                    </a>
                  </motion.div>

                  <motion.div
                    className="relative inline-block"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ delay: 0.4, duration: 0.2 }}
                  >
                    <a href="https://www.framer.com/motion/" target="_blank">
                      <Chip
                        variant="shadow"
                        classNames={{
                          base: "ml-1 bg-gradient-to-br from-indigo-500 to-black border-small border-white/50 ",
                          content: "drop-shadow shadow-black text-white",
                        }}
                      >
                        Framer Motion
                      </Chip>
                    </a>
                  </motion.div>

                  <motion.div
                    className="relative inline-block"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ delay: 0.5, duration: 0.2 }}
                  >
                    <a href="https://tailwindui.com/" target="_blank">
                      <Chip
                        variant="shadow"
                        classNames={{
                          base: "ml-1 bg-gradient-to-br from-indigo-500 to-black border-small border-white/50 ",
                          content: "drop-shadow shadow-black text-white",
                        }}
                      >
                        Tailwind CSS
                      </Chip>
                    </a>
                  </motion.div>
                  <motion.div
                    className="relative inline-block"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ delay: 0.5, duration: 0.2 }}
                  >
                    <a
                      href="https://discord.com/developers/docs/intro"
                      target="_blank"
                    >
                      <Chip
                        variant="shadow"
                        classNames={{
                          base: "ml-1 bg-gradient-to-br from-indigo-500 to-black border-small border-white/50 ",
                          content: "drop-shadow shadow-black text-white",
                        }}
                      >
                        Discord
                      </Chip>
                    </a>
                  </motion.div>
                  <motion.div
                    className="relative inline-block"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ delay: 0.5, duration: 0.2 }}
                  >
                    <a href="https://www.themoviedb.org/" target="_blank">
                      <Chip
                        variant="shadow"
                        classNames={{
                          base: "ml-1 bg-gradient-to-br from-indigo-500 to-black border-small border-white/50 ",
                          content: "drop-shadow shadow-black text-white",
                        }}
                      >
                        TMDB
                      </Chip>
                    </a>
                  </motion.div>
                </div>
              </CardBody>
              <Divider />
              <CardFooter className="gap-3">
                <Button
                  href="/dev"
                  as={Link}
                  color="primary"
                  showAnchorIcon
                  variant="solid"
                >
                  {t("btn_index.comece")}
                </Button>
                <Dropdown backdrop="blur" className="float-left">
                  <DropdownTrigger>
                    <Button
                      variant="solid"
                      color="danger"
                      startContent={
                        <i className="fa-duotone fa-heart fa-lg"></i>
                      }
                    >
                      {t("btn_index.doar")}
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu variant="faded" aria-label="Static Actions">
                    <DropdownItem
                      href="https://patreon.com/HongAPP"
                      target="_blank"
                      startContent={<i className="fab fa-patreon fa-lg"></i>}
                    >
                      Patreon
                    </DropdownItem>
                    <DropdownItem
                      startContent={<i className="fas fa-coins fa-lg"></i>}
                      onClick={handleDropdownItemClick}
                    >
                      Pix (Brazil)
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
                <Dropdown backdrop="blur" className="float-left">
                  <DropdownTrigger>
                    <Button variant="bordered">{t("btn_index.contato")}</Button>
                  </DropdownTrigger>
                  <DropdownMenu variant="faded" aria-label="Static Actions">
                    <DropdownItem
                      href="https://www.instagram.com/hong.app"
                      target="_blank"
                      startContent={
                        <i className="fa-brands fa-instagram fa-lg"></i>
                      }
                    >
                      Instagram
                    </DropdownItem>
                    <DropdownItem
                      href="https://discord.gg/uR4bHE7CQt"
                      target="_blank"
                      startContent={
                        <i className="fa-brands fa-discord fa-lg"></i>
                      }
                    >
                      Discord
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </CardFooter>
            </Card>{" "}
          </CardWithMotion>
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

export default Home;
