package answer

import (
	"fmt"
	"quora_server/src/db"
)

func CreateAnswer(answer *Answer) *Answer {
	data := db.DB.Create(answer)
	if err := data.Error; err != nil {
		fmt.Println("插入失败", err)
		return nil
	}
	return answer
}

func GetAllAnswerByQuestionIdService(questionId string) *[]Answer {
	var answers []Answer
	find := db.DB.
		Limit(10).
		Offset(0).
		Where("question_id =?", questionId).
		Find(&answers)
	if find.RowsAffected == 0 {
		return nil
	}
	return &answers
}

func GetAllAnswerByUserIdService(userId string) *[]Answer {
	var answers []Answer
	find := db.DB.
		Limit(10).
		Offset(0).
		Where("user_id =?", userId).
		Find(&answers)
	if find.RowsAffected == 0 {
		return nil
	}
	return &answers
}

func GetAllAnswerByIdService(Id string) *Answer {
	var answer Answer
	find := db.DB.Where("id =?", Id).
		First(&answer)
	if find.RowsAffected == 0 {
		return nil
	}
	return &answer
}

func DeleteAnswerService(answerId string, userId string) *Answer {
	var answer *Answer = nil
	db.DB.Where("id = ? AND user_id = ?", answerId, userId).Delete(&answer)
	if answer == nil {
		return nil
	}
	return answer
}

func PatchAnswerService(answerId string, userId string, title string, content string) *Answer {
	update := db.DB.
		Model(&Answer{}).
		Where("id = ? AND user_id = ?", answerId, userId).
		Updates(&Answer{Title: title, Content: content})
	if update.RowsAffected == 0 {
		return nil
	}
	return &Answer{ Title: title, Content: content}
}