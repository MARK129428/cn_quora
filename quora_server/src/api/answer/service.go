package answer

import (
	"fmt"
	"quora_server/src/db"
	"strconv"
)

func CreateAnswer(answer *Answer) *Answer {
	data := db.DB.Create(answer)
	if err := data.Error; err != nil {
		fmt.Println("插入失败", err)
		return nil
	}
	return answer
}

func GetAllAnswerByQuestionIdService(questionId string, limit string, page string) (*[]Answer, *int64) {
	var answers []Answer
	Limit, _ := strconv.Atoi(limit)
	Page, _ := strconv.Atoi(page)
	find := db.DB.
		Limit(Limit).
		Offset(Page).
		Where("question_id =?", questionId).
		Find(&answers)
	var count int64
	db.DB.Model(&Answer{}).Where("question_id =?", questionId).Count(&count)
	if find.RowsAffected == 0 {
		return nil, nil
	}
	return &answers, &count
}

func GetAllAnswerByUserIdService(userId string, limit string, page string) (*[]Answer, *int64) {
	var answers []Answer
	Limit, _ := strconv.Atoi(limit)
	Page, _ := strconv.Atoi(page)
	find := db.DB.
		Limit(Limit).
		Offset(Page).
		Where("user_id =?", userId).
		Find(&answers)
	var count int64
	db.DB.Model(&Answer{}).Where("user_id =?", userId).Count(&count)
	if find.RowsAffected == 0 {
		return nil, nil
	}
	return &answers, &count
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
	return &Answer{Title: title, Content: content}
}

type QuestionCount struct {
	QuestionId int
	Count      int
}

func GetHotTopicService() []*QuestionCount {
	var datas []*QuestionCount
	exec := db.DB.
		Raw("SELECT question_id, COUNT(*) AS `count` FROM answers GROUP BY question_id ORDER BY `count` DESC LIMIT 10").
		Scan(&datas)
	if exec.RowsAffected == 0 {
		return nil
	}
	return datas
}
