package article

type Article struct {
	ID int64 `json:"id,omitempty" gorm:"primaryKey"`
	Title string `json:"title"`
	Content string `json: "content"`
	UserId	string `json: "userId"`
}

