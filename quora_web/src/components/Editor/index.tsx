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
export interface KEditorProps {
  title: string | number | readonly string[] | undefined;
  handleTitleChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  handleEditorChange: (value: string) => void;
  handleSubmit: (React.MouseEventHandler<HTMLAnchorElement> &
     React.MouseEventHandler<HTMLButtonElement>) | undefined;
}
function KEditor({
  title,
  handleTitleChange,
  value,
  handleEditorChange,
  handleSubmit,
}: KEditorProps) {
  return (
    <div>
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
      <Button
        className={styles.fixed}
        shape="circle"
        type="primary"
        onClick={handleSubmit}
      >
        上传
      </Button>
    </div>
  );
}

export default KEditor;
