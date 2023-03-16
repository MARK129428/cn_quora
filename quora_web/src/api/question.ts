import instance from '../utils/http';

export function createQuestion(content: string) {
  return instance.post('/question', {
    content,
  });
}

export function getQuestion(questionId: number) {
  return instance.get(`/question/${questionId}`);
}

export function getUserQuestions() {
  return instance.get('/user/questions');
}
