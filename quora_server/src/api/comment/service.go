package comment

import (
	"fmt"
	"quora_server/src/db"
	"strconv"
)

func CreateCommentService(comment Comment) *Comment {
	create := db.DB.Create(&comment)
	if create.Error != nil {
		fmt.Println("插入失败")
		return nil
	}
	return &comment
}

func GetCommentsByAnswerIdService(answerId string, limit string, page string) ([]*Comment, *int64) {
	var comments []*Comment
	Limit, _ := strconv.Atoi(limit)
	Page, _ := strconv.Atoi(page)
	find := db.DB.
		Limit(Limit).
		Offset(Page*Limit).
		Where("answer_id = ?", answerId).
		Find(&comments)
	var count int64
	db.DB.Model(&Comment{}).Count(&count)
	if find.RowsAffected == 0 {
		return nil, nil
	}
	return comments, &count
}
