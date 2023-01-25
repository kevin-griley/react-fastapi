import { forwardRef } from 'react';
import { IconChevronDown } from '@tabler/icons';
import { Group, Avatar, Text, Menu, UnstyledButton } from '@mantine/core';
import { IconSettings, IconPhoto, IconMessageCircle, } from '@tabler/icons';
import { UserButton } from './userButton';


export function UserMenu() {
    return (
        <Group position="center">
            <Menu position="bottom-end" withArrow arrowPosition="center">

                <Menu.Target>
                    <UserButton
                        image="https://avatars.githubusercontent.com/u/14338007?v=4"
                        name="Kevin Griley"
                        email="kevin@griley.app"
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