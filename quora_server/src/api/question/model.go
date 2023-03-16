package question

type Question struct {
	ID      int64  `json:"id,omitempty" gorm:"primaryKey"`
	Content string `json: "content"`
	UserId  string `json: "userId"`
}
