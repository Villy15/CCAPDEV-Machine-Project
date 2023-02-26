let Review = function(name, rating, date, branch, comment) {
    this.name = name;
    this.name = this.name.toLowerCase();
    this.picture = "./images/users/" + this.name + ".jpeg";
    this.rating = rating;
    this.date = date;
    this.branch = branch;
    this.comment = comment; 
}

let ratings_src = "./images/reviewer-imgs/star-review.png";
let reviews = [];

document.addEventListener("DOMContentLoaded", function() {
    refreshDisplay(reviews);
    let today = new Date(); // Gets today's date

    document.querySelector("#submit-review")?.addEventListener("click", function(e) {
		e.preventDefault();  // Prevents page refresh
        today = new Date(); // Gets today's date

        let comment = $("#review-body").val(); // Gets user's comment

        let newReview = new Review("villy", 2, today, "Toys R Us", comment); // Creates new Review Object

        reviews.push(newReview); // pushes the new Review object to the reviews list

        refreshDisplay(reviews); //
    });
    

    testReview1 = new Review("villy", 2, today, "Toys R Us", " Ang ganda ganda naman ng product! Hindi ko inakala na mint condition talaga ang binili ko.  Will order again once may chance hehe. Thank you Mr. Jaz Campanilla!"); // Creates new Review Object
    testReview2 = new Review("jaz", 4, today, "Toy Kingdom", "I love you Toy Kingdom");
    reviews.push(testReview1, testReview2);
    refreshDisplay(reviews);

    // Refreshes the reviews section according to the review contents of displayedReviews
	function refreshDisplay(reviews) {
		clearReviews(); 
		
		if (reviews.length === 0) {
            
			let emptyReviews = $("<p>").addClass("filler-text").text("▓▒░(°◡°)░▒▓").append("<br>Wow such no review...")
			$("div#reviews").append(emptyReviews);

		} 
        else { 
			displayReviews(reviews);
		}

	}

    function displayReviews(reviews) {
        for (let review of reviews) 
            displayReview(review)
    }

    function displayReview(review) {
        // CREATION OF DIVS
        let reviews_container = $("<div>").addClass("reviews-container");
        let user_details = $("<div>").addClass("user-details");
        let review_details = $("<div>").addClass("review-details");
        let review_ratings = $("<div>").addClass("review-ratings");

        // ADDING VALUES
        let user_picture = $("<img>").addClass("profile-picture").attr("src", review.picture);
        let name = $("<div>").addClass("user-name").text(review.name);

        // Ratings depend on the user's rating
        let ratings = []
        for (let i = 0; i < review.rating; i++)  {
            ratings[i] = $("<img>").addClass("star-rating").attr("src", ratings_src);
        } 

        let date = $("<div>").addClass("review-date").text(review.date);
        let branch = $("<div>").addClass("review-branch").text(review.branch);
        let comment = $("<div>").addClass("review-comment").text(review.comment);

        // SETTING PROPER HIERARCHY

        $(review_ratings).append(ratings);
        $(review_details).append(review_ratings, date, branch, comment);
        $(user_details).append(user_picture, name);
        $(reviews_container).append(user_details, review_details);

        $("div#reviews").append(reviews_container);
    }
    
    // Clears post container
	function clearReviews() {
		$("#reviews").empty();
	}
});