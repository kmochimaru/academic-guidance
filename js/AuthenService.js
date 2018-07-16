'use strict'
angular.module('AuthenService', [])

    .service('Authen', function () {
        var username
        var name
        var surname
        var level
        var loggedin = false

        this.setName = function (name) {
            name = name
        }

        this.getName = function () {
            return this.name
        }

        this.setSurname = function (surname) {
            this.surname = surname
        }

        this.getSurname = function () {
            return this.surname
        }

        this.setUsername = function (username) {
            this.username = username
        }

        this.getUsername = function () {
            return this.username
        }

        this.setLevel = function (level) {
            this.level = level
        }

        this.getLevel = function () {
            return this.level
        }

        this.saveData = function (obj) {
            name = obj.name
            surname = obj.surname
            username = obj.email
            level = obj.level
            localStorage.setItem('login', JSON.stringify({
                name: name,
                surname: surname,
                username: username,
                level: level
            }))
        }

        this.clearData = function () {
            localStorage.removeItem("login")
            name = ""
            surname = ""
            username = ""
            level = ""
            loggedin = false
        }

        this.isUserLoggedIn = function () {
            if (!!localStorage.getItem("login")) {
                loggedin = true
                var data = JSON.parse(localStorage.getItem("login"))
                this.name = data.name
                this.surname = data.surname
                this.username = data.username
                this.level = data.level
            }
            return loggedin
        }

    })
