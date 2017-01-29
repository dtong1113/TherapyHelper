function getData(){
  $.getJSON('/post', function (data) {
    console.log(data);
  });
};