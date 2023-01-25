import { Group, Menu, } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { IconSettings, IconPhoto, IconMessageCircle, IconChevronUp, IconChevronDown } from '@tabler/icons';
import { UserButton } from './userButton';


export function UserMenu() {

    const [opened, toggle] = useToggle([false, true]);

    return (
        <Group position="center">
            <Menu width={200} shadow="md" position="bottom-end" opened={opened} onChange={ toggle }>

                <Menu.Target>
                    <UserButton
                        image="https://avatars.githubusercontent.com/u/14338007?v=4"
                        name="Kevin Griley"
                        email="kevin@griley.app"
                        icon={ opened ? <IconChevronUp size={16} /> : <IconChevronDown size={16} /> }
                    />
                </Menu.Target>

                <Menu.Dropdown>

                    <Menu.Label>Application</Menu.Label>
                    <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
                    <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>
                    <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item>

                </Menu.Dropdown>
                
            </Menu>
        </Group>
    );
}