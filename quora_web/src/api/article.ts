import { IArticle } from '@page/Article';
import instance from '../utils/http';

export function postArticle(aritcle: IArticle) {
  return instance.post('/article', aritcle);
}

export function deleteArticle(articleId: number) {
  return instance.delete(`/article/${articleId}`);
}

export function patchArticle(articleId: string, aritcleMsg: IArticle) {
  return instance.patch(`/article/${articleId}`, aritcleMsg);
}

export function getArticle(articleId: string) {
  return instance.get(`/article/${articleId}`);
}

export function getUserArticle(data: any) {
  return instance.get('/user/articles', {
    params: data,
  });
}

export function getArticles(data: any) {
  return instance.get('/articles', {
    params: data,
  });
}
