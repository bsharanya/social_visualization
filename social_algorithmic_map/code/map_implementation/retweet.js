var retweets = []; // store all retweets of tweets
var retweet1, retweet2, retweet3; // D3 nodes for each day retweets

var delayTime = 1000;
var retweetColor = [ "#ffff00", "#ff00ff", "#00ffff"] ;

// initialize
for(var i = 1; i <= 10; i++) {
    d3.json("json_data/tweet"+i+".json", (function(i) {
        return function(error, data) {
            if (error) return console.error(error);
            retweets[i-1] = data[0];
        }
    })(i));
}

function showRetweetsDay(tweet, index, day){
    var g2 = svg.append("g").attr("id", "legend");

    g2.append("rect")
        .attr("x", 300 + (100 * (day + 1)))
        .attr("y", 500)
        .attr("id", "tweets")
        .attr("height", "30px")
        .attr("width", "30px")
        .attr("fill", retweetColor[day])
        .style("opacity", 0)
        .transition()
        .duration(2000)
        .delay(5000)
        .ease("linear")
        .style("opacity", "1");

    g2.append("text")
        .attr("font-family", "sans-serif")
        .attr("font-size", "0px")
        .attr("fill", retweetColor[day])
        .text("Day " + (day + 1))
        .attr("font-weight", 0.5)
        .attr("x", 300 + (100 * (day + 1)))
        .attr("y", 490)
        .transition()
        .duration(2000)
        .delay(5000)
        .ease("linear")
        .attr("font-size", "12px");


    var retweet = svg.selectAll(".retweet")
        .data(retweets[index].retweets[day]).enter().append("circle")
        .attr("r", function(d) { return d.count * 3; })
        .attr("class", "retweet-" + (day+1))
        .attr("cx", function(d) { return projection([d.location.lng, d.location.lat])[0]; })
        .attr("cy", function(d) { return projection([d.location.lng, d.location.lat])[1]; })
        .style("fill", retweetColor[day])
        .style("fill-opacity", 0.5)
        .style("stroke", retweetColor[day])
        .style("stroke-opacity", 0.8)
        .style("opacity", 0)
        .transition()
        .duration(3000)
        .delay(5000)
        .ease("linear")
        .style("opacity", 1);

}

function showRetweets(tweet, index) {
    showRetweetsDay(tweet, index, 0);
    if (retweets[index].retweets[1] !== undefined) {
        setTimeout( function(){ showRetweetsDay(tweet, index, 1);}, delayTime * 3);
    }
    if (retweets[index].retweets[2] !== undefined) {
        setTimeout( function(){ showRetweetsDay(tweet, index, 2);}, delayTime * 6);
    }
}
