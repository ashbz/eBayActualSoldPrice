function init(){

	var soldElem = document.getElementById("prcIsum");
	if (soldElem == null || soldElem == undefined) return;
	
	var html = document.body.parentElement.innerHTML;
	
	if (!html.includes("\"ended\":true")){
		return;
	}
	var res = /taxExclusivePrice(.*?)",/.exec(html);
	
	if (res != null && res.length>1 && res[0].includes("taxExclusivePrice")){
		
		// check if best offer price is the same
		var normPrice = /binPriceOnly(.*?)\",/.exec(html);
		var offerPrice = /taxExclusivePrice(.*?)\",/.exec(html);		
		
		var finalPrice = res[1].replace("\"","").replace(":\"","");
		var finalHtml = "";
		
		if (normPrice[1] == offerPrice[1]){
			// we have offer, but same price
			finalHtml = " - <span style='color: crimson'> Actual Price: N/A </span>";
		}else{
			finalHtml = " - <span style='color: green'> Actual Price: " + finalPrice + "  ⬇ </span>";
		}
		
		if (!soldElem.innerHTML.includes("Actual Price")){
			soldElem.innerHTML += finalHtml;
		}
		
	}

}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded',afterDOMLoaded);
} else {
    init();
}

