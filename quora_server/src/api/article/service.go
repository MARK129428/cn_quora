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
	fmt.Println(u.Username, u.Password, "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
	result := map[string]string{
		"password": u.Password,
	}
	var user User
	find := db.DB.Where(result).First(&user)
	if find.RowsAffected == 0 {
		return nil
	}
	return &user
}

func UpdateService(u *User, token map[string]string) *User {
	data := db.DB.Model(&User{}).Where("password = ?", token["Password"]).Updates(&u)
	if data.RowsAffected == 0 {
		fmt.Println("出错；额")
		return nil
	}
	return u
}
