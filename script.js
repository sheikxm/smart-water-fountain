// Define global variables for storing historical data
const flowRateData = [];

// Create the line chart using D3.js
const margin = { top: 20, right: 30, bottom: 30, left: 40 };
const width = 600 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

const svg = d3.select("#line-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

const xScale = d3.scaleTime().range([0, width]);
const yScale = d3.scaleLinear().range([height, 0]);

const line = d3.line()
    .x((d) => xScale(d.time))
    .y((d) => yScale(d.flowRate));

svg.append("path")
    .attr("class", "line")
    .style("stroke", "blue");

function updateTextDashboard() {
    // Simulate fetching data from an API
    const flowRate = (Math.random() * 10).toFixed(2);
    const malfunction = Math.random() > 0.9;
    const timestamp = new Date().toLocaleString();

    // Update the DOM elements in the text-based dashboard
    document.getElementById("flow-rate").textContent = flowRate + " L/min";
    document.getElementById("malfunction-alert").textContent = malfunction ? "Yes" : "No";

    // Update recent events
    const eventList = document.getElementById("event-list");
    const eventItem = document.createElement("li");
    eventItem.textContent = `${timestamp} - Flow rate: ${flowRate} L/min, Malfunction Alert: ${malfunction ? "Yes" : "No"}`;
    eventList.insertBefore(eventItem, eventList.firstChild);
}
// Update status with a line chart
function updateLineChart() {
    


    // Simulate fetching data from an API
    const flowRate = (Math.random() * 10).toFixed(2);
    const timestamp = new Date();

    // Add the new data point to the dataset
    flowRateData.push({ time: timestamp, flowRate: flowRate });

    // Keep a fixed number of data points for the chart (e.g., 30 points)
    if (flowRateData.length > 30) {
        flowRateData.shift();
    }

    // Update the x and y domains for the chart
    xScale.domain(d3.extent(flowRateData, (d) => d.time));
    yScale.domain([0, d3.max(flowRateData, (d) => d.flowRate)]);

    // Update the line path
    svg.select(".line")
        .data([flowRateData])
        .attr("d", line);

    // Update the x-axis
    svg.select(".x-axis")
        .call(d3.axisBottom(xScale));

    // Update the y-axis
    svg.select(".y-axis")
        .call(d3.axisLeft(yScale).ticks(5));

    // Update the DOM elements
    document.getElementById("flow-rate").textContent = flowRate + " L/min";
    document.getElementById("malfunction-alert").textContent = Math.random() > 0.9 ? "Yes" : "No";
}

// Add x and y axes to the chart
svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

svg.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(yScale).ticks(5));
function updateStatus() {
    // Call the functions to update the line chart and text-based dashboard
    updateLineChart();
    updateTextDashboard();
}

// Update status every 5 seconds (5000 milliseconds)
setInterval(updateStatus, 5000);

// Initial update
updateStatus();
