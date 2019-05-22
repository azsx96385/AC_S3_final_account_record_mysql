//[index page]-------------------------------------

//篩選功能 | 建立事件監聽 | 比對日期 | 比對類別  | 附加類別

let month_node = document.getElementById("filter_month");
let category_node = document.getElementById("filter_category");

month_node.addEventListener("change", event => {
  let monthSelected = event.target.value;
  console.log("monthSelected", monthSelected);
  month_filter_hiddeRecord(monthSelected);
});

category_node.addEventListener("change", event => {
  let iconSelected = event.target.value;
  category_filter_hiddeRecord(iconSelected);
});

//隱藏record fun
function month_filter_hiddeRecord(monthSelected) {
  let record_list = document.querySelectorAll(".record");
  record_list.forEach(item => {
    console.log("monthSelected", "-", monthSelected);
    //1. icon catagory 處理
    let month = item.querySelector(".record_date").textContent.split("/")[1];
    //2.隱藏處理
    if (month !== monthSelected) {
      item.classList.add("hidden");
    }
    //3.恢復處理
    if (month == monthSelected) {
      item.classList.remove("hidden");
    }
  });
}
function category_filter_hiddeRecord(iconSelected) {
  let record_list = document.querySelectorAll(".record");
  record_list.forEach(item => {
    console.log("iconSelected", "-", iconSelected);
    //1. icon catagory 處理
    let category = item.querySelector(".item_icon").firstElementChild
      .classList[1];

    //2.隱藏處理

    if (category !== iconSelected) {
      item.classList.add("hidden");
    }
    //3.恢復處理

    if (category == iconSelected) {
      item.classList.remove("hidden");
    }
  });
}

//[create page]-------------------------------------

$(".datepicker").pickadate({
  format: " yyyy/mm/dd"
  // formatSubmit: "yyyy/mm/dd"
});
