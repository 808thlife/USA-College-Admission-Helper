
document.addEventListener("DOMContentLoaded", () => {
        const submitButton = document.querySelector("button");
    
        function checkOptionsSelected() {
          let fundingOption = document.querySelector("#funding").value;
          let regionOption = document.querySelector("#regions").value;
          let costOption = document.querySelector("#cost").value;
          const formWindow = document.querySelector(".card");
    
          if (fundingOption == "" || regionOption == "" || costOption == "") {
            submitButton.disabled = true;
            formWindow.classList.add("opacity-75")
          } else {
            submitButton.disabled = false;
            formWindow.classList.add("opacity-100")
            formWindow.classList.remove("opacity-75")

          }
        }
    
        checkOptionsSelected(); // Call initially
    
        document.querySelectorAll("select").forEach(select => {
          select.addEventListener("change", checkOptionsSelected);
        });

        
        submitButton.addEventListener("click", ()=>{

            let fundingOption = document.querySelector("#funding").value;
            let regionOption = document.querySelector("#regions").value;
            let costOption = document.querySelector("#cost").value;

            fetch("/api/", {
                method: "POST",
                headers: {
                    "X-CSRFToken": getCookie("csrftoken"),
                    "Content-Type": "application/json",
                  },
                body: JSON.stringify({
                    "fundingOption": fundingOption,
                    "regionOption":regionOption,
                    "costOption":costOption,
                })
            })
            .then(response => {
                if (response.ok) {
                    console.log(response)
                    return response.json()
                } else{
                    alert("Something went wrong. Please, Try again later")
                }
                
            })
            .then(data =>{
                let formWindow = document.querySelector("#college-form");
                let collegeResponse = document.querySelector(".college-response");
                
                formWindow.style.display = "None";
                //colleges = data["colleges"]
                let collegesJSON = JSON.parse(data["colleges"])
                console.log(collegesJSON)
                //colleges = JSON.stringify(colleges)
                Object.keys(collegesJSON).forEach(college => {
                    let collegeName = collegesJSON[college][0]
                    let collegeInfo = collegesJSON[college][1]
                    const collegeResponse = document.querySelector(".college-response")
                    let newDiv = document.createElement("div")
                    newDiv.innerHTML = `
                    <div class="card">
                    <h5 class="card-header">${collegeName}</h5>
                    <div class="card-body">
                      <h5 class="card-title">Region: ${collegeInfo["Region"]}, City Type: ${collegeInfo["Geography"]}</h5>
                      <p class="card-text">Admission Rate${collegeInfo["AdmissionRate"]}</p>
                      <p class="card-text">AVG SAT Scores: ${collegeInfo["SATAverage"]}, ACT Median: ${collegeInfo["ACTMedian"]} </p>
                      <p class="card-text">Predominant Degree - ${collegeInfo["PredominantDegree"]}, Highest degree - ${collegeInfo["HighestDegree"]}</p>
                      <p class="card-text">Funding Model: ${collegeInfo["FundingModel"]} </p>
                      <p class="card-text">Average Cost of the education: ${collegeInfo["AverageCost"]} </p>
                    </div>
                  </div>
                    `
                    collegeResponse.appendChild(newDiv)
                });
            })
        })









        function getCookie(name) {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
});

