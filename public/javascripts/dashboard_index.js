function displayRightPanel(){
  const mainContainer = document.getElementsByClassName("main-container")[0]
  mainContainer.classList.toggle("display-right-panel")
  mainContainer.classList.remove("close-right-panel")
}
document.getElementsByClassName("sandwich-menu-btn")[0].addEventListener("click",displayRightPanel);
document.getElementsByClassName(".display-right-panel")


$(".tab_link").click(function(event){
  event.preventDefault();
  ajaxGetPartial(event.currentTarget.attr(data-value));
})

function ajaxGetPartial(partial_index){
  $.ajax({
    method: "POST",
    url: "/dashboard/getpartial",
    data: JSON.stringify({"partial_index": partial_index}),
    contentType: "application/json;charset=utf-8",
    dataType: html,
    success: function(partial_html){
      $('#main-partial-container').html(partial_html)
    },
    error: function(error){
      console.log("Partial Error : " + error)
    }
  })
}