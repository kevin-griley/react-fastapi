import { createStyles, Card, Image, ActionIcon, Group, Text, Avatar, Badge } from '@mantine/core';
import { IconHeart, IconBookmark, IconShare } from '@tabler/icons';
import TimeAgo from './TimeAgo';
import { Post } from './posts'

/**
 * Creates styling used by card components which are applicable in either dark or light theme 
 * @param {Object} theme - The theme applied to the current context
 * @returns {Object} - Styles that can be used by card components
 */
const useStyles = createStyles((theme) => {
  // Function to get the background color based on the scheme of the current theme
  const getBackgroundColor = (scheme: string): string => {
    return scheme === 'dark' ? theme.colors.dark[7] : theme.white;
  };

  // Function to get the border color based on the scheme of the current theme
  const getBorderColor = (scheme: string): string => {
    return scheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2];
  };

  return {
    card: {
      marginTop: theme.spacing.md,
      backgroundColor: getBackgroundColor(theme.colorScheme),
    },

    title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    footer: {
      padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${getBorderColor(theme.colorScheme)}`,
    },
  };
});


// Function ArticleCardFooter accepts the props and components, then renders them
export function ArticleCardFooter( post : Post) {
  const { classes, theme } = useStyles();
  
  return (
    <Card withBorder p="lg" radius="lg" className={classes.card} >

      <Badge>{post.category}</Badge>

      <Text weight={700} className={classes.title} mt="xs">
        {post.title}
      </Text>

      <Group mt="lg">
        <Avatar src={post.author.image} radius="sm" />
        <div>
          <Text weight={500}>{post.author.name}</Text>
          <Text size="xs" color="dimmed">
            {post.author.description}
          </Text>
        </div>
      </Group>

      <Card.Section className={classes.footer}>
        <Group position="apart">
          <Text size="xs" color="dimmed">
            <TimeAgo isoDate={post.timestamp} />
          </Text>
          <Group spacing={0}>
            <ActionIcon>
              <IconHeart size={18} color={theme.colors.red[6]} stroke={1.5} />
            </ActionIcon>
            <ActionIcon>
              <IconBookmark size={18} color={theme.colors.yellow[6]} stroke={1.5} />
            </ActionIcon>
            <ActionIcon>
              <IconShare size={16} color={theme.colors.blue[6]} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}