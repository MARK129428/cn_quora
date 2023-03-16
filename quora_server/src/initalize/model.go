package initalize

import (
	"gorm.io/gorm"
	"quora_server/src/api/article"
	"quora_server/src/api/user"
)

func Model(DB *gorm.DB) {
	DB.AutoMigrate(&user.User{})
	DB.AutoMigrate(&article.Article{})
}
