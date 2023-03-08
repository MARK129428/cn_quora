package utils

import (
	"fmt"
	"github.com/golang-jwt/jwt/v5"
	"quora_server/src/config"
	"time"
)

type MyCustomClaims struct {
	Password string
	Username string
	jwt.RegisteredClaims
}

func GenerateToken(password string, username string, expired time.Duration) (string, error) {
	claims := MyCustomClaims{
		password,
		username,
		jwt.RegisteredClaims{
			// A usual scenario is to set the expiration time relative to the current time
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			NotBefore: jwt.NewNumericDate(time.Now()),
			Issuer:    "test",
			Subject:   "somebody",
			ID:        "1",
			Audience:  []string{"somebody_else"},
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(config.SecretKey)
}
func ParseToken(tokenString string) interface{} {
	token, err := jwt.ParseWithClaims(tokenString, &MyCustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return config.SecretKey, nil
	})
	if _, ok := token.Claims.(*MyCustomClaims); ok && token.Valid {
		return map[string]string{
			"Username": token.Claims.(*MyCustomClaims).Username,
			"Password": token.Claims.(*MyCustomClaims).Password,
		}
	} else {
		fmt.Println(err)
	}
	return nil
}
