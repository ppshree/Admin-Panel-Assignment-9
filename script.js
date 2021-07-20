$(document).ready(() => {
    var ResponseData;
   console.log("its ready")
     $('form input').keydown(function (e) {
       if (e.keyCode == 13) {
           e.preventDefault()
           return false;
       }
   });
  
   $.get('http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D', (response) => {
   ResponseData = response   
   response.map(({ id, firstName, lastName, email, phone,address,description}) => {
           var RowCreate = $("<tr>").attr("id", id).addClass("data-row")
           RowCreate.append($("<td>").text(id).addClass("column1"),
               $("<td>").text(firstName).addClass("column2"),
               $("<td>").text(lastName).addClass("column3"),
               $("<td>").text(email).addClass("column4"),
               $("<td>").text(phone).addClass("column5"),
           )
           $("#tabular").append(RowCreate)
           RowCreate.click(() => {
               $(".data-row").removeClass("active")
               $("#"+id).addClass("active")
               $("#details-name").text(firstName+" "+lastName)
               $("textarea").text(description)
               
                  $("#info-content>div:nth-of-type(3)>span").text(address.streetAddress);
                  $("#info-content>div:nth-of-type(4)>span").text(address.city);
                  $("#info-content>div:nth-of-type(5)>span").text(address.state);
                  $("#info-content>div:nth-of-type(6)>span").text(address.zip);
               
           })




       })
   })

   $("#search-box").click(()=>{
       $("#searchLogo").css({"margin-right":"15px"})
       for ( var i = 0; i<document.getElementsByClassName("data-row").length;i++ ){
       document.getElementsByClassName("data-row")[i].style.backgroundColor = "white"
   }
   for ( var i = 0; i<document.getElementsByClassName("data-row").length;i+=2 ){
       document.getElementsByClassName("data-row")[i].style.backgroundColor = "#f1f1f1"
   }
   })
   
   $('#search-box').keyup(function (e) {
         if (e.keyCode == 13) {
           var inputVal = document.getElementById("search-box").value;
           
           var filterData = ResponseData.filter(x => x.firstName.toLowerCase().includes(inputVal.toLowerCase())||
           x.lastName.toLowerCase().includes(inputVal.toLowerCase())||
           x.email.toLowerCase().includes(inputVal.toLowerCase())||
           x.phone.toLowerCase().includes(inputVal.toLowerCase())
           )
          
            console.log(filterData)
            for (var i =0;i< filterData.length;i++){
               var idgetter = filterData[i].id
               console.log(idgetter)
               document.getElementById(filterData[i].id).style.backgroundColor = "yellowgreen";
            }
        }
           
   })
})