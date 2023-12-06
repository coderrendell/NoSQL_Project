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
function runQuery(endpoint, resultDivId) {
    const getDataUrl = `http://127.0.0.1:5000/${endpoint}`;

    axios.get(getDataUrl)
        .then(function (response) {
            console.log("Data fetched successfully:", response.data);

            const result = response.data.result;

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
    
    // Similar listeners for query2Btn and query3Btn with appropriate endpoints (task2 and task3)
    

    // createPieChart(result);

    // Function to create a pie chart
    function createPieChart(result) {
        const ctx = document.getElementById('myChart').getContext('2d');

        // Process data for pie chart (sample implementation)
        const labels = [];
        const dataValues = [];

        result.forEach(item => {
            labels.push(item._id.username);
            // Example: Assuming 'total_helpful_votes' field represents data for the pie chart
            dataValues.push(item.total_helpful_votes);
        });

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
                        'rgba(75, 192, 192, 0.7)',
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