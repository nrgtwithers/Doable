
    // $.get("/api/users/:id").then(function(data) {
    // //here we will be fetching other data from the user table to customize the page 
    // // i suggest we do this pasrt after passport, database and routing is done 
    // console.log(data)
    // });

    $("#sign-out").on("click",function(){
      localStorage.setItem("email", "signed out")
     location.href= '/';
    })



  