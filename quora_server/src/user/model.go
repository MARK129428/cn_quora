package user

type User struct {
	ID int64 `json:"id,omitempty" gorm:"primaryKey"`
	Password string `json:"password"`
	Email    string `json:"email"`
	Username string `"default:'小王子' json:"username"`
	Avatar   string `"default:'0' json:"avatar"`
}
