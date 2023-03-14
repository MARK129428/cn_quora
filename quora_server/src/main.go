package main

import (
	"github.com/gin-gonic/gin"

	"quora_server/src/db"
	"quora_server/src/initalize"
	"quora_server/src/user"
)

func main() {
	db.Connect()
	initalize.Model(db.DB)
	r := gin.Default()
	r.POST("/v1/user/signup", user.Signup)
	r.POST("/v1/user/signin", user.Signin)
	r.PATCH("/v1/user", user.LoginRequest, user.Update)
	r.Run(":9000") // 监听并在 0.0.0.0:8080 上启动服务
}
