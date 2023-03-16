package article

import (
	"fmt"
	"quora_server/src/api/user"
	"quora_server/src/db"
)

func GetUserIDByToken(token map[string]string) *user.User {
	var u user.User
	data := db.DB.Model(&user.User{}).Where("password = ?", token["Password"]).First(&u)
	if data.RowsAffected == 0 {
		return nil
	}
	return &u
}

func InsertArticle(article *Article) *Article {
	data := db.DB.Create(article)
	if err := data.Error; err != nil {
		fmt.Println("插入失败", err)
		return nil
	}
	return article
}

func DeleteArticleService(deleteMsg map[string]string) int64  {
	var article Article
	delete := db.DB.Where("id = ? && user_id = ?", deleteMsg["articleId"], deleteMsg["userId"]).Delete(&article)
	return delete.RowsAffected
}

func UpdateArticleService(articleMsg map[string]string) map[string]string {
	updates := db.DB.
		Model(&Article{}).
		Where("id = ?", articleMsg["articleId"]).
		Updates(map[string]interface{}{
			"title":   articleMsg["title"],
			"content": articleMsg["content"],
		})
	if updates.RowsAffected == 0 {
		return nil
	}
	return articleMsg
}

func GetArticleService(articleId string) *Article {
	var article Article
	first := db.DB.Where("id = ?", articleId).First(&article)
	if first.RowsAffected == 0 {
		return nil
	}
	return &article
}

func GetUserArticlesService(id string) *[]Article {
	var articles []Article
	find := db.DB.
		Limit(10).
		Offset(0).
		Where("user_id =?", id).
		Find(&articles)
	if find.RowsAffected == 0 {
		return nil
	}
	return &articles
}