import { useCallback, useState } from 'react';
import gfm from '@bytemd/plugin-gfm';
import highlight from '@bytemd/plugin-highlight';
import { Editor, Viewer } from '@bytemd/react';
import 'github-markdown-css';
import { Button, Input } from 'antd';
import styles from './index.module.scss';

const plugins = [
  gfm(),
  highlight(),
];

function Article() {
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const handleSubmit = useCallback(() => {
    console.log('上传:', value, title);
  }, [value, title]);
  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, [title]);
  const handleEditorChange = useCallback((v: string) => {
    setValue(v);
  }, [value]);
  return (
    <>
      <Input
        placeholder="请输入标题"
        size="large"
        value={title}
        onChange={handleTitleChange}
      />
      <Editor
        value={value}
        plugins={plugins}
        onChange={handleEditorChange}
      />
      <Button className={styles.fixed} shape="circle" type="primary" onClick={handleSubmit}>上传</Button>
    </>
  );
}

export default Article;
