import { Switch, Group, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';

export function SwitchToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <Group position="center" my={30} mx={20}>
      <Switch
        checked={colorScheme === 'dark'}
        onChange={() => toggleColorScheme()}
        size="md"
        style={{ marginTop: 7 }}
        onLabel={<IconSun color={theme.white} size={20} stroke={1.5} />}
        offLabel={<IconMoonStars color={theme.colors.gray[6]} size={20} stroke={1.5} />}
      />
    </Group>
  );
}