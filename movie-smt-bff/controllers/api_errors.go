package controllers

type apiError struct {
	Message string `json:"message"`
}

var nameNotSuppliedError = apiError{Message: "query parameter 'name' must be supplied!"}
var internalServerErrorError = apiError{Message: "internal server error"}
