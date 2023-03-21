package question

import (
	"fmt"
	"quora_server/src/db"
	"strconv"
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

func GetUserQuestionsService(id string, limit string, page string) (*[]Question, *int64) {
	var questions []Question
	Limit, _ := strconv.Atoi(limit)
	Page, _ := strconv.Atoi(page)
	find := db.DB.
		Limit(Limit).
		Offset(Page*Limit).
		Where("user_id =?", id).
		Find(&questions)
	var count int64
	db.DB.Model(&Question{}).Where("user_id =?", id).Count(&count)
	if find.RowsAffected == 0 {
		return nil, nil
	}
	return &questions, &count
}

func GetAllQuestionService(limit string, page string) (*[]Question, *int64) {
	var questions []Question
	Limit, _ := strconv.Atoi(limit)
	Page, _ := strconv.Atoi(page)
	find := db.DB.
		Limit(Limit).
		Offset(Page * Limit).
		Find(&questions)
	var count int64
	db.DB.Model(&Question{}).Count(&count)
	if find.RowsAffected == 0 {
		return nil, nil
	}
	return &questions, &count
}

func SearchQuestionService(str string) *[]Question {
	var questions []Question
	find := db.DB.Where("content LIKE ?", fmt.Sprintf("%s%s%s", "%", str, "%")).Limit(5).Find(&questions)
	if find.RowsAffected == 0 {
		return nil
	}
	return &questions
}