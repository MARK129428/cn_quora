import instance from '../utils/http';

export function createQuestion(content: string) {
  return instance.post('/question', {
    content,
  });
}

export function getQuestion(questionId: number) {
  instance.interceptors.response.use((response: any) => {
    response.showMessage = false;
    return response;
  }, (error) => {
    return Promise.reject(error);
  });
  return instance.get(`/question/${questionId}`);
}

export function getUserQuestions(data: any) {
  return instance.get('/user/questions', {
    params: data,
  });
}

export function getAllQuestions(data: any) {
  return instance.get('/questions', {
    params: data,
  });
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

export function getHotTopic() {
  return instance('/getHotTopic');
}

export function getSearchQuestion(data: any) {
  return instance('/search', {
    params: data,
  });
}
