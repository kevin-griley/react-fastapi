import { Group, Menu, } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { IconSettings, IconPhoto, IconMessageCircle, IconChevronUp, IconChevronDown } from '@tabler/icons';
import { UserButton } from './userButton';
import { useUser } from '../contexts/UserProvider';


export function UserMenu() {

    const [opened, toggle] = useToggle([false, true]);
    const { user, logout } = useUser();

    return (
        <Group position="center">
            <Menu width={200} shadow="md" position="bottom-end" opened={opened} onChange={ toggle }>

                <Menu.Target>
                    <UserButton
                        image="https://avatars.githubusercontent.com/u/14338007?v=4"
                        name={user!?.name}
                        email={user!?.email}
                        icon={ opened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} /> }
                    />
                </Menu.Target>

                <Menu.Dropdown>

                    <Menu.Label>Application</Menu.Label>
                    <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
                    <Menu.Item icon={<IconMessageCircle size={14} />}>Profile</Menu.Item>
                    
                    <Menu.Divider />
                    <Menu.Item icon={<IconPhoto size={14} />} onClick={logout}>Logout</Menu.Item>

                </Menu.Dropdown>

            </Menu>
        </Group>
    );
}