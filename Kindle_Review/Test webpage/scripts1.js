
// Function to create Line Chart
function createLineGraph(result) {

  const labels = [];
  const dataValues1 = []; // Price 1
  const dataValues2 = []; // Price 2

  // Process data for line chart (sample implementation)


  // Check if the result is valid and not empty
  if (Array.isArray(result) && result.length > 0) {
    result.forEach(item => {
      labels.push(item._id);
      dataValues1.push(item.launch_price);
      dataValues2.push(item.price_after_90_days);
    });
  } else {
    console.error('Invalid or empty result');
    document.getElementById('query1Result').innerHTML = 'Error: Invalid or empty data';
    return;
  }

  return {
    labels: labels,
    datasets: [{
      label: 'Launch Price',
      data: dataValues1,
      borderColor: 'rgba(255, 99, 132, 1)', // Adjust color as needed
      borderWidth: 1,
      // fill: false
    },
    {
      label: 'Price After 90 Days',
      data: dataValues2,
      borderColor: 'rgba(54, 162, 235, 1)', // Adjust color as needed
      borderWidth: 1,
      fill: false
    }],
  };
}
// Function to create a Bar Graph
function createBarGraph(result) {
  const labels = [];
  const dataValues1 = [];
  const dataValues2 = [];

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
  return {
    labels: labels,
    datasets: [
      {
        label: "No. of Helpful Votes",
        data: dataValues1,
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderWidth: 1,
      },
      {
        label: "No. of Ratings",
        data: dataValues2,
        backgroundColor: "rgba(100, 0, 0, 0.7)",
        borderWidth: 1,
      },
    ],
  };
}
// Function to create a Pie Graph
function createPieChart(result) {

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


  return {
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
  };
}


const makeAxiosCall = async (endpoint) => {
  const getDataUrl = `http://127.0.0.1:5000/${endpoint}`;



  const res = await axios.get(getDataUrl);

  switch (endpoint) {
    case "task1":
      const retval = createLineGraph(res.data.result)
      console.log(retval)
      return retval

    case "task2":
      return createBarGraph(res.data.result)
    case "task3":
      return createPieChart(res.data.result)
    default:
      break;
  }


};


const mainFunc = async () => {
  console.log(await makeAxiosCall("task1"));
  const ctxQuery1 = document.getElementById("chartQuery1").getContext("2d");
  new Chart(ctxQuery1, {
    type: 'line',
    data: await makeAxiosCall("task1")
  });

  const ctxQuery2 = document.getElementById("chartQuery2").getContext("2d");
  new Chart(ctxQuery2, {
    type: "bar",
    data: await makeAxiosCall("task2")
  });

  const ctxQuery3 = document.getElementById("chartQuery3").getContext("2d");
  new Chart(ctxQuery3, {
    type: "pie",
    data: await makeAxiosCall("task3")
  });
}

["hashchange", "load"].forEach(event => {
  window.addEventListener(event, mainFunc);
});