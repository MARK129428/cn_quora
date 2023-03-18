import instance from '@/utils/http';

export interface IPostAnswer {
  title?: string
  content?: string
}

export function postAnswer(data: IPostAnswer, questionId: string) {
  return instance.post(`/answer/${questionId}`, data);
}

export function getAllAnswerByQuestionId(questionId: string) {
  return instance.get(`/allanswers/${questionId}`);
}

export function getAllAnswerByUserId() {
  return instance.get('/user/answers');
}

export function getAnswerById(answerId: string) {
  return instance.get(`/answer/${answerId}`);
}

export function deleteAnswer(answerId: string) {
  return instance.delete(`/answer/${answerId}`);
}

export function changeAnswer(data: IPostAnswer, answerId: string) {
  return instance.patch(`/answer/${answerId}`, data);
}
