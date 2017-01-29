//need patient.name
// need questions + answer types

var script = document.createElement('script');
var postData = {
  templateUuid : Number,
  answers : [String]
}

script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

function createTemplateElement (question, answerType, id) {
  var ret = "<div class='question-header'>" + question + "</div>";
  if (answerType == 'text') {
    ret += "<textarea id='" + id + "' placeholder='Please enter your response!'></textarea>";
  }
  return ret;
}

$.get('/patient/data', function(data) {
  $("username").html(data);
  //alert("Load was performed.")
  $('#header').text("Patient Dashboard: Hello, " + data.username);
});

$.get('/patient/templates', function(data) {
  console.log(data);

  for (var i = 0; i < data.data.length; i++) {
    var ele = "<div class='template'>";
    var currentTemplate = data.data[i];
    for (var i = 0; i < currentTemplate.questions.length; i++)
      ele += createTemplateElement(currentTemplate.questions[i], currentTemplate.answerTypes[i], currentTemplate.uuid + i);
    ele += "</div><button type=\"submit\" class=\"btn-default\" name=\"submit\" formaction=\"/users/register\">Submit</button>";
    $("#templates").append(ele);
  }
  //alert("Load was performed.")
  //for(let idx of data.question)
  $('.btn-default').click(function(){
    console.log("KAPPA");
    postData.templateUuid = currentTemplate.Uuid;
    for(var i = 0; i < currentTemplate.questions.length; i++) {
      console.log(document.getElementById(i));
      //postData.answers[i] = document.getElementById(i).value;
    }
    $.post('/patient/templates', function(ret) {
        ret.templateUuid = postData.templateUuid;
        ret.answers = postData.answers;
    });
  });
});



var patient = "Potato"
var apple = ["1", "2", "3"]
//document.getElementById("header").innerHTML = "Patient Dashboard: Hello, " + patient;
