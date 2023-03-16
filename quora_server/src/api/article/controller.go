package article

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func UploadArticle(ctx *gin.Context)  {
	token := ctx.GetStringMapString("token")
	title := ctx.PostForm("title")
	content := ctx.PostForm("content")
	user := GetUserIDByToken(token)

	article := Article{
		Title: title,
		Content: content,
		UserId: user.ID,
	}
	insertArticle := InsertArticle(&article)

	if insertArticle == nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "error",
			"data": "插入失败",
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data": insertArticle,
	})
}

func DeleteArticle(ctx *gin.Context) {
	token := ctx.GetStringMapString("token")
	articleId := ctx.Param("articleId")
	user := GetUserIDByToken(token)

	deleteMsg := map[string]string{
		"articleId": articleId,
		"userId": user.ID,
	}
	EffectRows := DeleteArticleService(deleteMsg)
	if EffectRows == 0 {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "error",
			"data": "删除失败",
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data": deleteMsg,
	})
}

func UpdateArticle(ctx *gin.Context)  {
	articleId := ctx.Param("articleId")
	title := ctx.PostForm("title")
	content := ctx.PostForm("content")

	articleMsg := map[string]string{
		"articleId": articleId,
		"title": title,
		"content": content,
	}
	updateDate := UpdateArticleService(articleMsg)
	if updateDate == nil {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "error",
			"data": "修改失败",
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data": articleMsg,
	})
}

func GetArticle(ctx *gin.Context)  {
	articleId := ctx.Param("articleId")
	article := GetArticleService(articleId)

	if article == nil {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "error",
			"data": "数据未找到",
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data": article,
	})
}

func GetUserArticles(ctx *gin.Context)  {
	token := ctx.GetStringMapString("token")
	user := GetUserIDByToken(token)
	articles := GetUserArticlesService(user.ID)

	if articles == nil {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "error",
			"data": "数据未找到",
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data": articles,
	})
}