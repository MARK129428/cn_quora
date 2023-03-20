package comment

type Comment struct {
	Id       int64  `json:"id"`
	UserId   string `json:"userId"`
	AnswerId string `json:"answerId"`
	Content  string `json:"content"`
}
