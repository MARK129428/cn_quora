package questionlike

type QuestionLike struct {
	ID int64 `json:"id,omitempty" gorm:"primaryKey"`
	UserID string `json:"userId"`
	QuestionId string `json:"questionId"`
	IsLike bool `json:"isLike"`
}
