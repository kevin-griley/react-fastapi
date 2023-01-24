import { Paper, createStyles } from '@mantine/core';

import Body from '../components/Body';

import  ResumeHeader  from '../components/resumeHeader';
import ResumeExperience from '../components/resumeExperience';
import ResumeSkills from '../components/resumeSkills';


const useStyles = createStyles((theme) => ({
  body: {
    padding: `${theme.spacing.xl}px`,
    height: '100%',
    border: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));


export default function ResumePage() {

  const { classes } = useStyles();

  return (
      <Body showSidebar >
        <Paper className={ classes.body } radius="lg" >
          <ResumeHeader />
          <ResumeExperience />
          <ResumeSkills />
        </Paper>
      </Body>
  )
}