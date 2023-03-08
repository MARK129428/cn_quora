package user

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Password string `json:"password"`
	Email    string `json:"email"`
	Username string `"default:'小王子' json:"username"`
	Avatar   string `"default:'0' json:"avatar"`
}
