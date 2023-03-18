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

export function getAllQuestions() {
  return instance.get('/questions');
}
interface IQuestionLike {
  likeIds: Set<number>,
  dislikeIds: Set<number>
}
export function postQuestionLike(data: IQuestionLike) {
  return instance.post('/questionlike', {
    likeIds: `${[...data.likeIds]}`,
    dislikeIds: `${[...data.dislikeIds]}`,
  });
}
