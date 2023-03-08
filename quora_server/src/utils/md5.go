package utils

import (
	"crypto/md5"
	"fmt"
	"io"
)

// 配置 Golang Md5 加密
func Md5(str string) string {
	//str传入要加密的字符串
	h := md5.New()
	io.WriteString(h, str)
	return fmt.Sprintf("%x", h.Sum(nil))
}
