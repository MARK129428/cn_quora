package question

import (
	"github.com/gin-gonic/gin"
	"quora_server/src/utils"
)

func InjectToken(ctx *gin.Context) {
	header := ctx.Request.Header
	if header == nil {

	}
	auth := header["Authorization"]
	if auth != nil &&  auth[0] != "" {
		token := utils.ParseToken(auth[0])
		ctx.Set("token", token)
	}
	ctx.Next()
}