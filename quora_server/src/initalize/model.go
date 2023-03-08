package initalize

import (
	"gorm.io/gorm"
	"quora_server/src/user"
)

func Model(DB *gorm.DB) {
	DB.AutoMigrate(&user.User{})
}
