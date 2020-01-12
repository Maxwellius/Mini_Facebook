function displayRightPanel(){
  const mainContainer = document.getElementsByClassName("main-container")[0]
  mainContainer.classList.toggle("display-right-panel")
  mainContainer.classList.remove("close-right-panel")
}
document.getElementsByClassName("sandwich-menu-btn")[0].addEventListener("click",displayRightPanel);
document.getElementsByClassName(".display-right-panel")


$(".tab_link").click(function(event){
  event.preventDefault();
  $(".tab_link").removeClass("is_active")
  $(event.target).addClass("is_active")
  ajaxGetPartial($(event.target).data('value'));
})

$("#new-publication").click(function(event){
  $(".tab_link").removeClass("is_active")
  ajaxGetPartial($(event.target).data('value'));
})

function ajaxGetPartial(partial_index){
  console.log(partial_index)
  $.ajax({
    url: '/getpartial',
    type: 'POST',
    data: JSON.stringify({'partial_index': partial_index}),
    contentType: "application/json;charset=utf-8",
    dataType: 'html',
    success: function(partial_html){
      $('#main-partial-container').html(partial_html)
    },
    error: function(error){
      console.log("Partial Error : " + error)
    }
  })
}

$("#invite-button").click(function(event){
   $("#invite-button").unbind("click")
   $("#invite-button").addClass('invited')
   $("#invite-button").text("Invité")
   $.ajax({
      url: '/inviteUser',
      type: 'POST',
      data: {
         'sender': $(event.target).data('sender'), 
         'recipient': $(event.target).data('recipient')
      },
      success: function(){
         console.log("Invitation Réussie")
      }
      
   })
})
