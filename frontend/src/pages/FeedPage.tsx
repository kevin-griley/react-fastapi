import { Paper, createStyles, Title} from '@mantine/core';

import Body from '../components/Body';
import Posts from '../components/posts'

const useStyles = createStyles((theme) => ({
  body: {
    padding: `${theme.spacing.xl}px`,
    height: '100%',
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

export default function FeedPage() {

  const { classes } = useStyles();

  return (
    <Body showSidebar >
      <Paper className={ classes.body } radius="lg" >
        <Title> Newsfeed </Title>
        <Posts content='explore' />
      </Paper>
    </Body>
)
}