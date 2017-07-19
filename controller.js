var userModule = angular.module('userModule', []);
userModule.controller('userCtrl', function($scope, $http){
	
		$scope.arrayUnique = function(array) {
			var a = array.concat();
			for(var i=0; i<a.length; ++i) {
				for(var j=i+1; j<a.length; ++j) {
					if(a[i] === a[j])
						a.splice(j--, 1);
				}
			}
			return a;
		}
		
		$scope.intersect = function(a, b){
			var result = [];
			
			for(var ai = 0; ai < a.length; ai++)
				for(var bi = 0; bi < b.length; bi++)
					if(a[ai] == b[bi])
					{
						result = $scope.arrayUnique(result.concat(a[ai]))
						break;
					}
			
			return result;
		}
			
		$http.get('php/get_users.php').
			then(function success(response) {
					$scope.users = response.data;
					$scope.cities = [];
					$scope.qualifications = [];
					
					for(var i = 0; i < $scope.users.length; i++)
						$scope.cities = $scope.arrayUnique(($scope.cities).concat($scope.users[i].cities));
						
					for(var i = 0; i < $scope.users.length; i++)
						$scope.qualifications = $scope.arrayUnique(($scope.qualifications).concat($scope.users[i].qualification));
					
			}, function error(response){
					console.log("Возникла ошибка");
			}
		);
		
		$scope.filterQualifications = function(item){
			if($scope.queryQualification == undefined || $scope.queryQualification.length == 0)
				return true;
			else
				return ($scope.queryQualification.indexOf(item.qualification) != -1);
		}
		
		$scope.filterCities = function(item){
			if($scope.queryCity == undefined || $scope.queryCity.length == 0)
				return true;
			else
			{
				var result = $scope.intersect(item.cities, $scope.queryCity)
				console.log(result);
				if(result.length > 0)
				{
					return true;
				}
				else return false;
			}
		}
});