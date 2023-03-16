package question

import (
	"fmt"
	"quora_server/src/db"
)

func GetQuestionService(questionId string) *Question {
	var question Question
	first := db.DB.Where("id = ?", questionId).First(&question)
	if first.RowsAffected == 0 {
		return nil
	}
	return &question
}

func InsertQuestion(question *Question) *Question {
	fmt.Println(question)
	data := db.DB.Create(question)
	if err := data.Error; err != nil {
		fmt.Println("插入失败", err)
		return nil
	}
	return question
}

func GetUserQuestionsService(id string) *[]Question {
	var questions []Question
	find := db.DB.
		Limit(10).
		Offset(0).
		Where("user_id =?", id).
		Find(&questions)
	if find.RowsAffected == 0 {
		return nil
	}
	return &questions
}
