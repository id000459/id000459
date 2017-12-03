
var templatetype;
$(document).ready(function ()
{
	$("#btnSearch").click(function ()
	{
		var url="https://api.themoviedb.org/3/search/movie?api_key=2034377edd6aba446d2cd930085ab35f&query=" + $("#searchTerm").val();
		searchmovies(url, "movielisttemplate","movielist");
	});
	 
	$("#btnList").click(function ()
	{ 
		var url="https://api.themoviedb.org/3/search/movie?api_key=2034377edd6aba446d2cd930085ab35f&query=" + $("#searchTerm").val();
		searchmovies(url, "movielisttemplate","movielist");
		templatetype = "list";
	});

	$("#btnGrid").click(function ()
	{ 
		var url="https://api.themoviedb.org/3/search/movie?api_key=2034377edd6aba446d2cd930085ab35f&query=" + $("#searchTerm").val();
		searchmovies(url, "moviegridtemplate","movielist");
		templatetype = "grid";
	});	

	/* $("#btnList2").click(function ()
	{ 
		var url="https://www.googleapis.com/movies/v1/users/111815788291054011027/movieshelves/5/volumes";
		searchmovies(url, "movielisttemplate","movielist2");
		templatetype = "list";
	});

	$("#btnGrid2").click(function ()
	{ 
		var url="https://www.googleapis.com/movies/v1/users/111815788291054011027/movieshelves/5/volumes";
		searchmovies(url, "moviegridtemplate","movielist2");
		templatetype = "grid";
	});					 
  */
 
 
});

function searchmovies(servicePoint, templatetype, elementname)
{
	$("#" + elementname).html("Searching ..."+"<img src='http://spiralforums.biz/uploads/monthly_09_2010/post-2-1283575897.gif'>");

	pageNumberContainer.classList.remove("pageNumberHide");
	pageNumberContainer.classList.add("pageNumberShow");

	$.getJSON(servicePoint, function (jsonData)
	{
		$("#" + elementname).html("");					
		var template = $('#' + templatetype ).html();
		var html = Mustache.render(template, jsonData);
		$("#" + elementname).html(html);

		$(".movielistitemheader").on('click', function () 
		{ 
			div=$(this).next(); // get the movie details div
			getmovieDetails($(this).attr("data-movieid"), div);
		});	

		$(".infobtn").on('click', function () 
		{ 
			div=$(this).next(); // get the movie details div
			getGridmovieDetails($(this).attr("data-movieid"), div);
		});
	 
	});	
 
}				 

function getmovieDetails(movieid, div)
{
	 $("#moviedetails").html("Working ..."+"<img src='http://spiralforums.biz/uploads/monthly_09_2010/post-2-1283575897.gif'>");

	 $.getJSON("https://api.themoviedb.org/3/movie/" + movieid + "?api_key=2034377edd6aba446d2cd930085ab35f" , function (jsonData)
	 {
		var template = $('#movielistdetailstemplate').html();
		var html = Mustache.render(template, jsonData);
		$(div).html(html);
		$(div).slideToggle();
	 });
}

function getGridmovieDetails(movieid)
{
	 $("#movieDetail").html("Working ..."+"<img src='http://spiralforums.biz/uploads/monthly_09_2010/post-2-1283575897.gif'>");
	 $.getJSON("https://api.themoviedb.org/3/movie/" + movieid + "?api_key=2034377edd6aba446d2cd930085ab35f" , function (jsonData)
	 {
		$("#movieDetail").html("");
		var template = $('#moviegriddetailstemplate').html();
		var html = Mustache.render(template, jsonData);
		$("#movieDetail").html(html);
	 });
}

function openTab(evt, tabName) 
{
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");

	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	tablinks = document.getElementsByClassName("tablinks");

	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";

	/* if (tabName == "movieshelfTab") {
		var url="https://www.googleapis.com/movies/v1/users/111815788291054011027/movieshelves/5/volumes";
		searchmovies(url, "movielisttemplate","movielist2");
	} */

};
 
function pageClick(buttonNumber)
{
	
	var url="https://api.themoviedb.org/3/search/movie?api_key=2034377edd6aba446d2cd930085ab35f&query=" + $("#searchTerm").val() + '&page=' + buttonNumber;
	if (templatetype == "grid") {
		searchmovies(url, "moviegridtemplate","movielist");
	} else {
		searchmovies(url, "movielisttemplate","movielist");

	}
}

function getpop(movieid)
{
	
	var moveLeft = 0;
	var moveDown = 0;
	$('a.popper').hover(function (e) {
		var target = '#' + ($(this).attr('data-popbox'));
		$(target).show();
		getpopmovieDetails(movieid, target); 
		
		moveLeft = $(this).outerWidth();
		moveDown = ($(target).outerHeight() / 2);
	}, function () {
		var target = '#' + ($(this).attr('data-popbox'));
		if (!($("a.popper").hasClass("show"))) {
			$(target).hide();
		}
	});

	$('a.popper').mousemove(function (e) {
		var target = '#' + ($(this).attr('data-popbox'));

		leftD = e.pageX + parseInt(moveLeft);
		maxRight = leftD + $(target).outerWidth();
		windowLeft = $(window).width() - 40;
		windowRight = 0;
		maxLeft = e.pageX - (parseInt(moveLeft) + $(target).outerWidth() + 20);

		if (maxRight > windowLeft && maxLeft > windowRight) {
			leftD = maxLeft;
		}

		topD = e.pageY - parseInt(moveDown);
		maxBottom = parseInt(e.pageY + parseInt(moveDown) + 20);
		windowBottom = parseInt(parseInt($(document).scrollTop()) + parseInt($(window).height()));
		maxTop = topD;
		windowTop = parseInt($(document).scrollTop());
		if (maxBottom > windowBottom) {
			topD = windowBottom - $(target).outerHeight() - 20;
		} else if (maxTop < windowTop) {
			topD = windowTop + 20;
		}

		$(target).css('top', topD).css('left', leftD);
	});
	$('a.popper').click(function (e) {
		var target = '#' + ($(this).attr('data-popbox'));
		if (!($(this).hasClass("show"))) {
			$(target).show();
		}
		$(this).toggleClass("show");
	});
}

function getpopmovieDetails(movieid, div)
{

	 $.getJSON("https://api.themoviedb.org/3/movie/55?api_key=2034377edd6aba446d2cd930085ab35f" , function (jsonpopData)
	 {
		var bookHTML='<div id="pop1" class="popbox">fds';

			
				bookHTML+="</div>"
		
		
	 });
}

		