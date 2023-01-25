import { useState } from 'react';
import { createStyles, Header, Group, Burger, Title, Image} from '@mantine/core';
import { SwitchToggle } from './SwitchToggle'; 
import { NavLink, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserProvider';
import { UserMenu } from './userMenu';


const useStyles = createStyles((theme) => ({
  header: {
    margin: `0 ${theme.spacing.md}px`,
    padding: `${theme.spacing.md}px ${theme.spacing.md}px`,
    borderRadius: `0 0 ${theme.radius.lg}px ${theme.radius.lg}px`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

// Props interface for HeaderSimple component
interface HeaderSimpleProps {
  links: { link: string; label: string }[];
  burgerOpened: boolean;
  burgerToggle?: () => void;
  showSidebar: boolean;
}

// HeaderSimple component that renders the links with a hamburger menu
export const HeaderSimple: React.FC<HeaderSimpleProps> = ({ links, burgerOpened, burgerToggle, showSidebar}) => {

  const { user } = useUser();
  const { classes, cx, theme } = useStyles();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  const headerPosition = showSidebar ? 'fixed' : 'absolute';

  console.log( theme.colorScheme )

  const items = links.map((link) => (
    <NavLink
      key={link.label}
      to={link.link}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={() => {
        setActive(link.link);
      }}
    >
      {link.label}
    </NavLink>
  ));

  return (
    <Header height={60} className={classes.header} pos={ headerPosition }  >

        <Group spacing={0}>
          { showSidebar ? <Burger opened={burgerOpened} onClick={burgerToggle} className={classes.burger} size="md" /> : <></> }
          <span>
          <Image
            src={ theme.colorScheme === 'dark' ? '/api/static/darkLogo.png' : '/api/static/lightLogo.png' }
            alt="kgLogo"
            height={50}
          />
          </span>
        </Group>

        <Group spacing={5} className={classes.links}>

        <SwitchToggle />

          { user ? < UserMenu/> : <></> }

          { !user ? items : <></> }

        </Group>
        
    </Header>
  );
}