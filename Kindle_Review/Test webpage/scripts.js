// Sample data for charts
const dataQuery1 = {
    labels: ['Label A', 'Label B', 'Label C'],
    datasets: [{
        data: [30, 50, 20],
        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe']
    }]
};

const dataQuery2 = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe']
    }]
};

const dataQuery3 = {
    labels: ['Option 1', 'Option 2', 'Option 3'],
    datasets: [{
        data: [40, 30, 30],
        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe']
    }]
};

// Initialize and render charts
const ctxQuery1 = document.getElementById('chartQuery1').getContext('2d');
new Chart(ctxQuery1, {
    type: 'pie',
    data: dataQuery1
});

const ctxQuery2 = document.getElementById('chartQuery2').getContext('2d');
new Chart(ctxQuery2, {
    type: 'bar',
    data: dataQuery2
});

const ctxQuery3 = document.getElementById('chartQuery3').getContext('2d');
new Chart(ctxQuery3, {
    type: 'doughnut',
    data: dataQuery3
});
