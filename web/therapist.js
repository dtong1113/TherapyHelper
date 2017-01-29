function getData(){
  $.getJSON('example.json', function (data) {
    console.log(data);
  });
};
function getStuff(users, curUsers){
  users=[{name: "Hello Worlds"}];
  curUsers={name: "Hello Worlds"};
  console.log("123");
}