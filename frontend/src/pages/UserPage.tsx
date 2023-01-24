import { Container, Title, Text, Stack, Loader } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useApi } from '../contexts/ApiProvider';
import { useQuery } from '@tanstack/react-query';

import Body from '../components/Body';

export type Items = {
  "title": string,
  "description": string,
  "id": number,
  "owner_id": number
}

export type User = {
    "email": string,
    "name": string,
    "description": string,
    "id": number,
    "is_active": boolean,
    "items": Items[]
  }


export default function UserPage() {
    const { user_id } = useParams<{ user_id: string }>();
    const api = useApi();

    const { data: user } = useQuery(['get-user'], async () => {
      const response = await api.get('/users/' + user_id);
      return response.ok ? response.body as User : null;
    });

    return (
        <Body showSidebar >
          <Container fluid={true}> 
            {user === undefined ?
              <Loader />
            :
              <>
                {user === null ?
                  <Title>User not found.</Title>
                :
                  <Stack >
                    <Title>{user.name}</Title>
                    <Text>{user.description}</Text>
                  </Stack>
                }
              </>
            }
          </Container>
        </Body>
    )
}