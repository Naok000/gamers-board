import { Wrap, Spinner } from '@chakra-ui/react';
import { useState } from 'react';
import { Layout } from '../../components/Layout';
import PostingItem from '../../components/PostingItem';
import SearchBox from '../../components/SearchBox';
import { useQueryPosting } from '../../hooks/useQueryPosting';

const BoardPage = () => {
  const { data: postings, status } = useQueryPosting();
  const [query, setQuery] = useState('');
  if (status === 'loading') return <Spinner />;
  return (
    <Layout title='Board'>
      <SearchBox setAction={setQuery} />
      <Wrap justify={{ base: 'center', sm: 'center', md: 'start' }}>
        {postings &&
          postings
            .filter((post) => {
              return post.title.toLowerCase().includes(query.toLowerCase());
            })
            .map((posting) => (
              <PostingItem key={posting.id} posting={posting} />
            ))}
      </Wrap>
    </Layout>
  );
};

export default BoardPage;
