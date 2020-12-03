const app = new Vue({
    el: '#dataTable',
    data: {
        collegeCareer: []
    }
});

// Function that fetches the data from the json file and
// displays it in the table
function fetchData() {
    // If the table is already populated, do nothing
    if (app.collegeCareer.length > 0) {
        return false;
    }
    // Create the http get request and send it
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", "data/education.json", true);
    httpRequest.send();
    // As soon as we receive a response, process it
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
            // Parsing out the json into an object and pushing it into the array collegeCareer
            let json = JSON.parse(httpRequest.responseText);
            for (let x in json.education) {
                let school = json.education[x].school;
                let major = json.education[x].major;
                let degree = json.education[x].degree;
                let grad_year = json.education[x].grad_year;
                let education = {school: school, major: major, degree: degree, grad_year: grad_year};
                app.collegeCareer.push(education);
            }
        }
    };
}