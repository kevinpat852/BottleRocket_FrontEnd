document.addEventListener('DOMContentLoaded', function(event) {
    fetch('https://s3.amazonaws.com/br-codingexams/restaurants.json') //fetch restaurants
    .then((response) => {
        if (response.status !== 200) {
            console.log("Failed to get data, status code: " + response.status);
            return;
        }
        response.json().then((data) => {
            let restaurants = data.restaurants; //isolate restaurants array
            console.log(restaurants);
            
            //create maps div for each restaurant with a 'slide' for toggling the height.
            for (let j=0; j<restaurants.length; j++) {
                let maps = document.getElementById('maps');
                maps.innerHTML +=
                    `<div id='map${j}' class='slide' style='width:300px;height:0x;'></div>`;
            }
            
            // get needed java from the array
            for(let i=0; i<restaurants.length; i++) {
                let name = restaurants[i].name;
                let category = restaurants[i].category;
                let backImg = restaurants[i].backgroundImageURL;
                let latitude = restaurants[i].location.lat;
                let longitude = restaurants[i].location.lng;
                console.log(name + ' ' + category + ' ' + backImg + ' ' + latitude + ' ' + longitude);
                
                //create a div for each restaurant
                let listsDiv = document.getElementById('listsDiv');
                listsDiv.innerHTML += 
                    `<div id='restaurant${i}' style='background-image: url(${backImg}); background-size: 300px 180px; background-repeat:no-repeat; position: relative; box-shadow: inset 5px 1px 100px 5px #000000; width: 300px; height: 180px; padding:0px;'
                    onclick='toggleSlide(${i})'>
                        <p id='name${i}' style='position:relative; top:140px; left:10px; color:white; font-weight:bold;'>${name}</p>
                        <p id='category${i}' style='position:relative; top:125px; left:10px; color:white;'>${category}</p>
                    </div>`;
                
                //generate the map for the restaurant based on longitude and latitude
                var myOptions = {
                    zoom:12,center:new google.maps.LatLng(latitude,longitude),mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                map = new google.maps.Map(document.getElementById(`map${i}`), myOptions);
                marker = new google.maps.Marker({map: map,position: new google.maps.LatLng(latitude,longitude)});
                infowindow = new google.maps.InfoWindow({content:`<strong></strong><br><br> ${name}<br>`});
                google.maps.event.addListener(marker, 'click', function(){infowindow.open(map,marker);});
                infowindow.open(map,marker);
                $(`#map${i}`).toggleClass('slide'); // toggle the 'slide' class by default
            }
        })
    })
});

// toggle function will toggle the 'slide' class to modift the height of the targeted map
function toggleSlide(i) {
    $(`#map${i}`).toggleClass('slide'); //toggle the 'slide' class for the appropiate map
}