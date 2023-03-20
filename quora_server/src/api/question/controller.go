package question

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"quora_server/src/api/article"
	"quora_server/src/api/questionlike"
	"quora_server/src/api/user"
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
			"data":    nil,
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data":    question,
	})
}

type ResQuestion struct {
	LikeNum    int64
	DislikeNum int64
	IsUserLike *bool
	Question
}

func GetUserQuestions(ctx *gin.Context) {
	token := ctx.GetStringMapString("token")
	user := article.GetUserIDByToken(token)
	limit := ctx.Query("limit")
	page := ctx.Query("page")
	questions, count := GetUserQuestionsService(user.ID, limit, page)
	var resQuestion []ResQuestion
	for _, question := range *questions {
		likeNum, dislikeNum := questionlike.GetQuestionLikeNumService(question.ID)
		resQuestion = append(resQuestion, ResQuestion{
			Question:   question,
			LikeNum:    likeNum,
			DislikeNum: dislikeNum,
		})
	}
	if questions == nil {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "error",
			"data":    nil,
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data":    &resQuestion,
		"total":   count,
	})
}

func GetAllQuestions(ctx *gin.Context) {
	token := ctx.GetStringMapString("token")
	limit := ctx.Query("limit")
	page := ctx.Query("page")
	var user *user.User
	if token != nil {
		user = article.GetUserIDByToken(token)
	}
	questions, count := GetAllQuestionService(limit, page)
	var resQuestion []ResQuestion
	for _, question := range *questions {
		like, dislike := questionlike.GetQuestionLikeNumService(question.ID)
		var isUserLike *bool = nil
		if user != nil {
			isUserLike = questionlike.GetUseLikeQuestion(question.ID, user.ID)
		}
		resQuestion = append(resQuestion, ResQuestion{
			Question:   question,
			LikeNum:    like,
			DislikeNum: dislike,
			IsUserLike: isUserLike,
		})

	}
	if questions == nil {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "error",
			"data":    nil,
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data":    resQuestion,
		"total":   count,
	})
}
