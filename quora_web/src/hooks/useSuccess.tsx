import { message } from 'antd';

export default function useSuccess(content: string) {
  message.success(content);
}
