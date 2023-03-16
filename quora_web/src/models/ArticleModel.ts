import { makeObservable, observable } from 'mobx';

class ArticleModel {
  title: string = '';

  content: string = '';

  constructor() {
    makeObservable(this, {
      title: observable,
      content: observable,
    });
  }
}

export default ArticleModel;
