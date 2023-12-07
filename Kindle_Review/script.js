document.addEventListener("DOMContentLoaded", function () {
    function runQuery(endpoint, resultDivId) {
        const getDataUrl = `http://127.0.0.1:5000/${endpoint}`;

        axios.get(getDataUrl)
            .then(function (response) {
                console.log("Data fetched successfully:", response.data);

                const result = response.data.result;

                // Display the result in the respective query result div
                if (Array.isArray(result)) {
                    document.getElementById(resultDivId).innerHTML = JSON.stringify(result, null, 2);
                    if (resultDivId === 'query3Result') {
                        createPieChart(result); // Call function to create pie chart
                    } else if (resultDivId === 'query2Result') {
                        createBarGraph(result); // Call function to create bar graph
                    }
                } else {
                    console.error("Data received is not an array:", result);
                    document.getElementById(resultDivId).innerHTML = "Error: Data is not in the expected format";
                }
            })
            .catch(function (error) {
                console.error("Error fetching data:", error);
                document.getElementById(resultDivId).innerHTML = "Error fetching data";
            });
    }

    document.getElementById("query1Btn").addEventListener("click", function () {
        runQuery('task1', 'query1Result');
    });

    document.getElementById("query2Btn").addEventListener("click", function () {
        runQuery('task2', 'query2Result');
    });

    document.getElementById("query3Btn").addEventListener("click", function () {
        runQuery('task3', 'query3Result');
    });

    // Function to create a pie chart
    function createPieChart(result) {
        const ctx = document.getElementById('myChart').getContext('2d');

        const labels = ['Highly Satisfied', 'Satisfied', 'Neutral', 'Unsatisfied'];
        const dataValues = [];

        // Assuming the result contains counts for the four categories
        if (Array.isArray(result) && result.length > 0) {
            dataValues.push(result[0].HighlySatisfied);
            dataValues.push(result[0].Satisfied);
            dataValues.push(result[0].Neutral);
            dataValues.push(result[0].Unsatisfied);
        } else {
            console.error('Invalid or empty result');
            document.getElementById('query3Result').innerHTML = 'Error: Invalid or empty data';
            return;
        }
        j


        const myPieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Customer Segmentation',
                    data: dataValues,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)'
                        // Add more colors if needed
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                // Add options for the pie chart as needed
            }
        });
    }
    document.getElementById("query2Btn").addEventListener("click", function () {
        runQuery('task2', 'query2Result');
    });

    //Function to create Bar Graph

    function createBarGraph(result) {
        const ctxBar = document.getElementById('myBarChart').getContext('2d');

        // Process data for vertical bar chart (sample implementation)
        const labels = [];
        const dataValues1 = [];
        const dataValues2 = [];

        // Check if the result is valid and not empty
        if (Array.isArray(result) && result.length > 0) {
            result.forEach(item => {
                labels.push(item._id);  // Assuming the city is available in _id
                dataValues1.push(item.average_helpful_votes);
                dataValues2.push(item.average_rating);
            });
        } else {
            console.error('Invalid or empty result');
            document.getElementById('query2Result').innerHTML = 'Error: Invalid or empty data';
            return;
        }

        // result.forEach(item => {
        //     labels.push(item._id.user.City);
        //     // Example: Assuming 'some_numeric_property' field represents data for the vertical bar chart
        //     dataValues1.push(item.some_numeric_property);
        //     dataValues2.push(item.some_numeric_property);
        // });

        const myBarChart = new Chart(ctxBar, {
            type: 'bar', // Change to 'bar' for vertical bar chart
            data: {
                labels: labels,
                datasets: [{
                    label: 'No. of Helpful Votes',
                    data: dataValues1,
                    backgroundColor: 'rgba(75, 192, 192, 0.7)', // Adjust color as needed
                    borderWidth: 1
                },
                {
                    label: 'No. of Ratings',
                    data: dataValues2,
                    backgroundColor: 'rgba(100, 0, 0, 0.7)', // Adjust color as needed
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: {
                        beginAtZero: true
                    },
                    y: {
                        beginAtZero: true
                    }
                }
                // Add more options for the vertical bar chart as needed
            }
        });
    }

    document.getElementById("query3Btn").addEventListener("click", function () {
        runQuery('task3', 'query3Result');
    });
});
