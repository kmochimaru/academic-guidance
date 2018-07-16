'use strict'
// create the module and name it myApp
var app = angular.module('myApp', [
    'angularUtils.directives.dirPagination',
    'ui.materialize',
    'ngAnimate',
    'googlechart',
    'RouteProvider',
    'HttpService',
    'AuthenService',
    'EqualService'
]);

// This is the key to view transition happiness!
app.run(function ($rootScope, $timeout, $window) {
    $rootScope.$on('$routeChangeSuccess', function () {
        $timeout(function () {
            $window.scrollTo(0, 0);
        }, 500);
    });
});

// define validation-error directive
app.directive('validationError', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            scope.$watch(attrs['validationError'], function (errMsg) {

                if (errMsg == 'รหัสผ่านไม่ตรงกัน') {
                    elem[0].className = "invalid"
                } else if (elem[0].value != '') {
                    elem[0].className = "valid"
                }

                if (elem[0] && elem[0].setCustomValidity) { // HTML5 validation
                    elem[0].setCustomValidity(errMsg)
                }

                if (ctrl) { // AngularJS validation
                    ctrl.$setValidity('validationError', errMsg ? false : true)
                }
            });
        }
    }
});

// create the controller and inject Angular's $scope, $http
// Admin Controller
app.controller('mainController', function ($scope, $http, $route, $location, $rootScope, $timeout, Authen, testService) {
    //console.log(testService.plus(5))

    $scope.profile = JSON.parse(localStorage.getItem("login"))

    $rootScope.$on('LoggedIn', function ($ev, data) { //Show or Hide nav bar
        if (data) $scope.profile = JSON.parse(localStorage.getItem("login"))
        else $scope.profile = ''
    })

    $scope.loginMember = function (user, pass) {    //login

        $http({
            method: 'POST',
            url: 'database/login.php',
            data: { "action": "login", "user": user, "pass": pass }
        }).then(function success(response) {
            var str = JSON.stringify(response.data)
            var obj = JSON.parse(str)
            if (obj == false) {
                $scope.loading = false   //not loading
                Materialize.toast('อีเมลหรือรหัสผ่านไม่ถูกต้อง !!', 3000, 'rounded')
            } else {
                $scope.loading = true   //loading
                $timeout(function () {
                    Authen.saveData(obj)
                    $rootScope.$broadcast('LoggedIn', true)
                    Materialize.toast('ยินดีต้อนรับเข้าสู่ระบบ', 3000, 'rounded')
                    switch (obj.level) {
                        case "ผู้ดูแลระบบ":
                            $location.path("/dashboard")
                            break;
                        case "นักเรียน":
                            $location.path("/homeStudent")
                            break;
                    }
                }, 1000)
            }
        }, function error(err) {
            console.log(`error  ${err}`)
            Materialize.toast('เข้าสู่ระบบล้มเหลว', 3000, 'rounded')
        }
            )
    }

    var register
    $scope.register = function (regis) {
        register = regis
        $('#confirmRegister').modal('open')
    }

    $scope.confirmRegister = function () {
        register["action"] = "register"          //register action to object users
        $http({
            method: 'POST',
            url: 'database/UsersCtrl/create.php',
            data: register
        }).then(function success(response) {
            if (response.data) {
                Materialize.toast('ลงทะเบียนสำเร็จ', 3000, 'rounded')
                $scope.regis = {}
                $location.path("/login")
            }
            else {
                Materialize.toast('ลงทะเบียนล้มเหลว', 3000, 'rounded')
            }
        }, function error(err) {
            console.log(`error  ${err}`)
            Materialize.toast('ลงทะเบียนล้มเหลว', 3000, 'rounded')
        }
            )
    }

    $scope.select_education = ['วิทย์-คณิต', 'อังกฤษ-คณิต', 'ศิลป์ภาษา']
    $scope.level = ['นักเรียน', 'ผู้ดูแลระบบ']

});

app.controller('informationController', function ($scope, $http) {
    //read Faculty
    $http({
        method: 'GET',
        url: 'database/FacultyCtrl/read.php',
        params: { "action": "read" }
    }).then(function success(response) {
        $scope.AllFaculty = response.data
    }, function error(err) {
        console.log(`error  ${err}`)
        Materialize.toast('ไม่สามารถเข้าดึงข้อมูลคณะได้', 3000, 'rounded')
    }
        )

    //read Program
    $http({
        method: 'GET',
        url: 'database/ProgramCtrl/read.php',
        params: { "action": "read" }
    }).then(function success(response) {
        $scope.AllProgram = response.data
    }, function error(err) {
        console.log(`error  ${err}`)
        Materialize.toast('ไม่สามารถเข้าดึงข้อมูลหลักสูตรได้', 3000, 'rounded')
    }
        )
});

app.controller('detailProgramController', function ($scope, $http, $routeParams) {

    $scope.program_id = $routeParams.program_id
    $http({
        method: 'GET',
        url: 'database/ProgramCtrl/detail.php',
        params: { "action": "detail", "program_id": $routeParams.program_id }
    }).then(function success(response) {
        $scope.detail = response.data
    }, function error(err) {
        console.log(`error ${err}`)
        Materialize.toast('ไม่ได้สามารถตรวจสอบรายละเอียดหลักสูตรได้', 3000, 'rounded')
    })

});

app.controller('editProfileController', function ($scope, $http, $route, Authen) {
    //Dialog Edit member
    $scope.editMember = function (users) {
        users["action"] = "update"          //update action to object users
        users["old_password"] = old_password
        $http({
            method: 'POST',
            url: 'database/UsersCtrl/update.php',
            data: users
        }).then(function success(response) {
            if (response.data) {
                Materialize.toast('แก้ไขข้อมูลสำเร็จ', 3000, 'rounded')
                $('.modal').modal('close')
                $route.reload()
            }
            else {
                Materialize.toast('แก้ไขข้อล้มเหลว', 3000, 'rounded')
            }
        }, function error(err) {
            console.log(`error  ${err}`)
            Materialize.toast('แก้ไขข้อมูลล้มเหลว', 3000, 'rounded')
        }
            )
    }

    var old_password;
    //Load detail dialog edit member
    $http({
        method: 'POST',
        url: 'database/UsersCtrl/detail.php',
        data: { "action": "detail", "email": Authen.getUsername() }
    }).then(function success(response) {
        var str = JSON.stringify(response.data)
        var obj = JSON.parse(str)
        old_password = obj.password
        $scope.edit = obj
    }, function error(err) {
        console.log(`error  ${err}`)
        Materialize.toast('ไม่สามารถเข้าดึงข้อมูลสมาชิกได้', 3000, 'rounded')
    }
        )

});

app.controller('memberController', function ($scope, $http, $route) {
    //Dialog Add member
    $scope.addMember = function (users) {
        users["action"] = "create"          //create action to object users
        $http({
            method: 'POST',
            url: 'database/UsersCtrl/create.php',
            data: users
        }).then(function success(response) {
            if (response.data) {
                Materialize.toast('เพิ่มสมาชิกสำเร็จ', 3000, 'rounded')
                $('.modal').modal('close')
                $route.reload()
            }
            else {
                Materialize.toast('เพิ่มสมาชิกล้มเหลว', 3000, 'rounded')
            }
        }, function error(err) {
            console.log(`error  ${err}`)
            Materialize.toast('เพิ่มสมาชิกล้มเหลว', 3000, 'rounded')
        }
            )
    }
    //Dialog Edit member
    $scope.editMember = function (users) {
        users["action"] = "update"          //update action to object users
        users["old_password"] = old_password
        $http({
            method: 'POST',
            url: 'database/UsersCtrl/update.php',
            data: users
        }).then(function success(response) {
            if (response.data) {
                Materialize.toast('แก้ไขสมาชิกสำเร็จ', 3000, 'rounded')
                $('.modal').modal('close')
                $route.reload()
            }
            else {
                Materialize.toast('แก้ไขสมาชิกล้มเหลว', 3000, 'rounded')
            }
        }, function error(err) {
            console.log(`error  ${err}`)
            Materialize.toast('แก้ไขสมาชิกล้มเหลว', 3000, 'rounded')
        }
            )
    }

    //Load detail dialog edit member
    var old_password;
    $scope.detailUser = function (email) {
        $http({
            method: 'POST',
            url: 'database/UsersCtrl/detail.php',
            data: { "action": "detail", "email": email }
        }).then(function success(response) {
            var str = JSON.stringify(response.data)
            var obj = JSON.parse(str)
            old_password = obj.password
            $scope.edit = obj
        }, function error(err) {
            console.log(`error  ${err}`)
            Materialize.toast('ไม่สามารถเข้าดึงข้อมูลสมาชิกได้', 3000, 'rounded')
        }
            )
    }
    //delete member
    var tmpDelete
    $scope.deleteUser = function (email) {
        tmpDelete = email
    }

    $scope.confirmDelete = function () {
        $http({
            method: 'GET',
            url: 'database/UsersCtrl/delete.php',
            params: { "action": "delete", "email": tmpDelete }
        }).then(function success(response) {
            if (response.data) {
                Materialize.toast('ลบสมาชิกสำเร็จ', 3000, 'rounded')
                $('.modal').modal('close')
                $route.reload()
            } else {
                Materialize.toast('ลบสมาชิกล้มเหลว', 3000, 'rounded')
            }
        }, function error(err) {
            console.log(`error  ${err}`)
            Materialize.toast('ไม่สามารถลบสมาชิกได้', 3000, 'rounded')
        }
            )
    }

    //read member table
    $http({
        method: 'GET',
        url: 'database/UsersCtrl/read.php',
        params: { "action": "read" }
    }).then(function success(response) {
        $scope.Allusers = response.data
    }, function error(err) {
        console.log(`error  ${err}`)
        Materialize.toast('ไม่สามารถเข้าดึงข้อมูลสมาชิกได้', 3000, 'rounded')
    }
        )

    //sort table
    $scope.sort = function (keyname) {
        $scope.sortKey = keyname
        $scope.reverse = !$scope.reverse
    }

});

app.controller('facultyController', function ($scope, $http, $route) {

    //Dialog add Faculty
    $scope.addFaculty = function (faculty) {
        faculty["action"] = "create"          //create action to object faculty
        $http({
            method: 'POST',
            url: 'database/FacultyCtrl/create.php',
            data: faculty
        }).then(function success(response) {
            if (response.data) {
                Materialize.toast('เพิ่มคณะสำเร็จ', 3000, 'rounded')
                $('.modal').modal('close')
                $route.reload()
            }
            else {
                Materialize.toast('เพิ่มคณะล้มเหลว', 3000, 'rounded')
            }
        }, function error(err) {
            console.log(`error  ${err}`)
            Materialize.toast('เพิ่มคณะล้มเหลว', 3000, 'rounded')
        }
            )
    }
    //Dialog Edit Faculty
    $scope.editFaculty = function (faculty) {
        faculty["action"] = "update"          //update action to object Faculty
        $http({
            method: 'POST',
            url: 'database/FacultyCtrl/update.php',
            data: faculty
        }).then(function success(response) {
            if (response.data) {
                Materialize.toast('แก้ไขคณะสำเร็จ', 3000, 'rounded')
                $('.modal').modal('close')
                $route.reload()
            }
            else {
                Materialize.toast('แก้ไขคณะล้มเหลว', 3000, 'rounded')
            }
        }, function error(err) {
            console.log(`error  ${err}`)
            Materialize.toast('แก้ไขคณะล้มเหลว', 3000, 'rounded')
        }
            )
    }
    //Load detail dialog edit Faculty
    $scope.detailFaculty = function (faculty_id) {
        $http({
            method: 'POST',
            url: 'database/FacultyCtrl/detail.php',
            data: { "action": "detail", "faculty_id": faculty_id }
        }).then(function success(response) {
            var str = JSON.stringify(response.data)
            var obj = JSON.parse(str)
            $scope.edit = obj
        }, function error(err) {
            console.log(`error  ${err}`)
            Materialize.toast('ไม่สามารถเข้าดึงข้อมูลคณะได้', 3000, 'rounded')
        }
            )
    }
    //delete Faculty
    var tmpDelete
    $scope.deleteFaculty = function (faculty_id) {
        tmpDelete = faculty_id
    }

    $scope.confirmDelete = function () {
        $http({
            method: 'GET',
            url: 'database/FacultyCtrl/delete.php',
            params: { "action": "delete", "faculty_id": tmpDelete }
        }).then(function success(response) {
            if (response.data) {
                Materialize.toast('ลบคณะสำเร็จ', 3000, 'rounded')
                $('.modal').modal('close')
                $route.reload()
            } else {
                Materialize.toast('ลบคณะล้มเหลว', 3000, 'rounded')
            }
        }, function error(err) {
            console.log(`error  ${err}`)
            Materialize.toast('ไม่สามารถลบคณะได้', 3000, 'rounded')
        }
            )
    }

    //read Faculty
    $http({
        method: 'GET',
        url: 'database/FacultyCtrl/read.php',
        params: { "action": "read" }
    }).then(function success(response) {
        $scope.AllFaculty = response.data
    }, function error(err) {
        console.log(`error  ${err}`)
        Materialize.toast('ไม่สามารถเข้าดึงข้อมูลคณะได้', 3000, 'rounded')
    }
        )

    //sort table
    $scope.sort = function (keyname) {
        $scope.sortKey = keyname
        $scope.reverse = !$scope.reverse
    }
});

app.controller('programController', function ($scope, $http, $route, $location) {

    $scope.month = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
    //$scope.monthShort = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    $scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    $scope.weekdaysFull = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์']
    $scope.weekdaysLetter = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']
    $scope.today = 'วันนี้'
    $scope.clear = 'ล้างค่า'
    $scope.close = 'ปิด'

    $scope.addProgram = function (program) {
        program["action"] = "create"
        $http({
            method: 'POST',
            url: 'database/ProgramCtrl/create.php',
            data: program
        }).then(function success(response) {
            Materialize.toast('เพิ่มหลักสูตรสำเร็จ', 3000, 'rounded')
            $location.path("program")
        }, function error(err) {
            Materialize.toast('เพิ่มหลักสูตรล้มเหลว', 3000, 'rounded')
            console.log(`error  ${err}`)
        }
            )
    }

    //Delete program
    var tmpDelete
    $scope.deleteProgram = function (program_id) {
        tmpDelete = program_id
    }

    $scope.confirmDelete = function () {
        $http({
            method: 'GET',
            url: 'database/ProgramCtrl/delete.php',
            params: { "action": "delete", "program_id": tmpDelete }
        }).then(function success(response) {
            Materialize.toast('ลบหลักสูตรสำเร็จ', 3000, 'rounded')
            $('.modal').modal('close')
            $route.reload()
        }, function error(err) {
            Materialize.toast('ลบหลักสูตรล้มเหลว', 3000, 'rounded')
            $('.modal').modal('close')
            $route.reload()
            console.log(`error  ${err}`)
        }
            )
    }

    //Read program
    $http({
        method: 'GET',
        url: 'database/ProgramCtrl/read.php',
        params: { "action": "read" }
    }).then(function success(response) {
        $scope.AllProgram = response.data
    }, function error(err) {
        console.log(`error  ${err}`)
    }
        )

    //Read faculty
    $http({
        method: 'GET',
        url: 'database/FacultyCtrl/read.php',
        params: { "action": "read" }
    }).then(function success(response) {
        $scope.AllFaculty = response.data
    }, function error(err) {
        console.log(`error  ${err}`)
        Materialize.toast('ไม่สามารถเข้าดึงข้อมูลคณะได้', 3000, 'rounded')
    }
        )

    //sort table
    $scope.sort = function (keyname) {
        $scope.sortKey = keyname
        $scope.reverse = !$scope.reverse
    }

});

app.controller('editProgramController', function ($http, $scope, $routeParams, $location) {

    $scope.month = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
    //$scope.monthShort = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    $scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    $scope.weekdaysFull = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัส', 'ศุกร์', 'เสาร์']
    $scope.weekdaysLetter = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส']
    $scope.today = 'วันนี้'
    $scope.clear = 'ล้างค่า'
    $scope.close = 'ปิด'


    $http({
        method: 'GET',
        url: 'database/ProgramCtrl/detail.php',
        params: { "action": "detail", "program_id": $routeParams.program_id }
    }).then(function success(response) {
        response.data.eng_test = parseInt(response.data.eng_test)
        response.data.knowledge_processing = parseInt(response.data.knowledge_processing)
        response.data.qualification_exam = parseInt(response.data.qualification_exam)
        response.data.expenses = parseInt(response.data.expenses)
        $scope.edit = response.data
    }, function error(err) {
        console.log(`error  ${err}`)
    }
        )

    $scope.updateProgram = function (program) {
        program["action"] = "update"
        $http({
            method: 'POST',
            url: 'database/ProgramCtrl/update.php',
            data: program
        }).then(function success(response) {
            Materialize.toast('แก้ไขหลักสูตรสำเร็จ', 3000, 'rounded')
            $location.path("program")
        }, function error(err) {
            Materialize.toast('แก้ไขหลักสูตรล้มเหลว', 3000, 'rounded')
            console.log(`error  ${err}`)
        }
            )
    }

    //Read faculty 
    $http({
        method: 'GET',
        url: 'database/FacultyCtrl/read.php',
        params: { "action": "read" }
    }).then(function success(response) {
        $scope.AllFaculty = response.data
    }, function error(err) {
        console.log(`error  ${err}`)
        Materialize.toast('ไม่สามารถเข้าดึงข้อมูลคณะได้', 3000, 'rounded')
    }
        )

})

app.controller('reportEducationController', function ($scope, $http) {

    $http({
        method: 'GET',
        url: 'database/UsersCtrl/reportEducation.php',
        params: { 'action': 'readEducation' }
    }).then(function success(response) {
        $scope.report = response.data
        $scope.countAll = response.data.reduce((total, amount) => total + amount.count, 0)
    })

});

app.controller('reportPersonalityController', function ($scope, $http) {

    var R = 0, I = 0, S = 0, C = 0, E = 0, A = 0

    $http({
        method: 'GET',
        url: 'database/ReportCtrl/read.php',
        params: { 'action': 'read', 'title': 'test1' }
    }).then(function success(response) {

        for (let j = 0; j < 6; j++) {

            for (let i = 0; i < response.data.length; i++) {

                let test1 = JSON.parse(response.data[i].result)
                switch (j) {
                    case 0:
                        R += test1.R
                        break
                    case 1:
                        I += test1.I
                        break
                    case 2:
                        S += test1.S
                        break
                    case 3:
                        C += test1.C
                        break
                    case 4:
                        E += test1.E
                        break
                    case 5:
                        A += test1.A
                        break
                }

            }
        }

        let total = R + I + S + C + E + A
        R = (R / total) * 100
        I = (I / total) * 100
        S = (S / total) * 100
        C = (C / total) * 100
        E = (E / total) * 100
        A = (A / total) * 100

        //ColumnChart
        $scope.chartTest1 = {};

        $scope.chartTest1.type = "ColumnChart";

        $scope.chartTest1.data = {
            "cols": [
                { id: "t", label: "Topping", type: "string" },
                { id: "s", label: "เปอร์เซ็นบุคลิกภาพ", type: "number" }
            ], "rows": [
                {
                    c: [
                        { v: "Realistic" },
                        { v: R },
                    ]
                },
                {
                    c: [
                        { v: "Invertigative" },
                        { v: I }
                    ]
                },
                {
                    c: [
                        { v: "Social" },
                        { v: S },
                    ]
                },
                {
                    c: [
                        { v: "Conventional" },
                        { v: C },
                    ]
                },
                {
                    c: [
                        { v: "Enterprising" },
                        { v: E },
                    ]
                },
                {
                    c: [
                        { v: "Artistic" },
                        { v: A },
                    ]
                }
            ]
        };

        $scope.chartTest1.options = {
            'title': 'รายงานการแปลผลแบบทดสอบความสนใจทางอาชีพ'
        };
    })




    var D = 0, P = 0, T = 0

    $http({
        method: 'GET',
        url: 'database/ReportCtrl/read.php',
        params: { 'action': 'read', 'title': 'test2' }
    }).then(function success(response) {
        for (let j = 0; j < 3; j++) {

            for (let i = 0; i < response.data.length; i++) {

                let test2 = JSON.parse(response.data[i].result)
                switch (j) {
                    case 0:
                        D += test2.D
                        break
                    case 1:
                        P += test2.P
                        break
                    case 2:
                        T += test2.T
                        break
                }

            }
        }

        let total = D + P + T
        D = (D / total) * 100
        P = (P / total) * 100
        T = (T / total) * 100

        //ColumnChart
        $scope.chartTest2 = {};

        $scope.chartTest2.type = "ColumnChart";

        $scope.chartTest2.data = {
            "cols": [
                { id: "t", label: "Topping", type: "string" },
                { id: "s", label: "เปอร์เซ็นบุคลิกภาพ", type: "number" }
            ], "rows": [
                {
                    c: [
                        { v: "Data" },
                        { v: D },
                    ]
                },
                {
                    c: [
                        { v: "Person" },
                        { v: P },
                    ]
                },
                {
                    c: [
                        { v: "Tool" },
                        { v: T },
                    ]
                }
            ]
        };

        $scope.chartTest2.options = {
            'title': 'รายงานการแปลผลแบบทดสอบความถนัดทางอาชีพ'
        };
    })


});

//Interest Controller
app.controller('interestController', function ($scope, $http, $route, Authen, Equal) {

    Authen.isUserLoggedIn()
    var jsonArr = []
    var type = []
    var R = [1, 7, 13, 19, 25, 31, 37, 43, 49]
    var I = [2, 8, 14, 20, 26, 32, 38, 44, 50]
    var S = [3, 9, 15, 21, 27, 33, 39, 45, 51]
    var C = [4, 10, 16, 22, 28, 34, 40, 46, 52]
    var E = [5, 11, 17, 23, 29, 35, 41, 47, 53]
    var A = [6, 12, 18, 24, 30, 36, 42, 48, 54]

    $http({
        method: 'GET',
        url: 'user-pages/vocational.json'
    }).then(function success(response) {
        $scope.test1 = response.data
    })

    $scope.getRadio = function (ordinal_numbers, choice) {

        if (choice == "A") choice = 2;           //  A
        else if (choice == "B") choice = 1;      //  B
        else choice = 0;                         //  X
        for (let i = 0; i < jsonArr.length; i++) {
            if (jsonArr[i].ordinal_numbers == ordinal_numbers) {
                jsonArr.splice(i, 1);
            }
        }
        jsonArr.push({ "ordinal_numbers": ordinal_numbers, "choice": choice })
    }

    $scope.analyze = function () {
        var result = []    // R I S C E A
        var point = 0
        var total_point = jsonArr.reduce((total, amount) => total + amount.choice, 0)
        for (let k = 0; k < 6; k++) {
            if (k == 0) type = R
            else if (k == 1) type = I
            else if (k == 2) type = S
            else if (k == 3) type = C
            else if (k == 4) type = E
            else if (k == 5) type = A
            for (let i = 0; i < type.length; i++) {
                var index = type[i]
                for (let j = 0; j < jsonArr.length; j++) {
                    if (jsonArr[j].ordinal_numbers == index) {
                        point += jsonArr[j].choice
                    }
                }
            }
            result.push(point)
            point = 0

        }
        var title_name = ["บุคลิกแบบ R (Realistic)",
            "บุคลิกแบบ I (Investigative)",
            "บุคลิกแบบ S (Social)",
            "บุคลิกแบบ C (Conventional)",
            "บุคลิกแบบ E (Enterprising)",
            "บุคลิกแบบ A (Artistic)"]
        var description = ["บุคลิกภาพแบบนิยมความจริง",
            "บุคลิกภาพแบบช่างคิด",
            "บุคลิกภาพชอบเข้าสังคม",
            "บุคลิกภาพแบบจารีตนิยม",
            "บุคลิกภาพแบบกล้าเสี่ยง",
            "บุคลิกภาพแบบรักศิลปะ"]
        var detailObj = {}
        var detailArr = []

        // object result detail 
        for (let k = 0; k < 6; k++) {
            detailObj = { "title": title_name[k], "description": description[k], "point": result[k], "percent": (result[k] / total_point) * 100 }
            detailArr.push(detailObj)
        }
        $scope.details = detailArr

        if (Equal.isEqual(result, [0, 0, 0, 0, 0, 0]) ||
            Equal.isEqual(result, [9, 9, 9, 9, 9, 9]) ||
            Equal.isEqual(result, [18, 18, 18, 18, 18, 18])
        ) {
            swal({
                title: "เกิดข้อผิดพลาด !",
                text: "กรุณาทำแบบทดสอบอีกครั้ง",
                icon: "warning",
                button: "ตกลง",
            })
                .then((value) => {
                    $route.reload()
                });
        } else {
            var title
            var indexOfMaxValue = result.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)
            switch (indexOfMaxValue) {
                case 0: title = "Realistic";
                    break;
                case 1: title = "Investigative";
                    break;
                case 2: title = "Social";
                    break;
                case 3: title = "Conventional";
                    break;
                case 4: title = "Enterprising";
                    break;
                case 5: title = "Artistic";
                    break;
            }

            $http({
                method: "GET",
                url: "database/GuidanceCtrl/result.php",
                params: { "action": "result", "type": "test1", "title": title }
            }).then(function success(response) {
                $scope.result = response.data[0]
                $scope.personality = result
                $("#result").modal("open")
            }, function error(err) {
                console.log(err)
            }
                )


            //Delete report
            $http({
                method: "POST",
                url: "database/ReportCtrl/delete.php",
                params: { "action": "delete", "email": Authen.getUsername(), "title": "test1" }
            }).then(function success(response) {
                //console.log(response)
            }, function error(err) {
                console.log(err)
            }
                )

            //Add report
            var resultObj = {
                "R": result[0],
                "I": result[1],
                "S": result[2],
                "C": result[3],
                "E": result[4],
                "A": result[5]
            }

            var report = {
                "action": "create",
                "title": "test1",
                "result": JSON.stringify(resultObj),
                "email": Authen.getUsername()
            }

            $http({
                method: "POST",
                url: "database/ReportCtrl/create.php",
                data: report
            }).then(function success(response) {
                //console.log(response)
            }, function error(err) {
                console.log(err)
            }
                )
        }
    }

})

//Orientation Controller
app.controller('orientationController', function ($scope, $http, $route, Authen, Equal) {

    Authen.isUserLoggedIn()
    var jsonArr = []
    var point = []
    var P = 0, D = 0, T = 0

    $http({
        method: 'GET',
        url: 'user-pages/orientation.json'
    }).then(function success(response) {
        $scope.test2 = response.data
    })

    $scope.getRadio = function (ordinal_numbers, choice) {
        if (choice == "A") choice = 2;           //  A
        else if (choice == "B") choice = 1;      //  B
        else choice = 0;                         //  X
        for (let i = 0; i < jsonArr.length; i++) {
            if (jsonArr[i].ordinal_numbers == ordinal_numbers) {
                jsonArr.splice(i, 1);
            }
        }
        jsonArr.push({ 'ordinal_numbers': ordinal_numbers, 'choice': choice })
    }

    $scope.analyze = function () {

        var total_point = jsonArr.reduce((total, amount) => total + amount.choice, 0)
        for (let i = 0; i < jsonArr.length; i++) {
            let str = jsonArr[i].ordinal_numbers.substring(jsonArr[i].ordinal_numbers.length - 2)
            if (str == ".1") P += jsonArr[i].choice
            else if (str == ".2") D += jsonArr[i].choice
            else if (str == ".3") T += jsonArr[i].choice
        }
        point.push(D)
        point.push(P)
        point.push(T)

        var title_name = ["ความถนัดด้านข้อมูล (Data)", "ความถนัดด้านบุคคล (Person)", "ความถนัดด้านเครื่องมือ (Tool)"]
        var detailObj = {}
        var detailArr = []

        // object result detail 
        for (let k = 0; k < 3; k++) {
            detailObj = { "title": title_name[k], "point": point[k], "percent": (point[k] / total_point) * 100 }
            detailArr.push(detailObj)
        }
        $scope.details = detailArr

        if (Equal.isEqual(point, [0, 0, 0]) ||
            Equal.isEqual(point, [18, 18, 18]) ||
            Equal.isEqual(point, [36, 36, 36])
        ) {
            swal({
                title: "เกิดข้อผิดพลาด !",
                text: "กรุณาทำแบบทดสอบอีกครั้ง",
                icon: "warning",
                button: "ตกลง",
            })
                .then((value) => {
                    $route.reload()
                });
        } else {

            $scope.personality = point
            var title
            var indexOfMaxValue = point.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)
            switch (indexOfMaxValue) {
                case 0: title = "Data";
                    break;
                case 1: title = "Personal";
                    break;
                case 2: title = "Tool";
                    break;
            }

            $http({
                method: "GET",
                url: "database/GuidanceCtrl/result.php",
                params: { "action": "result", "type": "test2", "title": title }
            }).then(function success(response) {
                $scope.result = response.data[0]
                $("#result").modal("open")
            }, function error(err) {
                console.log(err)
            }
                )
            $("#result").modal("open")


            //Delete report
            $http({
                method: "POST",
                url: "database/ReportCtrl/delete.php",
                params: { "action": "delete", "email": Authen.getUsername(), "title": "test2" }
            }).then(function success(response) {
                // console.log("delete "+response)
            }, function error(err) {
                console.log(err)
            }
                )

            //Add report
            var resultObj = {
                "D": point[0],
                "P": point[1],
                "T": point[2]
            }

            var report = {
                "action": "create",
                "title": "test2",
                "result": JSON.stringify(resultObj),
                "email": Authen.getUsername()
            }

            $http({
                method: "POST",
                url: "database/ReportCtrl/create.php",
                data: report
            }).then(function success(response) {
                // console.log("add report "+response)
            }, function error(err) {
                console.log(err)
            }
                )
        }
    }
})

app.controller("resultController", function ($scope, $http, $route) {

    $http({
        method: "GET",
        url: "database/GuidanceCtrl/read.php",
        params: { "action": "read", "type": "test1" }
    }).then(function success(response) {
        $scope.result1 = response.data
    }, function error(err) {
        console.log(err)
    }
        )

    $http({
        method: "GET",
        url: "database/GuidanceCtrl/read.php",
        params: { "action": "read", "type": "test2" }
    }).then(function success(response) {
        $scope.result2 = response.data
    }, function error(err) {
        console.log(err)
    }
        )

    $scope.addGuidance = function (guidance) {
        guidance["action"] = 'create'
        $http({
            method: "POST",
            url: "database/GuidanceCtrl/create.php",
            data: guidance
        }).then(function success(response) {
            Materialize.toast('เพิ่มคำแนะนำสำเร็จ', 3000, 'rounded')
            $route.reload()
        }, function error(err) {
            Materialize.toast('เพิ่มคำแนะนำล้มเหลว', 3000, 'rounded')
            console.log(err)
        }
            )
    }

    $scope.detailGuidance = function (guidance_id) {
        $http({
            method: "POST",
            url: "database/GuidanceCtrl/detail.php",
            data: { "action": "detail", "guidance_id": guidance_id }
        }).then(function success(response) {
            $scope.edit = response.data
        }, function error(err) {
            console.log(err)
        }
            )
    }

    $scope.editGuidance = function (guidance) {
        guidance["action"] = "update"
        $http({
            method: "POST",
            url: "database/GuidanceCtrl/update.php",
            data: guidance
        }).then(function success(response) {
            Materialize.toast('แก้ไขคำแนะนำสำเร็จ', 3000, 'rounded')
            $route.reload()
        }, function error(err) {
            Materialize.toast('แก้ไขคำแนะนำล้มเหลว', 3000, 'rounded')
            console.log(err)
        }
            )
    }

    var tmpDelete
    $scope.deleteGuidance = function (title) {
        tmpDelete = title
    }

    $scope.confirmDelete = function () {
        $http({
            method: "GET",
            url: "database/GuidanceCtrl/delete.php",
            params: { "action": "delete", "guidance_id": tmpDelete }
        }).then(function success(response) {
            Materialize.toast('ลบคำแนะนำสำเร็จ', 3000, 'rounded')
            $route.reload()
        }, function error(err) {
            Materialize.toast('ลบคำแนะนำล้มเหลว', 3000, 'rounded')
            console.log(err)
        }
            )
    }

    //sort table
    $scope.sort = function (keyname) {
        $scope.sortKey = keyname
        $scope.reverse = !$scope.reverse
    }

})



