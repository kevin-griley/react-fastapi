import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { showNotification } from '@mantine/notifications';
import { useApi } from '../contexts/ApiProvider';
import { useQuery } from '@tanstack/react-query';
import { IconCheck, IconX } from '@tabler/icons';
import decodeJwt from 'jwt-decode';
import { setToken, removeToken } from '../utils/auth';

import {
    Paper,
    createStyles,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
    Text,
  } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    wrapper: {
      paddingLeft: theme.spacing.xl * 3,
      paddingRight: theme.spacing.xl * 3,
      paddingTop: theme.spacing.xl * 4,
      paddingBottom: theme.spacing.xl * 4,
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





export const LoginForm = () => {

  const api = useApi();
  const { classes } = useStyles();
  const navigate = useNavigate(); 

    const form = useForm({
        initialValues: {
            username: '',
            password: '',
            rememberCookie: false,
        },

        validate: {
            password: (value) => (value.length > 5 ? null : 'Password must be at least 6 characters long'),
            username: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    const submit_form = async (values : any) => {

      const response = await api.login(values);
      const data = response.body;
      if (response.ok) {

        navigate('/feed');

        if ('access_token' in data) {
          const decodedToken: any = decodeJwt(data['access_token']);
          await setToken(data['access_token']);
        }

        showNotification({
          autoClose: 5000,
          title: "Success",
          message: 'You have successfully logged in!',
          color: 'green',
          icon: <IconCheck />,
          loading: false,
        });


      } else {
        let error = response.body.detail;

        form.setErrors({ username: error });

        showNotification({
          autoClose: 5000,
          title: "Error",
          message: error,
          color: 'red',
          icon: <IconX />,
          loading: false,
        });     
        
        await removeToken()
      }

      return response;
    }

    return (
        <div className={classes.wrapper}>

            <form onSubmit={form.onSubmit((values) => submit_form(values))}>

                <Paper className={classes.form} radius={'lg'} shadow={'lg'} p={'xl'}>

                <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
                    Nice to see you again! 
                </Title>

                <TextInput 
                    label="Email address" 
                    placeholder="kevin@griley.app" 
                    size="md" 
                    error=""
                    {...form.getInputProps('username')}
                />

                <PasswordInput 
                    label="Password" 
                    placeholder="Your password" 
                    mt="md" 
                    size="md" 
                    error=""
                    {...form.getInputProps('password')}
                />

                <Checkbox 
                    label="Keep me logged in" 
                    mt="xl" 
                    size="md" 
                    {...form.getInputProps('rememberCookie', { type: 'checkbox' })}
                    error=""
                />

                <Button fullWidth mt="xl" size="md" type="submit">
                    Login
                </Button>

                <Text align="center" mt="md">
                    Don&apos;t have an account?{' '}
                    <Link to={'/register'} > Register </Link>
                </Text>

                </Paper>

            </form>
        </div>    )}


