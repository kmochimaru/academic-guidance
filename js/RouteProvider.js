'use strict'

angular.module('RouteProvider', ['ngRoute']).config(function ($routeProvider) {

    $routeProvider
        // route for the dashboard page
        .when('/', {
            templateUrl: './general/home.html'
        })

        // route for the information_faculty
        .when('/information_faculty', {
            templateUrl: './general/information_faculty.html',
            controller: 'informationController'
        })

        // route for the information_program
        .when('/information_program', {
            templateUrl: './general/information_program.html',
            controller: 'informationController'
        })

        // route for the information_program detail
        .when('/information_program/:program_id', {
            templateUrl: './general/information_program_detail.html',
            controller: 'detailProgramController'
        })

        // route for the login page
        .when('/login', {
            resolve: {
                check: function ($location, Authen) {
                    if (!Authen.isUserLoggedIn()) {
                        $location.path("/login")
                    }
                }
            },
            templateUrl: './login/login.html',
            controller: 'mainController'
        })

        // route for the register page
        .when('/register', {
            resolve: {
                check: function ($location, Authen) {
                    if (!Authen.isUserLoggedIn()) {
                        $location.path("/register")
                    }
                }
            },
            templateUrl: './login/register.html',
            controller: 'mainController'
        })

        // route for the logout 
        .when('/logout', {
            resolve: {
                deadResolve: function ($rootScope, $location, Authen) {
                    Authen.clearData()
                    $rootScope.$broadcast('LoggedIn', false)
                    $location.path('/login')
                }
            }
        })

        // route for the dashboard 
        .when('/dashboard', {
            resolve: {
                check: function ($location, Authen) {
                    if (!Authen.isUserLoggedIn()) {
                        $location.path("/login")
                    }
                }
            },
            templateUrl: './admin-pages/dashboard.html',
        })

        // route for the adminProfile page
        .when('/adminProfile', {
            resolve: {
                check: function ($location, Authen) {
                    if (!Authen.isUserLoggedIn()) {
                        $location.path("/login")
                    }
                }
            },
            templateUrl: './admin-pages/adminProfile.html',
            controller: 'editProfileController'
        })

        // route for the member page
        .when('/member', {
            resolve: {
                check: function ($location, Authen) {
                    if (!Authen.isUserLoggedIn()) {
                        $location.path("/login")
                    }
                }
            },
            templateUrl: './admin-pages/member.html',
            controller: 'memberController'
        })

        // route for the faculty page
        .when('/faculty', {
            resolve: {
                check: function ($location, Authen) {
                    if (!Authen.isUserLoggedIn()) {
                        $location.path("/login")
                    }
                }
            },
            templateUrl: './admin-pages/faculty.html',
            controller: 'facultyController'
        })

        // route for the program page
        .when('/program', {
            resolve: {
                check: function ($location, Authen) {
                    if (!Authen.isUserLoggedIn()) {
                        $location.path("/login")
                    }
                }
            },
            templateUrl: './admin-pages/program.html',
            controller: 'programController'
        })

        // route for the addProgram page
        .when('/addProgram', {
            resolve: {
                check: function ($location, Authen) {
                    if (!Authen.isUserLoggedIn()) {
                        $location.path("/login")
                    }
                }
            },
            templateUrl: './admin-pages/addProgram.html',
            controller: 'programController'
        })

        // route for the editProgram page
        .when('/editProgram/:program_id', {
            resolve: {
                check: function ($location, Authen) {
                    if (!Authen.isUserLoggedIn()) {
                        $location.path("/login")
                    }
                }
            },
            templateUrl: './admin-pages/updateProgram.html',
            controller: 'editProgramController'
        })

        // route for the reportEducation page
        .when('/reportEducation', {
            resolve: {
                check: function ($location, Authen) {
                    if (!Authen.isUserLoggedIn()) {
                        $location.path("/login")
                    }
                }
            },
            templateUrl: './admin-pages/reportEducation.html',
            controller: 'reportEducationController'
        })

        // route for the resultInterest page
        .when('/resultInterest', {
            resolve: {
                check: function ($location, Authen) {
                    if (!Authen.isUserLoggedIn()) {
                        $location.path("/login")
                    }
                }
            },
            templateUrl: './admin-pages/resultInterest.html',
            controller: 'resultController'
        })

        // route for the resultOrientation page
        .when('/resultOrientation', {
            resolve: {
                check: function ($location, Authen) {
                    if (!Authen.isUserLoggedIn()) {
                        $location.path("/login")
                    }
                }
            },
            templateUrl: './admin-pages/resultOrientation.html',
            controller: 'resultController'
        })

        // route for the reportPersonality page
        .when('/reportPersonality', {
            resolve: {
                check: function ($location, Authen) {
                    if (!Authen.isUserLoggedIn()) {
                        $location.path("/login")
                    }
                }
            },
            templateUrl: './admin-pages/reportPersonality.html',
            controller: 'reportPersonalityController'
        })

        // route for the interest page
        .when('/interest', {
            resolve: {
                check: function ($location, Authen) {
                    if (!Authen.isUserLoggedIn()) {
                        $location.path("/login")
                    }
                }
            },
            templateUrl: './user-pages/interest.html',
            controller: 'interestController'
        })

        // route for the orientation page
        .when('/orientation', {
            resolve: {
                check: function ($location, Authen) {
                    if (!Authen.isUserLoggedIn()) {
                        $location.path("/login")
                    }
                }
            },
            templateUrl: './user-pages/orientation.html',
            controller: 'orientationController'
        })

        // route for the homeStudent page
        .when('/homeStudent', {
            resolve: {
                check: function ($location, Authen) {
                    if (!Authen.isUserLoggedIn()) {
                        $location.path("/login")
                    }
                }
            },
            templateUrl: './user-pages/home.html',
            controller: 'mainController'
        })

        // route for the userProfile page
        .when('/userProfile', {
            resolve: {
                check: function ($location, Authen) {
                    if (!Authen.isUserLoggedIn()) {
                        $location.path("/login")
                    }
                }
            },
            templateUrl: './user-pages/userProfile.html',
            controller: 'editProfileController'
        })

        // route for the reportProgram page
        .when('/404', {
            templateUrl: './admin-pages/status404.html'
        })

        .otherwise({
            redirectTo: '/404'
        });
});