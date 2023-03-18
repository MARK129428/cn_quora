package questionlike

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"quora_server/src/api/article"
	"strings"

	//"quora_server/src/api/question"
)

func UploadQuestionLike(ctx *gin.Context) {
	token := ctx.GetStringMapString("token")
	user := article.GetUserIDByToken(token)
	likeIds := ctx.PostForm("likeIds")
	dislikeIds := ctx.PostForm("dislikeIds")
	splitLikeIds := strings.Split(likeIds, `,`)
	splitDislikeIds := strings.Split(dislikeIds, `,`)

	var likesRes []*QuestionLike
	for _, likeId := range splitLikeIds {
		if likeId == "" {
			continue
		}
		questionLike := QuestionLike{
			UserID: user.ID,
			QuestionId: likeId,
			IsLike: true,
		}
		// 创建记录
		service := UploadQuestionLikeService(questionLike)
		likesRes = append(likesRes, service)
	}
	var dislikesRes []*QuestionLike
	for _, dislikeId := range splitDislikeIds {
		if dislikeId == "" {
			continue
		}
		questionLike := QuestionLike{
			UserID: user.ID,
			QuestionId: dislikeId,
			IsLike: false,
		}
		service := UploadQuestionLikeService(questionLike)
		dislikesRes = append(dislikesRes, service)
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data": map[string]interface{}{
			"dislikesRes": dislikesRes,
			"likesRes": likesRes,
		},
	})
}