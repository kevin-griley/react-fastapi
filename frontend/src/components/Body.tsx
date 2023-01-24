import { AppShell, useMantineTheme } from '@mantine/core';
import { useMediaQuery, useToggle } from '@mantine/hooks';
import { IconUsers } from '@tabler/icons';

import { HeaderSimple } from './header';
import { NavbarSegmented } from './navbar';
import { FooterLinks } from './footer';


interface BodyProps {
    showSidebar: boolean;
    children: React.ReactElement | React.ReactElement[];
  }

export default function Body({ showSidebar, children }: BodyProps ) {
    const theme = useMantineTheme();

    const tabs = [
      { link: "/", label: "Resume", icon: IconUsers },
      { link: "/feed", label: "Feed", icon: IconUsers  },
      { link: "/login", label: "Login", icon: IconUsers  },
    ];

    const navs = [
        { link: "/", label: "Resume" },
        { link: "/feed", label: "Feed" },
        { link: "/login", label: "Login" },
      ];

    const foots =  [ {
          "title": "Resume",
          "links": [
            {
              "label": "Resume",
              "link": "/"
            },
          ] }, {
          "title": "Feed",
          "links": [
            {
              "label": "Feed",
              "link": "/feed"
            },
          ] }, {
          "title": "Login",
          "links": [
            {
              "label": "Login",
              "link": "/login"
            },
          ] } ]    

    const sm = useMediaQuery(`(min-width: ${theme.breakpoints.sm}px)`);
    const [opened, toggle] = useToggle([false, true]);

    return (
      <AppShell
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
          },

        }}

        navbarOffsetBreakpoint = "sm"

        navbar={ showSidebar ? <NavbarSegmented data={ tabs } hideNavbar={ !sm ? !opened : !sm }/> : <></>}

        footer={ !showSidebar ? <FooterLinks data={ foots }/> : <></> }

        header={ <HeaderSimple showSidebar={ showSidebar } burgerOpened={opened} burgerToggle={ toggle } links={ navs }/> }

      >
        { children }

      </AppShell>
    );
}