package user

import (
	"fmt"
	"quora_server/src/db"
)

func SignupService(u *User) int64 {
	create := db.DB.Create(u)
	if err := create.Error; err != nil {
		fmt.Println("插入失败", err)
		return 0
	}
	return create.RowsAffected // 返回插入记录的条数
}

func SigninService(u *User) *User {
	find := db.DB.First(u)
	if err := find.Error; err != nil {
		fmt.Println("查找失败", err)
		return nil
	}
	return u
}

func UpdateService(u *User, token map[string]string) *User {
	data := db.DB.Model(&User{}).Where("username = ? && password = ?", token["Username"], token["Password"]).Updates(&u)
	if data.RowsAffected == 0 {
		fmt.Println("出错；额")
		return nil
	}
	return u
}
