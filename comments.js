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

d3.csv("https://docs.google.com/spreadsheets/d/1FAIpQLSeLGzXa50rQA9cNM4ixsWEGfMlDxF8Y4WCrHn6EvHeZVY_B-Q/export?format=csv&range=A3:D", function(error, data){
	var text = "";
	for(var i=0; i<data.length; i++){
		text += i+1 + " 名前: <a href=\"mailto:" + data[i].Mail + "\">" + data[i].Name + "</a> " + data[i].Timestamp + "<pre>" + data[i].Comments + "</pre>";
	}
	d3.select("#comments").html(text);
});
