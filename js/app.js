const cardContainer = document.getElementById("cardContainer");
const filterMenu = document.querySelector(".filterMenu");

filterMenu.addEventListener('change' , filteredHouses);



function filteredHouses(event){
                                    /*this is a ternary operator that when the page initially loads, if the user didn't 
                                     choose any of the dropdown menu filter, it simply shows him all the 16 houses */
    const houseSelect = event?.target?.value ? event.target.value : "all";
    console.log(houseSelect);

//here we fetch the data
    fetch("https://hp-api.onrender.com/api/characters").then((response) => {

        if(!response.ok){

            throw new Error("the response is not okay");

        }

        return response.json();

    })
    .then((characters) => {     //this is the filter condition (ternary operator)

        const filtered = houseSelect === "all" ? characters.slice(0 , 16) 
                                            : characters.filter(char => char.house === houseSelect).slice(0 , 16);

        cardContainer.innerHTML = "";
        renderData(filtered.slice(0 , 16));                                    
   

    }).catch((error) => {


        console.log("error catched here" , error);
        cardContainer.innerHTML = "<p>error happened in the catch method</p>";

    })

}

function renderData(characters){

    characters.forEach(element => {


        const card = document.createElement("div");
        //let's make a class for the div we created
        card.className = "card";

        //insert the data using innerhtml


        /* I used ternary operator to put a statement that says if the image is showing put the image for the element , 
         else, put the not-found.png image */

        card.innerHTML = `
        
            
            ${element.image ? `<img src = "${element.image}"/> ` 
            : `<img id = "notFoundImage" src = "images/not-found.png"/>`}
            

            <div id = "card-content">
            
                <p id = "name-house">${element.name}</p>
                <p id = "name-house">${element.house}</p>
                <p id = "dateOfBirth">${element.dateOfBirth}</p>

            </div>
        
        
        `;

        cardContainer.appendChild(card);

    });

}

filteredHouses();