package answer

type Answer struct {
	ID      int64  `json:"id,omitempty" gorm:"primaryKey"`
	Title string `json:"title,omitempty" gorm:""`
	Content string `json: "content"`
	UserId  string `json: "userId"`
	QuestionId int64 `json: "questionId"`
}
