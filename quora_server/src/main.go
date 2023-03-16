package main

import (
	"github.com/gin-gonic/gin"
	"quora_server/src/api/article"

	"quora_server/src/api/user"
	"quora_server/src/db"
	"quora_server/src/initalize"
)

func main() {
	db.Connect()
	initalize.Model(db.DB)
	r := gin.Default()
	// user
	r.POST("/v1/user/signup", user.Signup)
	r.POST("/v1/user/signin", user.Signin)
	r.PATCH("/v1/user", user.LoginRequest, user.Update)
	r.GET("/v1/user", user.LoginRequest, user.GetUser)

	// article
	r.POST("/v1/article", user.LoginRequest, article.UploadArticle)
	r.DELETE("/v1/article/:articleId", user.LoginRequest, article.DeleteArticle)
	r.PATCH("/v1/article/:articleId", user.LoginRequest, article.UpdateArticle)
	r.GET("/v1/article/:articleId", article.GetArticle)
	r.GET("/v1/user/articles", user.LoginRequest, article.GetUserArticles)
	r.Run(":9000") // 监听并在 0.0.0.0:8080 上启动服务
}
