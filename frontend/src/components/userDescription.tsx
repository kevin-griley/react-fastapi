import { useState } from 'react';
import { createStyles, UnstyledButton, Menu, Image, Group } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons';

const useStyles = createStyles((theme, { opened }: { opened: boolean }) => ({
  control: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 15px',
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[2]
    }`,
    transition: 'background-color 150ms ease',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[opened ? 5 : 6]
        : opened
        ? theme.colors.gray[0]
        : theme.white,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  label: {
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
  },

  icon: {
    transition: 'transform 150ms ease',
    transform: opened ? 'rotate(180deg)' : 'rotate(0deg)',
  },
}));

interface descriptionProps {
    data : { label: string; image: any }[];
    selected: string;
    switched?: () => void;
  }

export function UserDescription({ data, selected, switched }: descriptionProps) {
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles({ opened });
  const selectedLabel = data.find((item) => item.label === selected);

  const items = data.map((item) => (
      <Menu.Item
        icon={ <item.image size={22}/>}
        onClick={switched}
        key={item.label}
        >
        {item.label}
      </Menu.Item>
  ));

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
    >
      <Menu.Target>
        <UnstyledButton className={classes.control}>
          <Group spacing="xs">
            { selectedLabel? <selectedLabel.image size={22}/> : <></> }
            <span className={classes.label}>{selectedLabel?.label}</span>
          </Group>
          <IconChevronDown size={16} className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>{items}</Menu.Dropdown>
    </Menu>
  );
}