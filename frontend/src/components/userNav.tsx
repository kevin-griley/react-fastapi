import { createStyles, Avatar, Text, Group } from '@mantine/core';
import { IconPhoneCall, IconAt } from '@tabler/icons';

const useStyles = createStyles((theme) => ({

    user: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
            marginBotton: '0'
        },
        marginBottom: theme.spacing.md,
    },

    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
    },

    name: {
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

}));

interface UserInfoIconsProps {
    avatar: string;
    name: string;
    description: string;
    email: string;
}

export function UserInfoIcons({ avatar, name, description,  email }: UserInfoIconsProps) {
    const { classes } = useStyles();
    return (
        <div className={classes.user} >
            <Group noWrap>
                <Avatar src={avatar} size={94} radius="md" />
                <div>
                    <Text size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed">
                        {description}
                    </Text>

                    <Text size="lg" weight={500} className={classes.name}>
                        {name}
                    </Text>

                    <Group noWrap spacing={10} mt={3}>
                        <IconAt stroke={1.5} size={16} className={classes.icon} />
                        <Text size="xs" color="dimmed">
                            {email}
                        </Text>
                    </Group>

                </div>
            </Group>
        </div>
    );
}