document.addEventListener('DOMContentLoaded', function () {
  const buscar = document.getElementById('btnBuscar');
  const valorInput = document.getElementById('inputBuscar');

  
  buscar.addEventListener("click", function () {
    const query = encodeURIComponent(valorInput.value.trim());
    
    if (query === "") {
      alert("Por favor, ingresa un término de búsqueda.");
      return;
    }

    fetch(`https://images-api.nasa.gov/search?q=${query}`) 
      .then(response => response.json())
      .then(data => {
        console.log(data);
          const itemsFiltrados = filtrar(query, data.collection.items);
          mostrarImg(itemsFiltrados);
         });
      })

  function filtrar(texto, lista) {
    let filtrados = [];
    texto = texto.toLowerCase();
  
    for (let item of lista) {
      if (item.data[0].title.toLowerCase().includes(texto)) {
        filtrados.push(item);
      }
    }
    return filtrados;
  }

  function mostrarImg(imgs) {
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";

    if (imgs.length === 0) {
      contenedor.innerHTML = "<p>No se encontraron resultados para tu búsqueda.</p>";
      return;
    }

    for (let data of imgs) {
      const li = document.createElement("li");
      li.innerHTML = `
    <style> #contenedor {list-style-type: none; padding-left: 0;</style>
    <div class="card mb-3" style="max-width: 1000px;">
    <div class="row g-0">
      <div class="col-md-4">
        <!-- Imagen con tamaño fijo usando Bootstrap -->
        <img src="${data.links[0].href}" class="img-fluid rounded-start" alt="Image of ${data.data[0].title}" style="height: 200px; object-fit: cover;">
      </div>
      <div class="col-md-8">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${data.data[0].title}</h5>
          <div class="overflow-auto" style="max-height: 100px;">
            <p class="card-text">${data.data[0].description}</p>
          </div>
          <p class="card-text"><small class="text-muted">Fecha: ${data.data[0].date_created}</small></p>      
        </div>
      </div>
    </div>
  </div>
`;
      contenedor.appendChild(li);
    }
  }
});
