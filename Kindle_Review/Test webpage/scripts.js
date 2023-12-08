document.addEventListener("DOMContentLoaded", function () {
  function runQuery(endpoint, resultDivId) {
    const getDataUrl = `http://127.0.0.1:5000/${endpoint}`;

    axios
      .get(getDataUrl)
      .then(function (response) {
        console.log("Data fetched successfully:", response.data);

        const result = response.data.result;

        // Display the result in the respective query result div
        if (Array.isArray(result)) {
          // document.getElementById(resultDivId).innerHTML = JSON.stringify(
          //   result,
          //   null,
          //   2
          // );
          if (resultDivId === "query3Result") {
            createPieChart(result); // Call function to create pie chart
          } else if (resultDivId === "query2Result") {
            createBarGraph(result); // Call function to create bar graph
          }
        } else {
          console.error("Data received is not an array:", result);
          document.getElementById(resultDivId).innerHTML =
            "Error: Data is not in the expected format";
        }
      })
      .catch(function (error) {
        console.error("Error fetching data:", error);
        document.getElementById(resultDivId).innerHTML = "Error fetching data";
      });
  }

  document.getElementById("query1Btn").addEventListener("click", function () {
    runQuery("task1", "query1Result");
  });

  document.getElementById("query2Btn").addEventListener("click", function () {
    runQuery("task2", "query2Result");
  });

  document.getElementById("query3Btn").addEventListener("click", function () {
    runQuery("task3", "query3Result");
  });

  // Function to create a pie chart
  function createPieChart(result) {
    const ctxQuery1 = document.getElementById("chartQuery1").getContext("2d");

    const labels = ["Highly Satisfied", "Satisfied", "Neutral", "Unsatisfied"];
    const dataValues = [];

    // Assuming the result contains counts for the four categories
    if (Array.isArray(result) && result.length > 0) {
      dataValues.push(result[0].HighlySatisfied);
      dataValues.push(result[0].Satisfied);
      dataValues.push(result[0].Neutral);
      dataValues.push(result[0].Unsatisfied);
    } else {
      console.error("Invalid or empty result");
      document.getElementById("query3Result").innerHTML =
        "Error: Invalid or empty data";
      return;
    }
    j;

    const myPieChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Customer Segmentation",
            data: dataValues,
            backgroundColor: [
              "rgba(255, 99, 132, 0.7)",
              "rgba(54, 162, 235, 0.7)",
              "rgba(255, 206, 86, 0.7)",
              "rgba(75, 192, 192, 0.7)",
              // Add more colors if needed
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        // Add options for the pie chart as needed
      },
    });
  }
  document.getElementById("query2Btn").addEventListener("click", function () {
    runQuery("task2", "query2Result");
  });



  function createLineGraph(result) {
    // Sample data for two datasets
    var products = ["Product 1", "Product 2", "Product 3", "Product 4", "Product 5", "Product 6", "Product 7", "Product 8", "Product 9", "Product 10", "Product 11", "Product 12", "Product 13", "Product 14", "Product 15", "Product 16", "Product 17", "Product 18", "Product 19", "Product 20"];

    var pricesDataset1 = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105];
    var pricesDataset2 = [8, 12, 18, 22, 28, 32, 38, 42, 48, 52, 58, 62, 68, 72, 78, 82, 88, 92, 98, 102];

    // Create a line chart
    var ctx = document.getElementById('myLineChart').getContext('2d');
    var myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: products,
        datasets: [
          {
            label: 'Price Dataset 1',
            data: pricesDataset1,
            borderColor: 'rgba(75, 192, 192, 1)', // Color for the first dataset
            borderWidth: 2,
            fill: false
          },
          {
            label: 'Price Dataset 2',
            data: pricesDataset2,
            borderColor: 'rgba(255, 99, 132, 1)', // Color for the second dataset
            borderWidth: 2,
            fill: false
          }
        ]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Products'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Price'
            }
          }
        }
      }
    });
  }

  //Function to create Bar Graph
  function createBarGraph(result) {
    const labels = [];
    const dataValues1 = [];
    const dataValues2 = [];

    const ctxQuery2 = document.getElementById("chartQuery2").getContext("2d");
    // Check if the result is valid and not empty
    if (Array.isArray(result) && result.length > 0) {
      result.forEach((item) => {
        labels.push(item._id); // Assuming the city is available in _id
        dataValues1.push(item.average_helpful_votes);
        dataValues2.push(item.average_rating);
      });
    } else {
      console.error("Invalid or empty result");
      document.getElementById("query2Result").innerHTML =
        "Error: Invalid or empty data";
      return;
    }
    // Process data for vertical bar chart (sample implementation)

    new Chart(ctxQuery2, {
      type: "bar", // Change to 'bar' for vertical bar chart
      data: {
        labels: labels,
        datasets: [
          {
            label: "No. of Helpful Votes",
            data: dataValues1,
            backgroundColor: "rgba(75, 192, 192, 0.7)", // Adjust color as needed
            borderWidth: 1,
          },
          {
            label: "No. of Ratings",
            data: dataValues2,
            backgroundColor: "rgba(100, 0, 0, 0.7)", // Adjust color as needed
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
});
