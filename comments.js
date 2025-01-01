var NGComments = ["死ね","バカ",".exe"]; // 簡易的なNGワードの設定
var regex = new RegExp(NGComments.join("|"));
function test(wcheck) {
	if (wcheck.match(regex) != null) {
		alert("ERROR: コメントにNGワードが含まれています");
		return false;
	}
	document.getElementById("submitbutton").disabled = true;
	textareas = document.getElementsByTagName('textarea');
	for(var i=0 ;i < textareas.length ;i ++ ){
		textareas[i].value = textareas[i].value.replace( /</g ,'&lt;' );
	}
	inputs = document.getElementsByTagName('input');
	for(var i=0 ;i < inputs.length ;i ++ ){
		inputs[i].value = inputs[i].value.replace( /</g ,'&lt;' );
	}
	return submitted=!0;
}
