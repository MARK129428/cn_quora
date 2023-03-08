package user

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"quora_server/src/utils"
)

// 登录校验拦截
func LoginRequest(ctx *gin.Context) {
	header := ctx.Request.Header
	if header == nil {

	}
	auth := header["Authorization"]
	if auth == nil {
		fmt.Errorf("结果错误，返回")
		ctx.JSON(http.StatusBadRequest, gin.H{"code": 400, "message": "缺少authorization"})
		ctx.Abort()
		return
	} else {
		token := utils.ParseToken(auth[0])
		ctx.Set("token", token)
		ctx.Next()
	}
}
