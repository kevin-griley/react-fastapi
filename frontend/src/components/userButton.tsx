import React from 'react';
import { forwardRef, Ref } from 'react';
import { IconChevronDown } from '@tabler/icons';
import { Group, Avatar, Text, UnstyledButton, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({

    button: {
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        
        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        },
    },

}));

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    image: string;
    name: string;
    email: string;
    icon?: React.ReactNode;
}

export const UserButton: React.FC<UserButtonProps> = forwardRef(
    ({ image, name, email, icon, ...others }: UserButtonProps,ref: Ref<HTMLButtonElement>) => {

        const { classes } = useStyles();

        return (
            <UnstyledButton ref={ref} {...others} className={classes.button}>
                <Group>
                    <Avatar src={image} radius="xl" />
                    <div style={{ flex: 1 }}>
                        <Text size="sm" weight={500}>
                            {name}
                        </Text>
                        <Text color="dimmed" size="xs">
                            {email}
                        </Text>
                    </div>
                    {icon || <IconChevronDown size={16} />}
                </Group>
            </UnstyledButton>
        );
    }
);