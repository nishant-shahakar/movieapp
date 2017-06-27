# Movie App

### Dependency
	 Node 6.x >
	 MongoDB server.
	 Redis server.

### Install and run
	 clone project and cd into project
	 npm install
	 npm start


####  Register user in MovieApp and get token for using API.

Fields for adding user :
<br>1)Email
<br>2)Password 

### Usage


### Add User
**Request** 

	Method :POST
	Request url : http://localhost/user
		Header : {
        "Content-Type":"application/json" // you can send in application/x-www-form-urlencoded also
     }
	Request body :{
		"email":"email", //required
		"password":"password" //required
	}


**Response** 

	Response : {
					"message":"sucess",
					"token":"token"
				}
				
	Status code : 200			

### Get User Details
**Request** 

	Method :GET
	Request url : http://localhost/user
	Header : {
            "Authorization" : "Bearer <token>"
         }


**Response** 

	Response : {
					"email":"email",
					"..":".."
				}
				
	Status code : 200			
	


	
**Note:** Bearer token should be use to authenticate the request. Unauthorized request will generate the 401 error.
	
	Response : Unauthorized
	Status code : 401

### Regenrate token
**Request** 

	Method :POST
	Request url : http://localhost/user/token
		Header : {
        "Content-Type":"application/json" // you can send in application/x-www-form-urlencoded also
     }
	Request body :{
		"email":"email",//required
		"password":"password"//required
	}


**Response** 

	Response : {
					"message":"sucess",
					"token":"token"
				}
				
	Status code : 200	
	
###  Add Genre for user
**Request** 

	Method :POST
	Request url : http://localhost/user/genre
	Header : {
        "Authorization" : "Bearer <token>",
        "Content-Type":"application/json" // you can send in application/x-www-form-urlencoded also
     }
	Request body :{
		"genre":"comedy"//required
	}


**Response** 

	Response : {
					"message":"sucess"
				}
				
	Status code : 200		
		
###  Get Genre for user
**Request** 

	Method :GET
	Request url : http://localhost/user/genre
	Header : {
        "Authorization" : "Bearer <token>"
     }

**Response** 

	Response : {
					"genre":[
					..,
					..]
				}
				
	Status code : 200			

###  Get recommendations for user

**Request** 

	Method :GET
	Request url : http://localhost/user/recommend
	Header : {
        "Authorization" : "Bearer <token>"
     }

**Response** 

	Response : {
				"movies":[< movie objects>,< movie objects>]
				}
				
	Status code : 200		
	
##Movies API :

### Add Movie
**Request** 

	Method :POST
	Request url : http://localhost/movies
		Header : {
        "Content-Type":"application/json" // you can send in application/x-www-form-urlencoded also
     }
	Request body :{
		"name":"name", //required
		"releasedt":"releasedt", //required
		"genre":"['comedy','drama']"
	}


**Response** 

	Response : {
					"message":"sucess"
				}
				
	Status code : 200	

### Get Multiple Movies
**Request** 

	Method :GET
	Request url : http://localhost/movies


**Response** 

	Response : {
					"movies":[< movie objects>,< movie objects>]
				}
				
	Status code : 200	
	
### Get Single Movie with details like avgerage rating ,reviews
**Request** 

	Method :GET
	Request url : http://localhost/movies/get/<movieid> // movieid you can get it from get multiple movies api.
	Header : {
        "Authorization" : "Bearer <token>"
     }

**Response** 

	Response : {
					"movie":{
						<movie details>
					},
					"averageRating":"4.35",
					"reviews":[<reviews object>]
				}
				
	Status code : 200	
	
### Get top rated movies
**Request** 

	Method :GET
	Request url : http://localhost/movies/top
	Header : {
        "Authorization" : "Bearer <token>"
     }

**Response** 

	Response : [{
				"movieid":"movieid",
				"name":"movie",
				"averageRating":"4.3"
				},
				{
				"movieid":"movieid",
				"name":"movie",
				"averageRating":"4.3"
				},
			]
				
	Status code : 200	
	
### Review movie
**Request** 

	Method :POST
	Request url : http://localhost/movies/review/<movieId>
	Header : {
        "Authorization" : "Bearer <token>",
        "Content-Type":"application/json" // you can send in application/x-www-form-urlencoded also
     }
     
    Request body :{
		"rating":"4",//required
		"review":"Nice movie" //required
	}
     

**Response** 

	Response : {
					"message":"sucess"
				}
				
	Status code : 200	
	

 



