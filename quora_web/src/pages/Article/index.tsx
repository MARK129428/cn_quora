import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import 'github-markdown-css';
import KEditor from '@component/Editor';
import { getArticle, patchArticle, postArticle } from '@/api/article';

const plugins = [
  gfm(),
  highlight(),
];

export interface IArticle {
  id?: number,
  title?: string;
  content?: string;
}

function Article() {
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const { id } = useParams<{id: string}>();
  const init = useCallback(async () => {
    if (id) {
      const { data: { title: getTitle, Content: getContent } } = await getArticle(id);
      setValue(getContent);
      setTitle(getTitle);
    }
  }, []);

  useEffect(() => {
    init();
  }, []);

  const handleSubmit = useCallback(async () => {
    if (id) {
      const responseWithId = await patchArticle(`${id}`, {
        title,
        content: value,
      });
      return;
    }
    const response = await postArticle({
      title,
      content: value,
    });
  }, [value, title]);
  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, [title]);
  const handleEditorChange = useCallback((v: string) => {
    setValue(v);
  }, [value]);
  return (
    <KEditor
      title={title}
      value={value}
      handleSubmit={handleSubmit}
      handleTitleChange={handleTitleChange}
      handleEditorChange={handleEditorChange}
    />
  );
}

export default Article;
