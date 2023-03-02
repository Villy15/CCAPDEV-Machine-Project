let Review = function(name, rating, date, branch, comment, id) {
    this.id = id;
    this.name = name;
    this.name = this.name.toLowerCase();
    this.picture = "../images/users/" + this.name + ".jpeg";
    this.rating = rating;
    this.date = date;
    this.branch = branch;
    this.comment = comment; 
}


let ratings_src = "../images/reviewer-imgs/star-review.png";
let reviews = [];
let reviewCtr = 0;

document.addEventListener("DOMContentLoaded", function() {
    refreshDisplay(reviews);
    let today = new Date(); // Gets today's date

    document.querySelector("#submit-review")?.addEventListener("click", function(e) {
		e.preventDefault();  // Prevents page refresh
        today = new Date(); // Gets today's date

        let comment = $("#review-body").val(); // Gets user's comment

        reviewCtr++;
        let newReview = new Review("villy", 2, today, "Toys R Us", comment, reviewCtr); // Creates new Review Object
        
        reviews.push(newReview); // pushes the new Review object to the reviews list

        refreshDisplay(reviews); //
        editReviews();
        deleteReviews();
    });
    

    testReview1 = new Review("villy", 5, today, "Toys R Us", "Very accomodating store and excellent packaging", 1); // Creates new Review Object
    testReview2 = new Review("jaz", 4, today, "Toy Kingdom", "Slight dent on the product but overall okay", 2);
    testReview3 = new Review("anthony", 5, today, "Toy Kingdom", "Best so far", 3);
    testReview4 = new Review("pola", 2, today, "Toy Kingdom", "Bad packaging and lots of cracks", 4);
    testReview5 = new Review("anon", 3, today, "Toy Kingdom", "Delivery was so slow", 5);
    reviewCtr = 5;

    reviews.push(testReview1, testReview2, testReview3, testReview4, testReview5);
    refreshDisplay(reviews);

    editReviews();

    function editReviews() {
        let edit_buttons = $("a.edit-post")
        console.log(edit_buttons)

        for (let edit_button of edit_buttons) {
            edit_button .addEventListener(("click"), function(e) {
                e.preventDefault();
                let id = e.target.id.slice(-1);
                
                let editComment = document.createElement("textarea");
                let submit = document.createElement("button");
                submit.type = "submit";
                submit.textContent = "Submit";
                submit.classList.add("submit");

                editComment.classList.add("new-comment");
                editComment.placeholder = "Write a review...";
                editComment.append(submit);
                $("#comment-" + id).text("");
                $("#comment-" + id).append(editComment, submit);

                submit.addEventListener("click", function (e) {
                    e.preventDefault();
                    let newComment = editComment.value;
                    editComment.remove();
                    submit.remove();

                    reviews[id - 1].comment = newComment;
                    refreshDisplay(reviews);
                    console.log(reviews);
                    editReviews();
                });
            })
        }

    deleteReviews();

    function deleteReviews () {
        let delete_buttons = $("a.delete-post")
    
        for (let delete_button of delete_buttons) {
            delete_button.addEventListener(("click"), function(e) {
    
                e.preventDefault();
                let id = e.target.id.slice(-1);
    
                for (let i = 0; i < reviews.length; i++) {
                    if (id == reviews[i].id) {
                        reviews.splice(i, 1);

                        refreshDisplay(reviews);
                        
                        delete_buttons = $("a.delete-post")
                        deleteReviews();
                    }
                }
            })
        }
    }


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
        let reviews_container = $("<div>").addClass("reviews-container");
        let user_details = $("<div>").addClass("user-details");
        let review_details = $("<div>").addClass("review-details");
        let review_ratings = $("<div>").addClass("review-ratings");
        let user_options = $("<span>").addClass("user-options");
        let dropdown_container = $("<div>").addClass("dropdown-container");
        let dropdown_menu = $("<div>").addClass("dropdown-menu");
        let delete_option = $("<div>").addClass("delete_option");
        let edit_option = $("<div>").addClass("edit-option");

        let delete_this = $("<a href=#delete>").addClass("delete-post").text("Delete");
        let edit_this = $("<a href=#edit>").addClass("edit-post").text("Edit");

        $(delete_this).attr('id','delete-' + review.id);
        $(edit_this).attr('id','edit-' + review.id);
        

        // ADDING VALUES
        
        let ellipsis = $("<img>").addClass("ellipsis").attr("src", "../images/ellipsis.png");
        let user_picture = $("<img>").addClass("profile-picture").attr("src", review.picture);
        let name = $("<div>").addClass("user-name").text(review.name);

        $(ellipsis).attr('id','toggle-menu');
        $(user_options).attr('id','toggle-menu');

        const review_containerID = document.getElementsByClassName("reviews-container");

        // Ratings depend on the user's rating
        let ratings = []
        for (let i = 0; i < review.rating; i++)  {
            ratings[i] = $("<img>").addClass("star-rating").attr("src", ratings_src);
        } 

        let date = $("<div>").addClass("review-date").text(review.date);
        let branch = $("<div>").addClass("review-branch").text(review.branch);
        let comment = $("<div>").addClass("review-comment").text(review.comment);
        $(comment).attr('id','comment-' + review.id);

        // SETTING PROPER HIERARCHY

        $(edit_option).append(edit_this);
        $(delete_option).append(delete_this);
        $(review_ratings).append(ratings);
        $(user_options).append(ellipsis);
        $(dropdown_menu).append(edit_option, delete_option);
        $(dropdown_container).append(user_options, dropdown_menu);
        $(review_details).append(dropdown_container, review_ratings, date, branch, comment);
        $(user_details).append(user_picture, name);
        $(reviews_container).append(user_details, review_details);

        $("div#reviews").append(reviews_container);
    }
    
    // Clears post container
	function clearReviews() {
		$("#reviews").empty();
	}


    let subMenu = document.getElementById("subMenu");

    document.querySelector("img.profile")?.addEventListener("click", function(e) {
        subMenu.classList.toggle("open-menu");
	}); 
});