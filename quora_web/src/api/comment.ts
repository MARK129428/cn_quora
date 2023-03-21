import instance from '@/utils/http';

export interface IComment {
  id?: number,
  userId?: string,
  answerId?: string,
  content?: string
}

export function createComment(data: IComment) {
  return instance.post('/comment', data);
}

export function getCommentsByAnswerId(answerId: string, data: any) {
  return instance.get(`/comments/${answerId}`, {
    params: data,
  });
}
