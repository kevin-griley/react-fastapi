import React from 'react';
import { Container, Stack, Loader, Title} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { useApi } from '../contexts/ApiProvider';
import { ArticleCardFooter } from '../components/article'


export type Post = {
    id: number,
    image: string,
    category: string,
    title: string,
    timestamp: string,
    author: {
      name: string,
      description: string,
      image: string
    }
  }


interface Props {
    content?: string;
}

const Posts: React.FC<Props> = ({ content }) => {

    let url: string;
    switch (content) {
        case 'explore':
            url = '/posts/';
            break
        default:
            url = `/posts/'`;
            break;
    }

    const api = useApi();
    const { data: posts } = useQuery(['posts'], async () => {
        const response = await api.get(url);
        return response.ok ? response.body.data as Post[] : null;
    });

    return (
        <Container fluid={true}>
            {
            posts === undefined ? <Loader />
                :
                posts === null ? <Title> Error pulling posts </Title>
                    :
                    posts!.length === 0 ? <Title> No Posts </Title>
                        :
                        <Stack>
                            {posts!.map((post: Post) => (
                                <ArticleCardFooter {...post} key={post.id} />
                            ))}
                        </Stack>
            }
      </Container>
    )
}

export default Posts;