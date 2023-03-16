package question

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"quora_server/src/api/article"
)

func UploadQuestion(ctx *gin.Context) {
	token := ctx.GetStringMapString("token")
	content := ctx.PostForm("content")
	user := article.GetUserIDByToken(token)
	question := Question{
		Content: content,
		UserId:  user.ID,
	}
	insertQuestion := InsertQuestion(&question)

	if insertQuestion == nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "error",
			"data":    "插入失败",
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data":    insertQuestion,
	})
}

//	func DeleteQuestion(ctx *gin.Context) {
//		token := ctx.GetStringMapString("token")
//		articleId := ctx.Param("articleId")
//		user := GetUserIDByToken(token)
//
//		deleteMsg := map[string]string{
//			"articleId": articleId,
//			"userId": user.ID,
//		}
//		EffectRows := DeleteArticleService(deleteMsg)
//		if EffectRows == 0 {
//			ctx.JSON(http.StatusOK, gin.H{
//				"message": "error",
//				"data": "删除失败",
//			})
//			return
//		}
//		ctx.JSON(http.StatusOK, gin.H{
//			"message": "success",
//			"data": deleteMsg,
//		})
//	}
//
//	func UpdateQuestion(ctx *gin.Context)  {
//		articleId := ctx.Param("articleId")
//		title := ctx.PostForm("title")
//		content := ctx.PostForm("content")
//
//		articleMsg := map[string]string{
//			"articleId": articleId,
//			"title": title,
//			"content": content,
//		}
//		updateDate := UpdateArticleService(articleMsg)
//		if updateDate == nil {
//			ctx.JSON(http.StatusOK, gin.H{
//				"message": "error",
//				"data": "修改失败",
//			})
//			return
//		}
//		ctx.JSON(http.StatusOK, gin.H{
//			"message": "success",
//			"data": articleMsg,
//		})
//	}
func GetQuestion(ctx *gin.Context) {
	questionId := ctx.Param("questionId")
	question := GetQuestionService(questionId)

	if question == nil {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "error",
			"data": nil,
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data":    question,
	})
}

func GetUserQuestions(ctx *gin.Context) {
	token := ctx.GetStringMapString("token")
	user := article.GetUserIDByToken(token)
	questions := GetUserQuestionsService(user.ID)

	if questions == nil {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "error",
			"data":    nil,
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data":    questions,
	})
}
