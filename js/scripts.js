$(document).ready(function () {

    //add image
    //var imgURL = "url(" + chrome.extension.getURL("/images/storypoints-icon.png") + ")";

    //add styles
    //document.styleSheets[0].addRule('.js-list-members .member::after','background-image: ' + imgURL);
    document.styleSheets[0].addRule('.js-list-members .member .member-initials', 'position: relative');
    document.styleSheets[0].addRule('.js-list-team-members .member .member-initials', 'position: relative');


    //dowork
    var waitASec = setInterval(function () {
        var users = {};
        var thisWeek = $("h2:contains('This Week')").parent().parent();

        //iterate over each card within list "This Week"
        $(".list-card-details", thisWeek).each(function () {

            var thisCardPoints = parseFloat($(this).find('.badge-points').text());

            if ( isNaN( thisCardPoints ) ) {
                thisCardPoints = 0;
            }

            //console.log(thisCardPoints);

            //iterate through each user associated with current card
            $(".member", this).each(function () {
                var newValue = 0;
                var currentMember = $(this).find(">:first-child");
                var currentMemberTitle = currentMember.attr("title");
                if (!(users.hasOwnProperty(currentMemberTitle))) {
                    /**
                     * create new user:total
                     * user: the title of the member-initial
                     * total: the points assigned to the current card
                     */
                    users[(currentMemberTitle)] = thisCardPoints;
                   // console.log("new member: " + currentMemberTitle);
                   //console.log("new members points: " + thisCardPoints);
                } else {
                    /**
                     * otherwise update user:total
                     * total = user points + points on current card
                     */
                    newValue += users[(currentMemberTitle)] + thisCardPoints;
                    users[(currentMemberTitle)] = newValue;
                    //console.log("member updated: " + currentMemberTitle);
                    //console.log("new member total: " + newValue);
                }
                //This logs every addition
                //console.log(users);
            });

            $(".member", ".js-list-members").each(function(){
                var username = $(this).find(">:first-child").attr("title");
                var usernameRaw = username.substring(username.indexOf("(") + 1, username.indexOf(")"));
                $(this).attr("id", usernameRaw);
                if(users[username] !== undefined){
                    var style = $('<style>.js-list-members .member#'+ usernameRaw + ':after { content: "'+ users[username] +'" }</style>');
                    $('html > head').append(style);
                } else{
                    var style = $('<style>.js-list-members .member#'+ usernameRaw + ':after { content: "0" }</style>');
                    $('html > head').append(style);
                }
            });

            $(".member", ".js-list-team-members").each(function(){
                var username = $(this).find(">:first-child").attr("title");
                var usernameRaw = username.substring(username.indexOf("(") + 1, username.indexOf(")"));
                $(this).attr("id", usernameRaw);
                if(users[username] !== undefined){
                    var style = $('<style>.js-list-team-members .member#'+ usernameRaw + ':after { content: "'+ users[username] +'" }</style>');
                    $('html > head').append(style);
                } else{
                    var style = $('<style>.js-list-team-members .member#'+ usernameRaw + ':after { content: "0" }</style>');
                    $('html > head').append(style);
                }
            });

        });
    }, 1500);


});

// TODO Support TeamMembers as well as ListMember
