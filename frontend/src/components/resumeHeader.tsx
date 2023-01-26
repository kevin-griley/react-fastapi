import { Title, createStyles, Space, Divider, Group, Text, SimpleGrid, Stack, Flex, Image } from '@mantine/core';
import '../assets/Murecho-font.css';
import { ThemeIcon } from '@mantine/core';
import { IconPhone, IconMail, IconWorld, IconMapPin} from '@tabler/icons';

const useStyles = createStyles((theme) => ({

    f100: {
        fontFamily: 'Murecho',
        fontWeight: 100,
    },

    f200: {
        fontFamily: 'Murecho',
        fontWeight: 200,
    },

    f300: {
        fontFamily: 'Murecho',
        fontWeight: 300,
    },

    f400: {
      fontFamily: 'Murecho',
      fontWeight: 400,
    },

    f500: {
        fontFamily: 'Murecho',
        fontWeight: 500,
    },

    image: {
        maxHeight: '215px',
        maxWidth: '215px',
        height: 'auto',
        width: 'auto',
    },
  
  }));



export default function ResumeHeader() {

    const { classes, theme } = useStyles();

    return (
        <div className='resume-header'>

            <div>
                <SimpleGrid cols={2} mx="md">

                    <Stack align="flex-start" justify="flex-start" spacing={0} sx={{ zIndex: 1 }}>
                        <Title size={64} className={classes.f300} sx={{ whiteSpace: 'nowrap' }} > Kevin </Title>
                        <Title size={72} className={classes.f400} sx={{ whiteSpace: 'nowrap' }} > J. Griley </Title>
                        <Title size={36} className={classes.f300} sx={{ whiteSpace: 'nowrap' }} > CTO & CFO </Title>
                    </Stack>

                    <Flex align="center" justify="flex-end">
                        <Image className={classes.image} radius={110} src='/api/static/DSCF9787.jpg'/>
                    </Flex>

                </SimpleGrid>

                <Space h="md" />
                <Divider />

                <Space h="sm" />
                <SimpleGrid 
                    ml={theme.spacing.md}
                    mr={theme.spacing.md}
                    spacing="xl" 
                    cols={4}
                    breakpoints={[
                        { maxWidth: theme.breakpoints.lg, cols: 2, spacing: 'md' },
                        { maxWidth: theme.breakpoints.md, cols: 1, spacing: 'sm' },
                      ]}>
                
                    <Group noWrap>
                        <ThemeIcon radius="lg" size="lg" color="yellow">
                            <IconPhone /> 
                        </ThemeIcon>
                        <Text sx={{ whiteSpace: 'nowrap' }}> (714) 624-8902 </Text>
                    </Group>

                    <Group noWrap>
                        <ThemeIcon radius="lg" size="lg" color="yellow">
                            <IconMail /> 
                        </ThemeIcon>
                        <Text sx={{ whiteSpace: 'nowrap' }}> Kevin@Griley.air </Text>
                    </Group>

                    <Group noWrap>
                        <ThemeIcon radius="lg" size="lg" color="yellow">
                            <IconWorld /> 
                        </ThemeIcon>
                        <Text sx={{ whiteSpace: 'nowrap' }}> www.Griley.app </Text>
                    </Group>

                    <Group noWrap>
                        <ThemeIcon radius="lg" size="lg" color="yellow">
                            <IconMapPin /> 
                        </ThemeIcon>
                        <Text sx={{ whiteSpace: 'nowrap', overflowX: 'hidden'}}> 23136 Anza Ave </Text>
                    </Group>
                
                </SimpleGrid>
                <Space h="sm" />

                <Divider />

                <Space h="md" />
                
                <Title italic color="dimmed" order={2} className={classes.f400} >About Me:</Title>
                <Space h="sm" />
                <Text>
                    Highly experienced CTO & CFO with 10 years of experience in the logistics industry. 
                    Proven track record of managing expenses, implementing and maintaining ERP systems, and increasing company margins. 
                    Skilled in data analysis, visual dashboards, and leading projects and teams. 
                    Holds a BA in Business Studies with a focus on Management.
                </Text>

            </div>
        </div>
    )
}