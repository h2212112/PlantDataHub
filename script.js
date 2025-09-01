const fetchPlant = async () => {
    const query = document.getElementById('plant-input').value;
    const plantName = document.getElementById('plant-name');
    const plantImage = document.getElementById('plant-image');
    const plantDescription = document.getElementById('plant-description');
  
    if (!query) {
      alert('Please enter a plant name');
      return;
    }
  
    plantName.textContent = 'Loading...';
    plantImage.src = '';
    plantDescription.textContent = '';
  
    try {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const data = await response.json();
  
      if (data.type === 'disambiguation') {
        throw new Error('Multiple results found. Be more specific.');
      }
  
      plantName.textContent = data.title;
      plantImage.src = data.thumbnail ? data.thumbnail.source : '';
      plantDescription.textContent = data.extract || 'No description available.';
    } catch (error) {
      plantName.textContent = 'Error';
      plantDescription.textContent = error.message;
    }
  };
  