package comment

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"quora_server/src/api/article"
)

func CreateComment(ctx *gin.Context) {
	token := ctx.GetStringMapString("token")
	user := article.GetUserIDByToken(token)
	content := ctx.PostForm("content")
	answerId := ctx.PostForm("answerId")

	comment := Comment{
		Content:  content,
		UserId:   user.ID,
		AnswerId: answerId,
	}
	fmt.Println(comment)
	create := CreateCommentService(comment)
	if create == nil {
		ctx.JSON(200, gin.H{
			"data":    "数据插入失败",
			"message": "error",
		})
		return
	}
	ctx.JSON(200, gin.H{
		"data":    comment,
		"message": "success",
	})
}

func GetCommentsByAnswerId(ctx *gin.Context) {
	answerId := ctx.Param("answerId")
	limit := ctx.Query("limit")
	page := ctx.Query("page")
	answers, count := GetCommentsByAnswerIdService(answerId, limit, page)
	if answers == nil {
		ctx.JSON(200, gin.H{
			"message": "error",
			"data":    "无评论数据",
		})
		return
	}
	ctx.JSON(200, gin.H{
		"message": "success",
		"data":    answers,
		"total":   count,
	})
}
