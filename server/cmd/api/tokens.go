package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/pascaldekloe/jwt"
	"golang.org/x/crypto/bcrypt"
	"net/http"
	"server/models"
	"time"
)

var validUser = models.User{
	ID:       10,
	Email:    "me@here.com",
	Password: "$2a$12$AT7yIZsv9dbM/VUdw/qmlevFiHnv.oW2Jvpu/EjHknO.Z080SkzOC",
}

type Credentials struct {
	Username string `json:"email"`
	Password string `json:"password"`
}

func (app *application) signin(w http.ResponseWriter, r *http.Request) {
	var creds Credentials

	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		app.errorJSON(w, errors.New("unauthorized"))
		return
	}

	// in a live app, this would be a db query
	hashedPassword := validUser.Password

	if creds.Username != validUser.Email {
		app.errorJSON(w, errors.New("invalid email/password"))
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(creds.Password))
	if err != nil {
		app.errorJSON(w, errors.New("invalid email/password"))
		return
	}

	var claims jwt.Claims
	claims.Subject = fmt.Sprint(validUser.ID)
	claims.Issued = jwt.NewNumericTime(time.Now())
	claims.NotBefore = jwt.NewNumericTime(time.Now())
	claims.Expires = jwt.NewNumericTime(time.Now().Add(24 * time.Hour))
	claims.Issuer = "go-movies.usmanzaheer.com"
	claims.Audiences = []string{"go-movies.usmanzaheer.com"}

	jwtBytes, err := claims.HMACSign(jwt.HS256, []byte(app.config.jwt.secret))
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	app.WriteJSON(w, http.StatusOK, string(jwtBytes), "response")
}
