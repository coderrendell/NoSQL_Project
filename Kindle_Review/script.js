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

    // Function to run the query and generate pie chart
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
    
    document.getElementById("query3Btn").addEventListener("click", function () {
        runQuery('task3', 'query3Result');
    });
});