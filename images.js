(function() {
    let element = `
        <!-- Image Section: Animals -->
        <hr class="solid">
        <h2>Animals</h2>
        <div>
        <img class="medium-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Cat_August_2010-4.jpg/1280px-Cat_August_2010-4.jpg">
        <img class="medium-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Retriever_in_water.jpg/1024px-Retriever_in_water.jpg">
        <img class="medium-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Bicho-pregui%C3%A7a_3.jpg/330px-Bicho-pregui%C3%A7a_3.jpg">
        <img class="medium-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Domestic_llama_%282009-05-19%29.jpg/330px-Domestic_llama_%282009-05-19%29.jpg">
        <img class="medium-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/20050323_-_Suricata_Suricatta_-_La_Barben_-_France.jpg/375px-20050323_-_Suricata_Suricatta_-_La_Barben_-_France.jpg">
        </div>
        <hr class="solid">`;
    content = document.getElementById("content");
    content.innerHTML = element;
    return;
})();