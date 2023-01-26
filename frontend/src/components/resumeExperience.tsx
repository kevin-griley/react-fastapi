import { Title, createStyles, Space, Divider, Group, Text, List, Container } from '@mantine/core';
import '../assets/Murecho-font.css';

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

export default function ResumeExperience() {

    const { classes, theme } = useStyles();

    return (
        <Container fluid p={0}>

            <Title order={2} className={classes.f400} tt="uppercase">Work Experience:</Title>
            <Divider size="xs" />

            <Space h="sm" />
            <Title order={4} className={classes.f500} tt="capitalize">Chief Technology Officer & Chief Financial Officer</Title>
            <Space h="xs" />
            <Group>
                <Text c="dimmed">Griley Air Freight</Text>
                <Divider orientation="vertical" />
                <Text c="dimmed">July 2017 - Present</Text>
            </Group>
            <Space h="xs" />
            <List withPadding>
                <List.Item>Manage all company expenses and purchases, monitoring accounting costs for different vendors and departments</List.Item>
                <List.Item>Designed and built an ERP system for the company and migrated it from a legacy system</List.Item>
                <List.Item>Led a legal case with a massive document discovery request, digitized 30,000 documents and performed data analysis on it</List.Item>
                <List.Item>Successfully increased company margin from 3% to 22%</List.Item>
                <List.Item>Designed a web application using Plotly Dash that tracks all expenses and graphs the overtime</List.Item>
            </List>
            <Space h="sm" />

            <Title order={4} className={classes.f500} tt="capitalize">Safety Director</Title>
            <Space h="xs" />
            <Group>
                <Text c="dimmed">Griley Air Freight</Text>
                <Divider orientation="vertical" />
                <Text c="dimmed">July 2014 - June 2017</Text>
            </Group>
            <Space h="xs" />
            <List withPadding>
                <List.Item>Coordinated safety training for all employees and implemented safety protocols</List.Item>
                <List.Item>Implemented and maintained electronic documentation, increasing efficiency and reducing the need for excessive file keeping</List.Item>
                <List.Item>Passed BIT Inspection and won California Safest Fleet award multiple times</List.Item>
                <List.Item>Led efforts to train mechanics to use electronic documentation system effectively</List.Item>
                <List.Item>Demonstrated in-depth understanding of California and federal regulations in the logistics industry</List.Item>
                <List.Item>Led and managed a team to achieve company's safety goals</List.Item>
            </List>
            <Space h="sm" />

            <Title order={4} className={classes.f500} tt="capitalize">Project Manager</Title>
            <Space h="xs" />
            <Group>
                <Text c="dimmed">Griley Air Freight</Text>
                <Divider orientation="vertical" />
                <Text c="dimmed">May 2012 - June 2014</Text>
            </Group>
            <Space h="xs" />
            <List withPadding>
                <List.Item>Led multiple logistics projects, ensuring on-time and on-budget completion</List.Item>
                <List.Item>Led a project to migrate independent contractors out of the company and move them onto a separate corporation which obtained a federal DOT Freight Broker License</List.Item>
                <List.Item>Automated dispatching process through serverless function network and web hook integration using a service like zapier</List.Item>
                <List.Item>Demonstrated strong negotiation and leadership skills, obtained the trust and cooperation of independent contractors</List.Item>
                <List.Item>Led and managed a team effectively to achieve long-term goals of the company and reduce risk</List.Item>
            </List>
            <Space h="sm" />

        </Container>
    )
}