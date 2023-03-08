package user

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"net/http"
	"quora_server/src/utils"
)

func Signup(c *gin.Context) {
	username := c.PostForm("username")
	password := c.PostForm("password")
	Md5Password := utils.Md5(password)

	u := User{
		Model:    gorm.Model{},
		Password: Md5Password,
		Email:    "",
		Username: username,
		Avatar:   "",
	}
	if SigninService(&u) != nil {
		c.JSON(http.StatusOK, gin.H{
			"message": "用户已经存在",
		})
		return
	}

	service := SignupService(&u)
	if service > 0 {
		c.JSON(http.StatusOK, gin.H{
			"message": "success",
		})
		return
	}
	c.JSON(http.StatusInternalServerError, gin.H{
		"message": "error",
	})
}

func Signin(c *gin.Context) {
	username := c.PostForm("username")
	password := c.PostForm("password")
	Md5Password := utils.Md5(password)

	u := User{
		Model:    gorm.Model{},
		Password: Md5Password,
		Email:    "",
		Username: username,
		Avatar:   "",
	}

	service := SigninService(&u)
	if service != nil {
		token, err := utils.GenerateToken(u.Password, u.Username, 60)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "error",
			})
		}
		c.JSON(200, gin.H{
			"message": "success",
			"token":   token,
		})
		return
	}
	c.JSON(500, gin.H{
		"message": "error",
	})
}

func Update(c *gin.Context) {
	username := c.PostForm("username")
	email := c.PostForm("email")
	avatar := c.PostForm("avatar")
	token := c.GetStringMapString("token")

	u := User{
		Model:    gorm.Model{},
		Email:    email,
		Username: username,
		Avatar:   avatar,
	}
	service := UpdateService(&u, token)
	if service == nil {
		c.JSON(500, gin.H{
			"message": "error",
		})
	} else {
		c.JSON(200, gin.H{
			"message": "success",
			"data":    service,
		})
	}
}
