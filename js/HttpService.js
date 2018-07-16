'use strict'

var HttpService = angular.module("HttpService", [])

    .service('testService', function(){
        this.plus = function(a){
            return a+a
        }
    })