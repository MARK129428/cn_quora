package answer

import (
	"github.com/gin-gonic/gin"
	"quora_server/src/api/article"
	"strconv"
)

func PostAnswer(ctx *gin.Context) {
	token := ctx.GetStringMapString("token")
	user := article.GetUserIDByToken(token)
	title := ctx.PostForm("title")
	content := ctx.PostForm("content")
	questionId := ctx.Param("questionId")

	atoi, _ := strconv.Atoi(questionId)
	answer := Answer{
		Title:      title,
		Content:    content,
		UserId:     user.ID,
		QuestionId: int64(atoi),
	}
	createAnswer := CreateAnswer(&answer)
	if createAnswer == nil {
		ctx.JSON(200, gin.H{
			"message": "error",
			"data":    "提交失败",
		})
		return
	}
	ctx.JSON(200, gin.H{
		"message": "success",
		"data":    createAnswer,
	})
}

func GetAllAnswerByQuestionId(ctx *gin.Context) {
	questionId := ctx.Param("questionId")
	limit := ctx.Query("limit")
	page := ctx.Query("page")
	answers, count := GetAllAnswerByQuestionIdService(questionId, limit, page)
	if answers == nil {
		ctx.JSON(200, gin.H{
			"data":    []Answer{},
			"message": "error",
		})
		return
	}
	ctx.JSON(200, gin.H{
		"message": "success",
		"data":    answers,
		"total":   count,
	})
}

func GetAllAnswerByUserId(ctx *gin.Context) {
	token := ctx.GetStringMapString("token")
	user := article.GetUserIDByToken(token)
	limit := ctx.Query("limit")
	page := ctx.Query("page")
	answers, count := GetAllAnswerByUserIdService(user.ID, limit, page)
	if answers == nil {
		ctx.JSON(200, gin.H{
			"data":    []Answer{},
			"message": "error",
		})
		return
	}
	ctx.JSON(200, gin.H{
		"message": "success",
		"data":    answers,
		"total":   count,
	})
}

func GetAllAnswerById(ctx *gin.Context) {
	id := ctx.Param("answerId")
	answer := GetAllAnswerByIdService(id)
	if answer == nil {
		ctx.JSON(200, gin.H{
			"message": "error",
			"data":    "提交失败",
		})
		return
	}
	ctx.JSON(200, gin.H{
		"message": "success",
		"data":    answer,
	})
}

func DeleteAnswer(ctx *gin.Context) {
	id := ctx.Param("answerId")
	token := ctx.GetStringMapString("token")
	user := article.GetUserIDByToken(token)

	answer := DeleteAnswerService(id, user.ID)

	if answer == nil {
		ctx.JSON(200, gin.H{
			"data":    "删除失败",
			"message": "error",
		})
		return
	}
	ctx.JSON(200, gin.H{
		"data":    answer,
		"message": "success",
	})
}

func PatchAnswer(ctx *gin.Context) {
	id := ctx.Param("answerId")
	token := ctx.GetStringMapString("token")
	user := article.GetUserIDByToken(token)
	title := ctx.PostForm("title")
	content := ctx.PostForm("content")

	answer := PatchAnswerService(id, user.ID, title, content)
	if answer == nil {
		ctx.JSON(200, gin.H{
			"data":    "删除失败",
			"message": "error",
		})
		return
	}
	ctx.JSON(200, gin.H{
		"data":    answer,
		"message": "success",
	})
}

func GetHotTopic(ctx *gin.Context) {
	service := GetHotTopicService()
	if service == nil {
		ctx.JSON(200, gin.H{
			"data":    "删除失败",
			"message": "error",
		})
		return
	}
	ctx.JSON(200, gin.H{
		"data":    service,
		"message": "success",
	})
}
