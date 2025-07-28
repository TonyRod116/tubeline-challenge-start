// * Variables
let tubeData // We will add all the tube data from the API response to this variable

// * Elements
const tubeListContainer = document.querySelector('.tube-list')
const button = document.querySelector('.spot-status')

// * Functions
const getData = async () => {

  // Before making a network request, display loading icon in button
  displayLoading()

  try {
    const url = 'https://api.tfl.gov.uk/line/mode/tube/status'
    const response = await fetch(url)

    // Response.ok will be true if the request succeeded, false if not
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    // On success (response.ok === true), we want to parse the JSON (stringified) body
    tubeData = await response.json()

    displayData()
  } catch (error) {
    console.log(error)
    displayError(error)
  }
}

const displayLoading = () => {
  button.innerHTML = 'Loading...'
  button.disabled = true
  tubeListContainer.classList.add('loading')
}

const displayError = (error) => {
  tubeListContainer.innerHTML = `<p class="error-message">${error}</p>`
}

const displayData = () => {
  tubeListContainer.innerHTML = tubeData.map(line => {
    // Map line names to CSS classes
    const lineColorMap = {
      'Bakerloo': 'bakerloo',
      'Central': 'central',
      'Circle': 'circle',
      'District': 'district',
      'Hammersmith & City': 'hammersmith-city',
      'Jubilee': 'jubilee',
      'Metropolitan': 'metropolitan',
      'Northern': 'northern',
      'Piccadilly': 'piccadilly',
      'Victoria': 'victoria',
      'Waterloo & City': 'waterloo-city'
    }
    
    const lineClass = lineColorMap[line.name] || 'default'
    const status = line.lineStatuses?.[0]?.statusSeverityDescription || 'Unknown'
    
    return `
      <div class="tube-card ${lineClass}" onclick="toggleLine(this)">
        <div class="tube-header">
          <span>${line.name}</span>
          <span class="expand-button">expand</span>
        </div>
        <div class="tube-status">
          ${status}
        </div>
      </div>
    `
  }).join('')
  
  // Reset button state
  button.innerHTML = 'Refresh Status'
  button.disabled = false
  tubeListContainer.classList.remove('loading')
}

// Function to toggle line status visibility
const toggleLine = (element) => {
  const statusDiv = element.querySelector('.tube-status')
  const expandButton = element.querySelector('.expand-button')
  
  if (statusDiv.classList.contains('show')) {
    statusDiv.classList.remove('show')
    expandButton.textContent = 'expand'
  } else {
    statusDiv.classList.add('show')
    expandButton.textContent = 'collapse'
  }
}

// * Events
button.addEventListener('click', getData)



























// const user = {
//   username: 'JoeBloggs',
//   email: 'JoeBloggs@email.com',
//   password: 'pass123'
// }

// const stringifiedObject = JSON.stringify(user)

// const parsedData = JSON.parse(stringifiedObject)
