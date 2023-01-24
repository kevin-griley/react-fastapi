import { useState } from 'react';
import { Navbar, createStyles, Paper } from '@mantine/core';
import { NavLink, useLocation } from 'react-router-dom';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon: any = getRef('icon');

  return {

    paper: {
      padding: `${theme.spacing.xl}px ${theme.spacing.md}px`,
      height: '100%',
      border: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
      }`
    },
    
    navbar: {
      padding: `${theme.spacing.md}px 0px ${theme.spacing.md}px ${theme.spacing.md}px`,
      borderRight: 0,
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,

      [theme.fn.smallerThan('sm')]: {
        padding: `${theme.spacing.md}px`,
      },
    },

    title: {
      textTransform: 'uppercase',
      letterSpacing: -0.25,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        [`& .${icon}`]: {
          color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
      },
    },

    footer: {
      borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
      paddingTop: theme.spacing.md,
    },
  };
});



interface props {
  hideNavbar : boolean;
  data: { link: string; label: string; icon: any; }[];
}

export function NavbarSegmented({ hideNavbar, data } : props) {

  const { classes, cx } = useStyles();
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);
  
  const links = data.map((item: any) => (
    <NavLink
      className={cx(classes.link, { [classes.linkActive]: active === item.link })}
      to={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <Navbar width={{ sm: 300 }} className={classes.navbar} hidden={ hideNavbar }>
      <Paper className={classes.paper} radius={'lg'}>
        {links}
      </Paper>
    </Navbar>
  );
}