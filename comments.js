var NGComments = ["死ね","バカ","クソ"];
var regex = new RegExp(NGComments.join("|"));
function test(wcheck) {
  if (wcheck.match(regex) != null) {
    alert("NGワードが含まれています｡");
    return false;
  }
  document.getElementById("submitbutton").disabled = true;
  textareas = document.getElementById('textarea');
  for(var i=0 ;i < textareas.length ;i ++ ) {
    textareas[i].value = textareas[i].value.replace( /</g ,'&lt;' );
	}
  inputs = document.getElementsByTagName('input');
	for(var i=0 ;i < inputs.length ;i ++ ){
		inputs[i].value = inputs[i].value.replace( /</g ,'&lt;' );
	}
	return submitted=!0;
}
