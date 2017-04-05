'use strict';

angular.module('app',['ui.router','ngCookies']).run(['$rootScope','$http',function($rootScope,$http){
	$rootScope.states=false;
	$rootScope.starImg='image/star.png';
	$rootScope.starImgFlag=false;
	$rootScope.postMsg='投个简历';
	$rootScope.postFlag=false;
	$rootScope.selects={};
	$http.get('data/city.json').then(function(resp){
		$rootScope.selects.city=resp.data;
	});
	$http.get('data/salary.json').then(function(resp){
		$rootScope.selects.salary=resp.data;
	});
	$http.get('data/scale.json').then(function(resp){
		$rootScope.selects.scale=resp.data;
	});
}]);

'use strict';
angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('main', {
            url: '/main',
            templateUrl: 'view/main.html',
            controller: 'mainCtrl'
        }).state('show', {
            url: '/show/:id',
            templateUrl: 'view/show.html',
            controller: 'showCtrl'
        }).state('techRun', {
            url: '/techRun',
            templateUrl: 'view/techRun.html',
            controller: 'techRunCtrl'
        }).state('search', {
            url: '/search',
            templateUrl: 'view/search.html',
            controller: 'searchCtrl'
        }).state('me', {
            url: '/me',
            templateUrl: 'view/me.html',
            controller: 'meCtrl'
        }).state('login', {
            url: '/login',
            templateUrl: 'view/login.html',
            controller: 'loginCtrl'
        }).state('regist', {
            url: '/regist',
            templateUrl: 'view/regist.html',
            controller: 'registCtrl'
        }).state('myPost', {
            url: '/myPost',
            templateUrl: 'view/myPost.html',
            controller: 'myPostCtrl'
        }).state('myFavorite', {
            url: '/myFavorite',
            templateUrl: 'view/myFavorite.html',
            controller: 'myFavoriteCtrl'
        });
    $urlRouterProvider.otherwise('main');
}])

'use strict';

// 后端交互  ajax 请求
angular.module('app').controller('loginCtrl', ['$scope', '$http','$cookies','$cookieStore','$state','$rootScope', function($scope, $http,$cookies,$cookieStore,$state,$rootScope) {
    $scope.confirmLogin=()=>{
    	if($scope.inputTele==$cookies.get('phone') && $scope.inputPwd==$cookies.get('password')){
    		$scope.verifyMsg='';
    		$state.go('main');
    		$rootScope.states=true;
    	}else{
    		$scope.verifyMsg='登录帐号或密码错误';
    	}
    }


    

}])

'use strict';

// 后端交互  ajax 请求
angular.module('app').controller('mainCtrl', ['$scope', '$http', function($scope, $http) {
    $http({
        method: 'get',
        url: 'data/positionList.json',
        responseType: 'json'
    }).then(function(resp) {
        console.log(resp.data);
        $scope.position = resp.data;
    }, function(resp) {
        console.log('请求失败：' + resp.status + ',' + resp.statusText);
    });
    $http({
        method: 'get',
        url: 'data/regist.json',
        responseType: 'json'
    }).then(function(resp) {
        console.log(resp.data);
        $scope.user = resp.data;
    }, function(resp) {
        console.log('请求失败：' + resp.status + ',' + resp.statusText);
    });
    

}])

'use strict';

// 后端交互  ajax 请求
angular.module('app').controller('meCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    $http({
        method: 'get',
        url: 'data/login.json',
        responseType: 'json'
    }).then(function(resp) {
        console.log(resp.data);
        $scope.user = resp.data;
    }, function(resp) {
        console.log('请求失败：' + resp.status + ',' + resp.statusText);
    });

    $scope.logout = () => {
        $rootScope.states = false;
        window.location.reload();
    }

}])

'use strict';

// 后端交互  ajax 请求
angular.module('app').controller('myFavoriteCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    $http({
        method: 'get',
        url: 'data/myFavorite.json',
        responseType: 'json'
    }).then(function(resp) {
        console.log(resp.data);
        $scope.data = resp.data;
    }, function(resp) {
        console.log('请求失败：' + resp.status + ',' + resp.statusText);
    });

    $scope.changeStarImg = () => {
        if (!$rootScope.starImgFlag) {
            $rootScope.starImg = 'image/star-active.png';
            $rootScope.starImgFlag = true;
            console.log($rootScope.starImgFlag);
        } else {
            $rootScope.starImg = 'image/star.png';
            $rootScope.starImgFlag = false;
            console.log($rootScope.starImgFlag);
        }
    }

}])

'use strict';

// 后端交互  ajax 请求
angular.module('app').controller('myPostCtrl', ['$scope', '$http', function($scope, $http) {
    $http({
        method: 'get',
        url: 'data/myPost.json',
        responseType: 'json'
    }).then(function(resp) {
        console.log(resp.data);
        $scope.data = resp.data;
    }, function(resp) {
        console.log('请求失败：' + resp.status + ',' + resp.statusText);
    });
    
    $scope.data = [];
    $scope.showAll = function() {
        $http({
            method: 'get',
            url: 'data/myPost.json',
            responseType: 'json'
        }).then(function(resp) {
            // console.log(resp.data);
            $scope.data = resp.data;
        }, function(resp) {
            console.log('请求失败：' + resp.status + ',' + resp.statusText);
        });
    }

    $scope.showInvite = () => {
        $scope.data = [];
        $http({
            method: 'get',
            url: 'data/myPost.json',
            responseType: 'json'
        }).then(function(resp) {
            for (var i in resp.data) {
                if (resp.data[i].state == '1') {
                    $scope.data.push(resp.data[i]);
                    console.log($scope.data)
                }
            }
        }, function(resp) {
            console.log('请求失败：' + resp.status + ',' + resp.statusText);
        });
    }

    $scope.showNo = () => {
        $scope.data = [];
        $http({
            method: 'get',
            url: 'data/myPost.json',
            responseType: 'json'
        }).then(function(resp) {
            for (var i in resp.data) {
                if (resp.data[i].state == '-1') {
                    $scope.data.push(resp.data[i]);
                    console.log($scope.data)
                }
            }
        }, function(resp) {
            console.log('请求失败：' + resp.status + ',' + resp.statusText);
        });

    }
}])

'use strict';

// 后端交互  ajax 请求
angular.module('app').controller('registCtrl', ['$scope', '$http', '$interval', '$cookies', '$cookieStore', '$state',function($scope, $http, $interval, $cookies, $cookieStore,$state) {
    var tele;
    var pwd;

    $scope.teleVerify = () => {
        if (/^1\d{10}$/.test($scope.teleInfo)) {
            $scope.telePrompt = "✅";
            tele = true;
        } else {
            $scope.telePrompt = "❌";
            tele = false;
        }
    }

    $scope.pwdVerify = () => {
        if (/^\w{6,12}$/.test($scope.pwdInfo)) {
            $scope.pwdPrompt = "✅";
            pwd = true;
        } else {
            $scope.pwdPrompt = "❌";
            pwd = false;
        }
    }

    $scope.seconds = '发送短信';
    $scope.sendMess = () => {
        $scope.flag4 = true;
        $scope.seconds = 5;
        let time = $interval(() => {
            $scope.seconds--;
            if ($scope.seconds <= 0) {
                $interval.cancel(time);
                $scope.seconds = '发送短信';
                $scope.flag4 = false;
            }
        }, 1000);
    }

    $scope.rigt = () => {
        if (tele && pwd) {
            $cookies.put('phone', $scope.teleInfo);
            $cookies.put('password', $scope.pwdInfo);
            $state.go('login');
            console.log("注册成功");
        }
    }

}])

'use strict';

// 后端交互  ajax 请求
angular.module('app').controller('searchCtrl', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {
    $scope.flag3 = true;
    $http({
        method: 'get',
        url: 'data/positionList.json',
        responseType: 'json'
    }).then(function(resp) { 
        console.log(resp.data);
        $scope.position = resp.data;
    }, function(resp) {
        console.log('请求失败：' + resp.status + ',' + resp.statusText);
    });

    // $scope.getCity = function() {

    //     $scope.flag3 = false;
    //     $http({
    //         method: 'get',
    //         url: 'data/city.json',
    //         responseType: 'json'
    //     }).then(function(resp) {
    //         console.log(resp.data);
    //         $scope.data = resp.data;
    //     }, function(resp) {
    //         console.log('请求失败：' + resp.status + ',' + resp.statusText);
    //     });


    // }

    // $scope.getSalary = function() {
    //     $scope.flag3 = false;
    //     $http({
    //         method: 'get',
    //         url: 'data/salary.json',
    //         responseType: 'json'
    //     }).then(function(resp) {
    //         console.log(resp.data);
    //         $scope.data = resp.data;
    //     }, function(resp) {
    //         console.log('请求失败：' + resp.status + ',' + resp.statusText);
    //     });
    // }

    // $scope.getCompany = () => {
    //     $scope.flag3 = false;
    //     $http({
    //         method: 'get',
    //         url: 'data/scale.json',
    //         responseType: 'json'
    //     }).then(function(resp) {
    //         console.log(resp.data);
    //         $scope.data = resp.data;
    //     }, function(resp) {
    //         console.log('请求失败：' + resp.status + ',' + resp.statusText);
    //     });

    // }

    $scope.hid = function() {
        $scope.flag3 = true;
    }

    $scope.tabList = [{
        id: 'city',
        name: '城市'
    }, {
        id: 'salary',
        name: '薪水'
    }, {
        id: 'scale',
        name: '公司规模'
    }];

    $scope.tabClick = function(id, name) {
        console.log('======'+id,name);
        $scope.selectList = $rootScope.selects[id];
        $scope.tabId = id;
        $scope.flag3 = false;
    }

    $scope.filterObj = [];
    $scope.selectClick = function(id, name) {

        if (id) {
            $scope.filterObj[$scope.tabId + 'Id'] = id;
            angular.forEach($scope.tabList, function(item) {
                if (item.id == $scope.tabId) {
                    item.name = name;
                }
            });
        } else {
            delete $scope.filterObj[$scope.tabId + 'Id'];
            angular.forEach($scope.tabList, function(item) {
                if (item.id == $scope.tabId) {
                    switch (item.id) {
                        case 'city':
                            item.name = '城市';
                            break;
                        case 'salary':
                            item.name = '薪水';
                            break;
                        case 'scale':
                            item.name = '公司规模';
                            break;
                    }
                }
            })
        }
    }
}])

'use strict';

// 后端交互  ajax 请求
angular.module('app').controller('showCtrl', ['$scope', '$http', '$state', '$rootScope',function($scope, $http, $state,$rootScope) {
    $http({
        method: 'get',
        url: 'data/position.json?id=' + $state.params.id,
        responseType: 'json'
    }).then(function(resp) {
        console.log(resp.data);
        $scope.details = resp.data;
    }, function(resp) {
        console.log('请求失败：' + resp.status + ',' + resp.statusText);
    });

    $http({
        method: 'get',
        url: 'data/company.json?id=' + $state.params.id,
        responseType: 'json'
    }).then(function(resp) {
        console.log(resp.data);
        $scope.company = resp.data;
    }, function(resp) {
        console.log('请求失败：' + resp.status + ',' + resp.statusText);
    });

    $scope.changeStarImg = () => {
        if (!$rootScope.starImgFlag) {
            $rootScope.starImg = 'image/star-active.png';
            $rootScope.starImgFlag = true;    
            console.log($rootScope.starImgFlag);
        } else {
            $rootScope.starImg = 'image/star.png';
            $rootScope.starImgFlag = false;      
            console.log($rootScope.starImgFlag);
        }
    }

    $scope.post=()=>{
        if(!$rootScope.postFlag){
            $rootScope.postMsg='已投递';
            $rootScope.postFlag = true;    
            console.log($rootScope.postFlag);
        }else{
            $rootScope.postMsg='发送简历';
            $rootScope.postFlag = false;    
            console.log($rootScope.postFlag);
        }
    }

}])

'use strict';

// 后端交互  ajax 请求
angular.module('app').controller('techRunCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $http({
        method: 'get',
        url: 'data/company.json?id=' + $state.params.id,
        responseType: 'json'
    }).then(function(resp) {
        console.log(resp.data);
        $scope.companyy = resp.data;
    }, function(resp) {
        console.log('请求失败：' + resp.status + ',' + resp.statusText);
    });

    $scope.flag1=false;
    $scope.flag2=true;
    $scope.cls1="btColor";
    $scope.doChange1=()=>{
        $scope.flag1=false;
        $scope.flag2=true;
        $scope.cls1="btColor";
        $scope.cls2="btColor2";
    }
    $scope.doChange2=()=>{
        $scope.flag1=true;
        $scope.flag2=false;
        $scope.cls1="btColor2";
        $scope.cls2="btColor";
    }
}])

'user strict';

angular.module('app').directive('appHead', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/head.html'
	};
}]).directive('appFooter', [function () {
	return {
		restrict: 'A',
		replace:true,
		templateUrl: 'view/template/footer.html'
	};
}]).directive('appPositionList', [function () {
	return {
		restrict: 'A',
		replace:true,
		templateUrl: 'view/template/appPositionList.html'
	};
}])


'user strict';

angular.module('app').directive('myFavoriteHead', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/myFavoriteHead.html',
		link: function($scope){
			 $scope.back = function(){
		        window.history.back();
		    }
		}
	};
}]).directive('myFavoriteContent', [function () {
	return {
		restrict: 'A',
		replace:true,
		templateUrl: 'view/template/myFavoriteContent.html'
	};
}])
'user strict';

angular.module('app').directive('myPostHead', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/myPostHead.html',
		link: function($scope){
			 $scope.back = function(){
		        window.history.back();
		    }
		}
	};
}]).directive('myPostContent', [function () {
	return {
		restrict: 'A',
		replace:true,
		templateUrl: 'view/template/myPostContent.html'
	};
}])
'user strict';

angular.module('app').directive('searchHead', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/searchHead.html',
		scope:{
			list:'=',
			tabClick: '&'
		},
		link:function($scope){
			$scope.click = function(tab){
				$scope.tabClick(tab);
				console.log(tab);
			}
		}
	};
}]).directive('searchFooter', [function () {
	return {
		restrict: 'A',
		replace:true, 
		templateUrl: 'view/template/footer.html'
	};
}]).directive('searchPositionList', [function () {
	return { 
		restrict: 'A',
		replace:true,
		templateUrl: 'view/template/appPositionList.html'
	};
}]).directive('searchAlert', [function () {
	return {
		restrict: 'A',
		replace:true,
		templateUrl: 'view/template/searchAlert.html'
	};
}]).directive('searchBg', [function () {
	return {
		restrict: 'A',
		replace:true,
		templateUrl: 'view/template/searchBg.html'
	};
}])

'user strict';

angular.module('app').directive('positionHead', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/positionHead.html',
		link: function($scope){
			 $scope.back = function(){
		        window.history.back();
		    }
		}
	};
}]).directive('positionDetails', [function () {
	return {
		restrict: 'A',
		replace:true,
		templateUrl: 'view/template/positionDetails.html'
	};
}]).directive('positionCompany', [function () {
	return {
		restrict: 'A',
		replace:true,
		templateUrl: 'view/template/positionCompany.html'
	};
}]).directive('positionFooter', [function () {
	return {
		restrict: 'A',
		replace:true,
		templateUrl: 'view/template/positionFooter.html'
	};
}])

'user strict';

angular.module('app').directive('techRunHead', [function () {
	return {
		restrict: 'A',
		replace:true, //只能有一个根元素
		templateUrl: 'view/template/techRunHead.html',
		link: function($scope){
			 $scope.back = function(){
		        window.history.back();
		    }
		}
	};
}]).directive('techRunShow', [function () {
	return {
		restrict: 'A',
		replace:true,
		templateUrl: 'view/template/techRunShow.html'
	};
}]).directive('techRunClassfly', [function () {
	return {
		restrict: 'A',
		replace:true,
		templateUrl: 'view/template/techRunClassfly.html'
	};
}])

'use strict';

angular.module('app').filter('filterByObj',[function(){
	return function(data,filterObj){
		var result=[];
		angular.forEach(data,function(item){
			var flag=true;
			for(var index in filterObj){
				if(item[index]!=filterObj[index]){
					flag=false;
				}
			}
			if(flag){
				result.push(item);
			}
		});
		return result;
	}
}]);