document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("query1Btn").addEventListener("click", function () {
        const getDataUrl = "http://127.0.0.1:5000/task1";

        axios.get(getDataUrl)
            .then(function (response) {
                console.log("Data fetched successfully:", response.data);
                document.getElementById("output").innerHTML = JSON.stringify(response.data);

                // Assuming the data is within the 'result' key
                const data = response.data.result;

                // Check if data is an array before using map
                if (Array.isArray(data)) {
                    updateChart(data);
                } else {
                    console.error("Data received is not an array:", data);
                    document.getElementById("output").innerHTML = "Error: Data is not in the expected format";
                }
            })
            .catch(function (error) {
                console.error("Error fetching data:", error);
                document.getElementById("output").innerHTML = "Error fetching data";
            });
    });

    // Function to update the chart
    function updateChart(data) {
        const ctx = document.getElementById('myChart').getContext('2d');

        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map((item, index) => `Label ${index + 1}`),
                datasets: [{
                    label: 'Data Values',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
