package questionlike

import (
	"fmt"
	"quora_server/src/db"
)

func UploadQuestionLikeService(questionLike QuestionLike) *QuestionLike {
	var q *QuestionLike
	find := db.DB.
		Where("question_id = ? AND user_id = ?",
		&questionLike.QuestionId,
		&questionLike.UserID).
		First(&q)
	if find.RowsAffected == 0 {
		data := db.DB.Create(&questionLike)
		if err := data.Error; err != nil {
			fmt.Println("插入失败", err)
			return nil
		}
		return &questionLike
	}
	if find.RowsAffected != 0 {
		if questionLike.IsLike != q.IsLike {
			db.DB.
				Model(&QuestionLike{}).
				Where("question_id = ? AND user_id = ?",
					&questionLike.QuestionId,
					&questionLike.UserID).
				Update("is_like", questionLike.IsLike)
			questionLike.ID = q.ID
			return &questionLike
		} else {
			var q2 *QuestionLike
			db.DB.Where("question_id = ? AND user_id = ?",
				&questionLike.QuestionId,
				&questionLike.UserID).Delete(&q2)
			return q2
		}
	}
	return nil
}

func GetQuestionLikeNumService(questionId int64) (int64, int64) {
	var likeNum int64
	var dislikeNum int64
	var questions []*QuestionLike
	likeSql := db.DB.Where("question_id = ? AND is_like = ?", questionId, true).Find(&questions)
	likeNum = likeSql.RowsAffected
	dislikeSql := db.DB.Where("question_id = ? AND is_like = ?", questionId, false).Find(&questions)
	dislikeNum = dislikeSql.RowsAffected
	return likeNum, dislikeNum
}

func GetUseLikeQuestion(questionId int64, userId string) *bool {
	var question *QuestionLike
	find := db.DB.Where("question_id = ? AND user_id = ?", questionId, userId).Find(&question)
	if find.RowsAffected == 0 {
		return nil
	}
	return &question.IsLike
}