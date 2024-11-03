function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
	elmnt = z[i];
	/*search for elements with a certain atrribute:*/
	file = elmnt.getAttribute("include");
	if (file) {
	  /* Make an HTTP request using the attribute value as the file name: */
	  xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
		  if (this.status == 200) {elmnt.innerHTML = this.responseText;}
		  if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
		  /* Remove the attribute, and call this function once more: */
		  elmnt.removeAttribute("include");
		  includeHTML();
		}
        var newxhttp = new XMLHttpRequest();
        newxhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status == 200) {eval(this.responseText);}
            }
        }

        var newfile = "assets/" + file.substring(0, file.length - 5) + ".js";

        newxhttp.open("GET", newfile , true);
        newxhttp.send();
	  }
	  xhttp.open("GET", file, true);
	  xhttp.send();
	  /* Exit the function: */
	  return;
	}
  }
}

function fillPage(){
	var contents = document.querySelector('contents');
	var fragment = window.location.hash.substring(1);
	if(fragment == ""){
        fragment = "home";
        document.title = "Project ADI: The Next Generation Driver Interface";
    } else if(fragment == "cp") {
		document.title = "Project ADI - Cookie Policy";
	} else if (fragment == "pp"){
		document.title = "Project ADI - Privacy Policy";
	} else {
        document.title = "Project ADI - " + fragment.charAt(0).toUpperCase() + fragment.slice(1).replaceAll("_", " ");
    }
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4) {
			if (this.status == 200) {contents.innerHTML = this.responseText;}
			if (this.status == 404) {
				var newxhttp = new XMLHttpRequest();
				newxhttp.onreadystatechange = function() {
					if (this.readyState == 4) {
						if (this.status == 200) {contents.innerHTML = this.responseText;}
						if (this.status == 404) {contents.innerHTML = "BRO WHAT THE FUCK NOT EVEN THE 404 PAGE IS LOADING FOR YA";}
					}
				}
				newxhttp.open("GET", "pages/404.html", true);
				newxhttp.send();
			}
		}
	}
	xhttp.open("GET", "pages/" + fragment + ".html", true);
	xhttp.send();
}

function navigateToPage(newpage){
	window.location.hash = newpage;

	var contents = document.querySelector('contents');
	contents.innerHTML = "";

	fillPage();

    document.getElementById("menuToggle").checked = false;
}

window.addEventListener('hashchange', function() {
    navigateToPage(location.hash.substring(1)); // get the hash and remove the leading #
});

document.addEventListener("DOMContentLoaded", function() {
	includeHTML();
	fillPage();
});
