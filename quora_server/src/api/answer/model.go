package question

type Question struct {
	ID      int64  `json:"id,omitempty" gorm:"primaryKey"`
	Content string `json: "content"`
	UserId  string `json: "userId"`
	Like int64 `json: "like" default:0`
	DisLike int64 `json: "dislike" default:0`
}
