import { useState } from "react";
import { motion } from "framer-motion";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  Avatar,
  Button,
} from "@nextui-org/react";
import { parse } from "cookie";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useTranslation } from "react-i18next";

interface NavBarProps {
  user: {
    username: string;
    avatar: string;
    id: string;
  } | null;
  cone: any;
  token: string | null;
}

const NavBar: React.FC<NavBarProps> = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { t } = useTranslation();

  const icon = {
    hidden: {
      pathLength: 0,
      fill: "rgba(255, 255, 255, 0)",
    },
    visible: {
      pathLength: 1,
      fill: "rgba(255, 255, 255, 0)",
    },
  };

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className=" sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      {/* MENU Android  */}
      <NavbarContent className="sm:hidden pr-3" justify="center">
        <a href="/">
          {" "}
          <NavbarBrand>
            <div className="container flex">
              {/* Letter H  */}
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className="item max-w-[40px]"
              >
                <motion.path
                  d="M 20,10 L 20,90 M 80,10 L 80,90 M 20,50 L 80,50"
                  variants={icon}
                  initial="hidden"
                  strokeWidth="5"
                  animate="visible"
                  transition={{
                    default: { duration: 2, ease: "easeInOut" },
                    fill: { duration: 2, ease: [1, 0, 0.8, 1] },
                  }}
                />
              </motion.svg>
              {/* Letter N  */}
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className="item max-w-[40px]"
              >
                <motion.path
                  d="M 20,10 L 20,90 M 20,10 L 70,90 M 70,10 L 70,90"
                  variants={icon}
                  initial="hidden"
                  animate="visible"
                  strokeWidth="5"
                  className="bg-transparent"
                  transition={{
                    default: { duration: 2, ease: "easeInOut" },
                    fill: { duration: 2, ease: [1, 0, 0.8, 1] },
                  }}
                />
              </motion.svg>
            </div>
          </NavbarBrand>
        </a>
      </NavbarContent>
      <NavbarContent className="sm:hidden gap-4" justify="end">
        {user ? (
          <Avatar
            isBordered
            color="success"
            src={`https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png`}
          />
        ) : null}
      </NavbarContent>

      {/* MENU PC  */}
      <NavbarContent className=" hidden sm:flex gap-4" justify="center">
        <a href="/">
          <NavbarBrand>
            <div className="container flex">
              {/* Letter H  */}
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className="item max-w-[40px]"
              >
                <motion.path
                  d="M 20,10 L 20,90 M 80,10 L 80,90 M 20,50 L 80,50"
                  variants={icon}
                  initial="hidden"
                  strokeWidth="5"
                  animate="visible"
                  transition={{
                    default: { duration: 2, ease: "easeInOut" },
                    fill: { duration: 2, ease: [1, 0, 0.8, 1] },
                  }}
                />
              </motion.svg>
              {/* Letter N  */}
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                className="item max-w-[40px]"
              >
                <motion.path
                  d="M 20,10 L 20,90 M 20,10 L 70,90 M 70,10 L 70,90"
                  variants={icon}
                  initial="hidden"
                  animate="visible"
                  strokeWidth="5"
                  className="bg-transparent"
                  transition={{
                    default: { duration: 2, ease: "easeInOut" },
                    fill: { duration: 2, ease: [1, 0, 0.8, 1] },
                  }}
                />
              </motion.svg>
            </div>
          </NavbarBrand>
        </a>

        <NavbarItem>
          <Link color="foreground" href="/tv" aria-current="page">
            <i className="fa-solid fa-popcorn mr-2"></i>
            TV
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="secondary" href="/faq" aria-current="page">
            <i className="fa-solid fa-circle-info mr-2"></i>
            FAQ
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/team">
            <i className="fa-solid fa-users-gear mr-2"></i>
            {t("navbar.equipe")}
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className=" hidden sm:flex gap-4" justify="end">
        {user ? (
          <Avatar
            isBordered
            color="success"
            src={`https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png`}
          />
        ) : null}
        {user ? (
          <Button
            as={Link}
            color="warning"
            href="../../../api/auth/logout"
            variant="flat"
            startContent={
              <i className="fa-solid fa-arrow-up-left-from-circle"></i>
            }
          >
            {t("navbar.btn.logout")}
          </Button>
        ) : (
          <Button
            as={Link}
            color="success"
            href="https://discord.com/api/oauth2/authorize?client_id=1035175376877522954&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback&scope=identify+email+guilds.join+guilds+connections"
            variant="flat"
            startContent={<i className="fa-brands fa-discord "></i>}
          >
            {t("navbar.btn.login")}
          </Button>
        )}
      </NavbarContent>

      {/* MENU Android  */}
      <NavbarMenu>
        <NavbarMenuItem className="grid gap-3">
          <Button
            href="/tv"
            as={Link}
            color="primary"
            showAnchorIcon
            variant="solid"
          >
            TV
          </Button>

          <Button
            href="/faq"
            as={Link}
            color="primary"
            showAnchorIcon
            variant="solid"
          >
            FAQ
          </Button>

          <Button
            href="/equipe"
            as={Link}
            color="primary"
            showAnchorIcon
            variant="solid"
          >
            {t("navbar.equipe")}
          </Button>

          {user ? (
            <Button
              as={Link}
              color="warning"
              href="../../../api/auth/logout"
              variant="flat"
              startContent={
                <i className="fa-solid fa-arrow-up-left-from-circle"></i>
              }
            >
              {t("navbar.btn.logout")}
            </Button>
          ) : (
            <Button
              as={Link}
              color="success"
              href="https://discord.com/api/oauth2/authorize?client_id=1035175376877522954&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fcallback&scope=identify+email+guilds.join+guilds+connections"
              variant="flat"
              startContent={<i className="fa-brands fa-discord"></i>}
            >
              {t("navbar.btn.login")}
            </Button>
          )}
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
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

export default NavBar;
