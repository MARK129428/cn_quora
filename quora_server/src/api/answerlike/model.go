package answerlike

type AnswerLike struct {
	ID int64 `json:"id,omitempty" gorm:"primaryKey"`
	UserID int64 `json:"userId"`
	AnswerId int64 `json:"answerId"`
	isLike bool `json:"isLike"`
}

