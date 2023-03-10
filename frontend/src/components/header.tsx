import { createStyles, Header, Group, Burger, Title, Image} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserProvider';
import { UserMenu } from './userMenu';


const useStyles = createStyles((theme) => ({

  image: {
    '&:hover': {
      cursor: 'pointer',
    },
  },

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
  burgerOpened: boolean;
  burgerToggle?: () => void;
  showSidebar: boolean;
}

// HeaderSimple component that renders the links with a hamburger menu
export const HeaderSimple: React.FC<HeaderSimpleProps> = ({ burgerOpened, burgerToggle, showSidebar}) => {

  const { user } = useUser();
  const { classes, theme } = useStyles();
  const headerPosition = showSidebar ? 'fixed' : 'absolute';
  const navigate = useNavigate();
  function goHome() {navigate('/');}

  return (
    <Header height={60} className={classes.header} pos={ headerPosition }  >

        <Group spacing={0}>
          { showSidebar ? <Burger opened={burgerOpened} onClick={burgerToggle} className={classes.burger} size="md" /> : <></> }
          <span>
          <Image
            src={ theme.colorScheme === 'dark' ? '/api/static/darkLogo.png' : '/api/static/lightLogo.png' }
            alt="kgLogo"
            height={50}
            className={classes.image}
            onClick={goHome}
          />
          </span>
        </Group>

        <Group spacing={5} className={classes.links}>

          { user ? < UserMenu/> : <></> }

        </Group>
        
    </Header>
  );
}