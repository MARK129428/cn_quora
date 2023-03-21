package main

import (
	"github.com/gin-gonic/gin"
	"quora_server/src/api/answer"
	"quora_server/src/api/article"
	"quora_server/src/api/comment"
	"quora_server/src/api/question"
	"quora_server/src/api/questionlike"
	"quora_server/src/middlewares"

	"quora_server/src/api/user"
	"quora_server/src/db"
	"quora_server/src/initalize"
)

func main() {
	db.Connect()
	initalize.Model(db.DB)
	r := gin.Default()
	r.Use(middlewares.Cors())
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
	r.GET("/v1/articles", article.GetArticles)

	// question
	r.POST("/v1/question", user.LoginRequest, question.UploadQuestion)
	//r.DELETE("/v1/question/:questionId", user.LoginRequest, question.DeleteQuestion)
	//r.PATCH("/v1/question/:questionId", user.LoginRequest, question.UpdateQuestion)
	r.GET("/v1/question/:questionId", question.GetQuestion)
	r.GET("/v1/user/questions", user.LoginRequest, question.GetUserQuestions)
	r.GET("/v1/questions", question.InjectToken, question.GetAllQuestions)
	r.GET("/v1/search", question.GetSearchQuestion)

	// questionLike
	r.POST("/v1/questionlike", user.LoginRequest, questionlike.UploadQuestionLike)

	// answer
	r.POST("/v1/answer/:questionId", user.LoginRequest, answer.PostAnswer)
	r.DELETE("/v1/answer/:answerId", user.LoginRequest, answer.DeleteAnswer)
	r.PATCH("/v1/answer/:answerId", user.LoginRequest, answer.PatchAnswer)
	r.GET("/v1/allanswers/:questionId", answer.GetAllAnswerByQuestionId)
	r.GET("/v1/user/answers", user.LoginRequest, answer.GetAllAnswerByUserId)
	r.GET("/v1/answer/:answerId", answer.GetAllAnswerById)
	r.GET("/v1/getHotTopic", answer.GetHotTopic)
	// comment
	r.POST("/v1/comment", user.LoginRequest, comment.CreateComment)
	r.GET("/v1/comments/:answerId", comment.GetCommentsByAnswerId)

	r.Run(":9000") // 监听并在 0.0.0.0:8080 上启动服务
}
