import { useForm, isNotEmpty } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Progress, PasswordInput, Group, Text, Center, useMantineTheme} from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons';
import { useApi } from '../contexts/ApiProvider';
import { useQuery } from '@tanstack/react-query';
import { IconUsers } from '@tabler/icons';

import { UserDescription } from './userDescription';
import { useToggle } from '@mantine/hooks';
import { useEffect, useState } from "react";
import { showNotification } from '@mantine/notifications';

import {
    Paper,
    createStyles,
    TextInput,
    Button,
    Title,
  } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    wrapper: {
      paddingLeft: theme.spacing.xl * 3,
      paddingRight: theme.spacing.xl * 3,
      paddingTop: theme.spacing.xl * 2,
      paddingBottom: theme.spacing.xl * 2,
      borderRadius: theme.radius.lg,
      boxShadow: theme.shadows.lg,
      height: '100%',
      backgroundSize: 'cover',
      backgroundImage:
        'url(https://images.unsplash.com/photo-1536152470836-b943b246224c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80)',
    
      
      [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
        paddingLeft: theme.spacing.xl * 1,
        paddingRight: theme.spacing.xl * 1,
  
      },
    },
  
    form: {
      overflowY: 'auto',
      borderRight: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
      }`,
      maxWidth: 450,
      [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
        maxWidth: '100%',
      },
    },
  
    title: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
  
    logo: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      width: 120,
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }));

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text color={meets ? 'teal' : 'red'} mt={5} size="sm">
      <Center inline>
        {meets ? <IconCheck size={14} stroke={1.5} /> : <IconX size={14} stroke={1.5} />}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}

export const RegisterForm = () => {

  const api = useApi();
  const { classes } = useStyles();
  const navigate = useNavigate();

  const userDescriptions = [
    { label: 'Employer', image: IconUsers },
    { label: 'Family', image: IconUsers },
  ];

  const [description, toggle] = useToggle( userDescriptions.map((item) => item.label) );

  const form = useForm({
      initialValues: {
          description: description,
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
      },
      validate: {
          name: isNotEmpty('Name cannot be empty'),
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
          password: (value) => ( getStrength(value) >= 75 ? null : 'Password is too weak' ),
          confirmPassword: (value, values) => (value !== values.password ? 'Passwords did not match' : null),
      },

  });

  useEffect(() => {
    form.values.description = description;
  }, [description])

  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement key={index} label={requirement.label} meets={requirement.re.test( form.values.password )} />
  ));

  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ bar: { transitionDuration: '0ms' } }}
        value={
          form.values.password.length > 0 && index === 0 ? 100 : getStrength(form.values.password) >= ((index + 1) / 4) * 100 ? 100 : 0
        }
        color={getStrength(form.values.password) > 80 ? 'teal' : getStrength(form.values.password) > 50 ? 'yellow' : 'red'}
        key={index}
        size={4}
      />
    ));

    const submit_form = async (values : any) => {
        const response = await api.post('/users/', values);
         if (response.ok) {
          form.reset();

          showNotification({
            autoClose: 5000,
            title: "Success",
            message: 'form submitted successfully',
            color: 'green',
            icon: <IconCheck />,
            loading: false,
          });

          navigate('/login');
          
        } else {
          let error = response.body.detail;
          form.setErrors({ email: error });

          showNotification({
            autoClose: 5000,
            title: "Error",
            message: error,
            color: 'red',
            icon: <IconX />,
            loading: false,
          });          
        }
        return response;
    }

    return (
        <div className={classes.wrapper}>
            <form onSubmit={form.onSubmit((values) => submit_form(values))}>
                <Paper className={classes.form} radius={'lg'} shadow={'lg'} p={'xl'}>

                <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
                    Welcome! 
                </Title>

                <UserDescription data={userDescriptions} selected={description} switched={toggle} />

                <TextInput 
                    label="Name" 
                    placeholder="Stuart Little" 
                    mt="md"
                    size="md" 
                    error=""
                    {...form.getInputProps('name')}
                />
                <TextInput 
                    label="Email address" 
                    placeholder="kevin@griley.app" 
                    mt="md" 
                    size="md" 
                    error=""
                    {...form.getInputProps('email')}
                />
                <PasswordInput
                  size="md" 
                  mt="md" 
                  placeholder="Your password"
                  label="Password"
                  {...form.getInputProps('password')}
                />
                <PasswordInput 
                    label="Confirm password"
                    placeholder="********"
                    mt="md" 
                    size="md" 
                    error=""
                    {...form.getInputProps('confirmPassword')}
                />

                <Group spacing={5} grow mt="md" mb="md">
                  {bars}
                </Group>

                <PasswordRequirement label="Has at least 6 characters" meets={form.values.password.length > 5} />
                {checks}
                <Button fullWidth mt="xl" size="md" type="submit">
                    Register
                </Button>

                <Text align="center" mt="md">
                    Already have an account?{' '}
                    <Link to={'/login'} > Login </Link>
                </Text>

                </Paper>
            </form>
        </div>    )}


